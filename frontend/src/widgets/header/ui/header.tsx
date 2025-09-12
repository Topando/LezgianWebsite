'use client';

import styles from './header.module.css';

import Image from 'next/image';
import { useTranslations } from 'next-intl';

import { LocaleSwitcher } from '@/widgets/LocaleSwitcher';
import { useEffect, useMemo, useRef, useState } from 'react';
import { searchGet, SearchType } from '@/shared/api/endpoints/search';
import { replaceLocalhostWithBackend } from '@/features/makeRelativePath';

const accordancTable: Record<string, string> = {
  award: 'awards',
  'candidate-award': 'awards',
  event: 'events',
  culture: 'culture',
  history: 'history',
  language: 'language',
  society: 'society',
  ourproject: 'projects',
  project: 'projects',
  congress: 'congresses',
  'newsonmain': 'news-on-main',
};

const modelTitle: Record<string, string> = {
  award: 'Награды',
  'candidate-award': 'Награды',
  event: 'События',
  culture: 'Культура',
  history: 'История',
  language: 'Языки',
  society: 'Сообщества',
  project: 'Проекты',
  congress: 'Съезды',
};

const mainModels = ['award', 'candidate-award', 'culture', 'event', 'history', 'language', 'society'] as const;

type FilterType = 'all' | 'main' | 'project';

const canonicalModel = (m: string) => (m === 'ourproject' ? 'project' : m);
const itemKey = (it: SearchType) => `${canonicalModel(it.model)}:${it.slug}`;

