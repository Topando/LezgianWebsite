import ProjectPage from './ui/project';

export default function Page({ params }: { params: { slug: string } }) {
  return <ProjectPage slug={params.slug} />;
}
