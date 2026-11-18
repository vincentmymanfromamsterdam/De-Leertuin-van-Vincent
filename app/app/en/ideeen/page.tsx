import { notFound } from 'next/navigation';
import IdeasPage from '@/components/IdeasPage';
import { config } from '@/lib/config';

export default function SecondaryIdeeenPage() {
  const secondary = config.languages.secondary;
  if (!secondary) notFound();
  return <IdeasPage lang={secondary} />;
}
