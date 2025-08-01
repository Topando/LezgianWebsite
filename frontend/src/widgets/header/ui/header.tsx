'use client';

import styles from './header.module.css';

import Image from 'next/image';
import { useTranslations } from 'next-intl';

import { LocaleSwitcher } from '@/widgets/LocaleSwitcher';
import { useEffect, useRef, useState } from 'react';
import { searchGet, SearchType } from '@/shared/api/endpoints/search';
import { replaceLocalhostWithBackend } from '@/features/makeRelativePath';

export function Header() {
    const cT = useTranslations('common');

    const [query, setQuery] = useState('');
    const [results, setResults] = useState<SearchType[] | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isOpen, setOpen] = useState<boolean>(false);

    const wrapperRef = useRef<HTMLDivElement>(null);

    const handleSearch = async () => {
        if (!query.trim()) return;

        setOpen(true);
        setLoading(true);
        setError(null);

        try {
            const data = await searchGet(query);
            console.log(data);
            setResults(data);
        } catch (err) {
            setError('Ошибка при поиске');
            setResults([]);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') handleSearch();
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setOpen(false);
                setQuery('');
                setResults(null);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    return (
        <>
            <div className={styles.headerContainer} ref={wrapperRef}>
                <div className={styles.container}>
                    <div className={styles.searchContainer}>
                        <input
                            type="text"
                            className={styles.search}
                            placeholder={cT('search')}
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyDown={handleKeyDown}
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

                    <LocaleSwitcher />
                </div>

                {/* Popup прямо под хедером */}
                {isOpen && (
                    <div className={styles.popup}>
                        <div className={styles.filtresContainer}>
                            <button>Все</button>
                            <button>Главная</button>
                            <button>Проекты</button>
                            <button>Съезды</button>
                        </div>

                        <div className={styles.separator}></div>
                        {loading && <p>Поиск...</p>}
                        {error && <p>{error}</p>}
                        {results && (
                            <div className={styles.searchResults}>
                                {results.length === 0 ? (
                                    <p>Ничего не найдено</p>
                                ) : (
                                    <div className={styles.gridResult}>
                                        {results.map((item) => (
                                            <div key={item.id} className={styles.resultItem}>
                                                <div className={styles.containerImg}>
                                                    <Image src={replaceLocalhostWithBackend(item.image)} width={240} height={240} alt={item.title}/>
                                                </div>

                                                <div className={styles.containerText}>
                                                    <p className={styles.title}>{item.title}</p>
                                                    <p>{item.announcement}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Полупрозрачная подложка */}
            {isOpen && <div className={styles.overlay} />}
        </>
    );
}
