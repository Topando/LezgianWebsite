import DetailPage from './ui/project';

export default function Page({ params }: { params: { slug: string } }) {
  return <DetailPage slug={params.slug} />;
}

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Проекты ФЛНКА | Подробная информация о проекте',
  description: 'Подробное описание проекта Федеральной Лезгинской НКА: цели, этапы реализации, достигнутые результаты и фотоотчеты. Узнайте больше о нашей деятельности.',
};