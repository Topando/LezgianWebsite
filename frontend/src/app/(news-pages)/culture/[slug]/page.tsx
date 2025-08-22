import DetailPage from './ui/culture';

export default function Page({ params }: { params: { slug: string } }) {
  return <DetailPage slug={params.slug} />;
}

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Лезгинская культура: традиции, искусство и современность | ФЛНКА',
  description: 'Искусство, обычаи и культурное наследие лезгинского народа. Фото- и видеоматериалы, статьи о народных промыслах, музыке и танцах.',
};