export function Header() {
  const cT = useTranslations('common');
  const nT = useTranslations('namePages');

  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchType[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isOpen, setOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [isPortrait, setIsPortrait] = useState(false);
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({});

  const wrapperRef = useRef<HTMLDivElement>(null);

  const closePopup = () => {
    setOpen(false);
    setQuery('');
    setResults(null);
    setExpandedGroups({});
    setActiveFilter('all');
  };

  const handleSearch = async () => {
    const q = query.trim();
    if (!q) {
      if (isPortrait) {
        (document.querySelector(`.${styles.search}`) as HTMLInputElement | null)?.focus();
      }
      return;
    }
    setOpen(true);
    setLoading(true);
    setError(null);
    try {
      const data = await searchGet(q);
      setResults(data);
    } catch {
      setError('Ошибка при поиске');
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSearch();
    if (e.key === 'Escape') closePopup();
  };

  useEffect(() => {
    const checkOrientation = () => {
      setIsPortrait(window.matchMedia('(orientation: portrait)').matches);
    };
    checkOrientation();
    window.addEventListener('resize', checkOrientation);
    return () => window.removeEventListener('resize', checkOrientation);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        closePopup();
      }
    };
    if (isOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  useEffect(() => {
    const body = document.body;
    if (isOpen) {
      body.style.maxHeight = '100vh';
      body.style.overflow = 'hidden';
    } else {
      body.style.maxHeight = '';
      body.style.overflow = '';
    }
    return () => {
      body.style.maxHeight = '';
      body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isPortrait) return;
    const elem = document.getElementById('localeSwitcherContainer');
    if (!elem) return;
    if (query.trim() !== '' || isInputFocused) elem.classList.add(styles.localeDeactive);
    else elem.classList.remove(styles.localeDeactive);
  }, [query, isInputFocused, isPortrait]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closePopup();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isOpen]);

  const handleContainerClick = () => {
    if (!isPortrait) return;
    document.getElementById('localeSwitcherContainer')?.classList.add(styles.localeDeactive);
    (document.querySelector(`.${styles.search}`) as HTMLInputElement | null)?.focus();
  };

  const handleFilterClick = (filter: FilterType) => {
    setActiveFilter(filter);
    setExpandedGroups({});
  };

  const toggleGroup = (model: string) => {
    setExpandedGroups((prev) => ({ ...prev, [model]: !prev[model] }));
  };

  const dedupedResults = useMemo(() => {
    const seen = new Set<string>();
    return (results ?? []).filter((it) => {
      const k = `${canonicalModel(it.model)}:${it.slug}`;
      if (seen.has(k)) return false;
      seen.add(k);
      return true;
    });
  }, [results]);

  const filteredResults = useMemo(() => {
    return dedupedResults.filter((item) => {
      const model = canonicalModel(item.model);
      switch (activeFilter) {
        case 'all':
          return true;
        case 'project':
          return model === 'project';
        case 'main':
          return (mainModels as readonly string[]).includes(model);
        default:
          return false;
      }
    });
  }, [dedupedResults, activeFilter]);

  const grouped = useMemo(() => {
    if (activeFilter !== 'main') return null;
    return filteredResults.reduce<Record<string, SearchType[]>>((acc, item) => {
      const key = canonicalModel(item.model);
      (acc[key] ??= []).push(item);
      return acc;
    }, {});
  }, [filteredResults, activeFilter]);

  function ResultItem({ item }: { item: SearchType }) {
    const model = canonicalModel(item.model);
    const pathSegment = accordancTable[model] ?? model;
    return (
      <a
        href={`/${pathSegment}/${item.slug}`}
        className={styles.resultItem}
      >
        <div className={styles.containerImg}>
          <Image
            src={replaceLocalhostWithBackend(item.image)}
            width={240}
            height={240}
            alt={item.title}
          />
        </div>
        <div className={styles.containerText}>
          <p className={styles.title}>{item.title}</p>
          <p>{item.announcement}</p>
        </div>
      </a>
    );
  }

  return (
    <>
      <div className={styles.headerContainer} ref={wrapperRef} onClick={handleContainerClick}>
        <div className={styles.container}>
          <div className={styles.searchContainer}>
            <input
              type="text"
              className={styles.search}
              placeholder={cT('search')}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={() => setIsInputFocused(true)}
              onBlur={() => setIsInputFocused(false)}
            />
            <button type="button" onClick={handleSearch}>
              <Image
                className={styles.searchButton}
                src={'/images/search-icon.svg'}
                width={30}
                height={30}
                alt="Поиск"
              />
            </button>
          </div>

          <div className={styles.localeSwitcherContainer} id="localeSwitcherContainer">
            <LocaleSwitcher />
          </div>
        </div>

        {isOpen && (
          <div className={styles.popup} onClick={(e) => e.stopPropagation()}>
            <div className={styles.filtresContainer}>
              <button type="button" onClick={(e) => { e.stopPropagation(); handleFilterClick('all'); }}>Все</button>
              <button type="button" onClick={(e) => { e.stopPropagation(); handleFilterClick('main'); }}>{nT('main')}</button>
              <button type="button" onClick={(e) => { e.stopPropagation(); handleFilterClick('project'); }}>{nT('projects')}</button>
              <button type="button" onClick={(e) => { e.stopPropagation(); closePopup(); }}>Закрыть</button>
            </div>

            <div className={styles.separator}></div>
            {loading && <p>Поиск...</p>}
            {error && <p>{error}</p>}

            {results && (
              <div className={styles.searchResults}>
                {filteredResults.length === 0 ? (
                  <p className={styles.notFound}>Ничего не найдено</p>
                ) : (
                  <>
                    {activeFilter === 'main' && grouped ? (
                      Object.entries(grouped).map(([model, items]) => {
                        const visibleItems = expandedGroups[model] ? items : items.slice(0, 4);
                        const title = modelTitle[model] ?? model;
                        return (
                          <div key={model}>
                            <div className={styles.groupContainer}>
                              <p className={styles.titleGroup}>{title}</p>
                              {items.length > 4 && (
                                <button type="button" onClick={() => toggleGroup(model)}>
                                  {expandedGroups[model] ? 'Скрыть' : 'Показать все'}
                                </button>
                              )}
                            </div>
                            <div className={styles.gridResult}>
                              {visibleItems.map((item) => (
                                <ResultItem key={itemKey(item)} item={item} />
                              ))}
                            </div>
                            <div className={styles.separator}></div>
                          </div>
                        );
                      })
                    ) : (
                      <div className={styles.gridResult}>
                        {filteredResults.map((item) => (
                          <ResultItem key={itemKey(item)} item={item} />
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {isOpen && <div className={styles.overlay} onClick={closePopup} />}
    </>
  );
}
