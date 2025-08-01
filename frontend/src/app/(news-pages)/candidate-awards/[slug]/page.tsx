import DetailPage from './ui/candidate-awards';

export default function Page({ params }: { params: { slug: string } }) {
  return <DetailPage slug={params.slug} />;
}
