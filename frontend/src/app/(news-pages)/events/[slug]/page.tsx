import DetailPage from './ui/event';

export default function Page({ params }: { params: { slug: string } }) {
  return <DetailPage slug={params.slug} />;
}
