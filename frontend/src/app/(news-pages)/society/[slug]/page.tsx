import DetailPage from './ui/society';

export default function Page({ params }: { params: { slug: string } }) {
  return <DetailPage slug={params.slug} />;
}

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Общество и Лезгинская культура | Публикации и аналитика от ФЛНКА',
  description: 'Статьи, исследования и аналитические материалы о жизни лезгинского общества. Актуальные вопросы культуры, традиций и современного развития.',
};