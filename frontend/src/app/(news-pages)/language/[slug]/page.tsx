import DetailPage from './ui/language';

export default function Page({ params }: { params: { slug: string } }) {
  return <DetailPage slug={params.slug} />;
}

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Лезгинский язык: изучение, сохранение и развитие | ФЛНКА',
  description: 'Материалы о лезгинском языке: учебные пособия, научные статьи, литература и методики преподавания. Поддержка и популяризация родного языка.',
};