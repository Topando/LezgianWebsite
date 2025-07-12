'use client';

import { usePathname } from 'next/navigation';
import React from 'react';

/*
Обычные страницы
{ match: /^\/about$/, title: 'О нас' }

Группы страниц или динамические маршруты
{ match: /^\/docs/, title: 'Документы' }
Подходит для:
- /docs
- /docs/123
- /docs/anything

Маршруты с вложенностью
{ match: /^\/admin\/users/, title: 'Пользователи (админка)' }
Покроет:
- /admin/users
- /admin/users/123
*/

const PATH_TITLES: { match: RegExp; title: string }[] = [
    { match: /^\/(\/.*)?$/, title: 'Главная' },
    { match: /^\/about(\/.*)?$/, title: 'О нас' },
    { match: /^\/docs(\/.*)?$/, title: 'Документы' },
    { match: /^\/projects(\/.*)?$/, title: 'Проекты' },
    { match: /^\/congresses(\/.*)?$/, title: 'Съезды' },
    { match: /^\/contacts(\/.*)?$/, title: 'Контакты' },
    { match: /^\/reports(\/.*)?$/, title: 'Отчеты' },
];

const getTitleFromPath = (path: string): string => {
    const match = PATH_TITLES.find((route) => route.match.test(path));
    return match?.title ?? 'Главная';
};

export const PageTitle = () => {
    const pathname = usePathname();
    console.log(pathname);
    const title = getTitleFromPath(pathname);
    console.log(title);

    return <>{title}</>;
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