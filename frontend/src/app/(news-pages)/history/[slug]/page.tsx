import DetailPage from './ui/history';

export default function Page({ params }: { params: { slug: string } }) {
  return <DetailPage slug={params.slug} />;
}


import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'История лезгинского народа | Исследования и архивные материалы',
  description: 'Исторические исследования, архивные документы и аналитические статьи о лезгинском народе. Изучите богатое наследие и ключевые события прошлого.',
};