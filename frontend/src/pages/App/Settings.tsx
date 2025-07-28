import { SettingsForm } from '@/components/settings/SettingsForm';
import { DefaultWrapper } from '@/layouts/DefaultWrapper';

const SettingsPage = () => {
  return (
    <DefaultWrapper>
      <div className="3xl:py-4 3xl:px-26 space-y-6 p-6">
        <SettingsForm />
      </div>
    </DefaultWrapper>
  );
};

export default SettingsPage;
