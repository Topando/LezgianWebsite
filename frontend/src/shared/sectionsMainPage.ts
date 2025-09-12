import { useTranslations } from 'next-intl';

export const SectionsMainPage = () => {
  const t = useTranslations('namePages');

  return [
    { id: '/', label: t('rightMain'), link: true },
    { id: '/awards', label: t('awards'), link: true },
    { id: '/events', label: t('events'), link: true },
    { id: '/society', label: t('society'), link: true },
    { id: '/language', label: t('language'), link: true },
    { id: '/history', label: t('history'), link: true },
    { id: '/culture', label: t('culture'), link: true },
    { id: '/media-library', label: t('media'), link: true },
  ];
};
