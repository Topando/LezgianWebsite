'use client';

import styles from './header.module.css';

import Image from 'next/image';
import { useTranslations } from 'next-intl';

import { LocaleSwitcher } from '@/widgets/LocaleSwitcher';
import { useEffect, useRef, useState } from 'react';
import { searchGet, SearchType } from '@/shared/api/endpoints/search';
import { replaceLocalhostWithBackend } from '@/features/makeRelativePath';

const accordancTable: Record<string, string> = {
  award: 'awards',
  'candidate-award': 'awards',
  event: 'events',
  culture: 'culture',
  history: 'history',
  language: 'language',
  society: 'culture',
  project: 'projects',
  congress: 'congresses',
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

const mainModels = ['award', 'candidate-award', 'culture', 'event', 'history', 'language', 'society'];

type FilterType = 'all' | 'main' | 'project' | 'congress';

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

  const handleSearch = async () => {
    if (!isPortrait) {
      if (!query.trim()) return;
      
      setOpen(true);
      setLoading(true);
      setError(null);

      try {
        const data = await searchGet(query);
        setResults(data);
      } catch (err) {
        setError('Ошибка при поиске');
        setResults([]);
      } finally {
        setLoading(false);
      }
    } else {
      const input = document.querySelector(`.${styles.search}`) as HTMLInputElement;
      if (!query) {
        input.focus();
      } else if (query.trim()) {
        setOpen(true);
        setLoading(true);
        setError(null);

        try {
          const data = await searchGet(query);
          setResults(data);
        } catch (err) {
          setError('Ошибка при поиске');
          setResults([]);
        } finally {
          setLoading(false);
        }
      }
    }
  };


  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSearch();
  };

  useEffect(() => {
    const checkOrientation = () => {
      setIsPortrait(window.matchMedia('(orientation: portrait)').matches);
    };

    checkOrientation();
    window.addEventListener('resize', checkOrientation);

    return () => {
      window.removeEventListener('resize', checkOrientation);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setOpen(false);
        setQuery('');
        setResults(null);
        setExpandedGroups({});
        setActiveFilter('all');
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
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

    if (query.trim() !== '' || isInputFocused) {
      elem.classList.add(styles.localeDeactive);
    } else {
      elem.classList.remove(styles.localeDeactive);
    }
  }, [query, isInputFocused, isPortrait]);

  const handleContainerClick = () => {
    if (!isPortrait) return;
    
    const elem = document.getElementById('localeSwitcherContainer');
    if (!elem) return;

    // Добавляем класс при клике на контейнер
    elem.classList.add(styles.localeDeactive);
    
    // Фокусируем input
    const input = document.querySelector(`.${styles.search}`) as HTMLInputElement;
    if (input) {
      input.focus();
    }
  };

  const handleFilterClick = (filter: FilterType) => {
    setActiveFilter(filter);
    setExpandedGroups({});
  };

  const toggleGroup = (model: string) => {
    setExpandedGroups((prev) => ({ ...prev, [model]: !prev[model] }));
  };

  const filteredResults = results?.filter((item) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'project') return item.model === 'project';
    if (activeFilter === 'congress') return item.model === 'congress';
    if (activeFilter === 'main') return mainModels.includes(item.model);
    return true;
  }) ?? [];

  const grouped = activeFilter === 'main'
    ? filteredResults.reduce<Record<string, SearchType[]>>((acc, item) => {
        const groupKey = item.model;
        if (!acc[groupKey]) acc[groupKey] = [];
        acc[groupKey].push(item);
        return acc;
      }, {})
    : null;


  // повторяющийся JSX
  function ResultItem({ item }: { item: SearchType }) {
    return (
      <a
        key={item.id}
        href={`/${accordancTable[item.model]}/${item.slug}`}
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
            <button onClick={handleSearch}>
              <Image
                className={styles.searchButton}
                src={'/images/search-icon.svg'}
                width={30}
                height={30}
                alt='Поиск'
              />
            </button>
          </div>

          <div className={styles.localeSwitcherContainer} id='localeSwitcherContainer'>
           <LocaleSwitcher />
          </div>
        </div>

        {isOpen && (
          <div className={styles.popup}>
            <div className={styles.filtresContainer}>
              <button onClick={() => handleFilterClick('all')}>Все</button>
              <button onClick={() => handleFilterClick('main')}>{nT('main')}</button>
              <button onClick={() => handleFilterClick('project')}>{nT('projects')}</button>
              <button onClick={() => handleFilterClick('congress')}>{nT('congresses')}</button>
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
                        return (
                          <div key={model}>
                            <div className={styles.groupContainer}>
                              <p className={styles.titleGroup}>{modelTitle[model] ?? model}</p>
                              {items.length > 4 && (
                                <button onClick={() => toggleGroup(model)}>
                                  {expandedGroups[model] ? 'Скрыть' : 'Показать все'}
                                </button>
                              )}
                            </div>
                            <div className={styles.gridResult}>
                              {visibleItems.map((item) => (
                                <ResultItem key={item.id} item={item} />
                              ))}
                            </div>

                            <div className={styles.separator}></div>
                          </div>
                        );
                      })
                    ) : (
                      <div className={styles.gridResult}>
                        {filteredResults.map((item) => (
                          <ResultItem key={item.id} item={item} />
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

      {isOpen && <div className={styles.overlay} />}
    </>
  );
}
