import { HomeButton } from '../../../components/ui/HomeButton';
import { LegalPage } from '../components/LegalPage';

export function CookiePolicyPage() {
  return (
    <LegalPage title="Cookie Policy">
      <iframe
        src="https://app.legalblink.it/api/documents/6a9c43d0429591002915bd54/cookie-policy-it"
        style={{ height: '50vh' }}
      ></iframe>
      <HomeButton />
    </LegalPage>
  );
}
