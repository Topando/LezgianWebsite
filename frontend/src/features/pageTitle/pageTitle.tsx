'use client';

import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';

const PATH_TITLES: { match: RegExp; key: string }[] = [
    { match: /^\/(\/.*)?$/, key: 'main' },
    { match: /^\/about(\/.*)?$/, key: 'about-us' },
    { match: /^\/docs(\/.*)?$/, key: 'docs' },
    { match: /^\/projects(\/.*)?$/, key: 'projects' },
    { match: /^\/congresses(\/.*)?$/, key: 'congresses' },
    { match: /^\/contacts(\/.*)?$/, key: 'contacts' },
    { match: /^\/reports(\/.*)?$/, key: 'reports' },
];

const getKeyFromPath = (path: string): string => {
    const match = PATH_TITLES.find((route) => route.match.test(path));
    return match?.key ?? 'main';
};

export const PageTitle = () => {
    const pathname = usePathname();
    const t = useTranslations('nav.links'); // Используем ту же группу переводов
    const key = getKeyFromPath(pathname);

    return <>{t(key)}</>;
};

export function useFirstPathSegment(): string {
    const path = usePathname();

    if (!path) return '/';

    let trimmedPath = path;
    if (trimmedPath !== '/' && trimmedPath.endsWith('/')) {
        trimmedPath = trimmedPath.slice(0, -1);
    }

    const segments = trimmedPath.split('/').filter(Boolean);

    if (segments.length === 0) return '/';

    return '/' + segments[0];
}
