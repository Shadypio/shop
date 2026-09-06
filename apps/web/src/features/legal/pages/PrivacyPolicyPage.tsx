import { LegalPage } from '../components/LegalPage';
import { HomeButton } from '../../../components/ui/HomeButton';

export function PrivacyPolicyPage() {
  return (
    <LegalPage title="Informativa sulla privacy">
      <iframe
        src="https://app.legalblink.it/api/documents/6a9c43d0429591002915bd54/privacy-policy-per-siti-web-o-e-commerce-it"
        style={{ height: '50vh' }}
      ></iframe>
      <HomeButton />
    </LegalPage>
  );
}
