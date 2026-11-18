import IdeasPage from '@/components/IdeasPage';
import { config } from '@/lib/config';

export default function IdeeenPage() {
  return <IdeasPage lang={config.languages.primary} />;
}
