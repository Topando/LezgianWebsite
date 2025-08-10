import DetailPage from './ui/award';

export default function Page({ params }: { params: { slug: string } }) {
  return <DetailPage slug={params.slug} />;
}

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Народная премия "Лезгинская Звезда" | Официальный сайт ФЛНКА',
  description: 'Информация о народной премии "Лезгинская Звезда": лауреаты, церемонии награждения, история и критерии отбора.',
};