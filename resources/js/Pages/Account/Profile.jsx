import { useState } from 'react';
import { Head } from '@inertiajs/react';
import AccountLayout from '../../Layouts/AccountLayout';
import useLocale from '../../hooks/useLocale';
import Input from '../../Components/Input';
import Button from '../../Components/Button';
import Alert from '../../Components/Alert';

export default function Profile() {
  const { t, locales } = useLocale();

  const [form, setForm] = useState({
    name: 'Ahmed Ben Ali',
    email: 'ahmed@example.com',
    locale: 'fr',
  });
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <AccountLayout>
      <Head title={t('account.profile')} />

      <div className="max-w-xl">
        <h2 className="text-xl font-bold text-text mb-6">{t('account.profile')}</h2>

        {saved && <Alert variant="success" dismissible className="mb-6">{t('account.saved')}</Alert>}

        <form onSubmit={handleSubmit} className="card p-6 space-y-5">
          <Input
            label={t('account.nameLabel')}
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
          <Input
            label={t('account.emailLabel')}
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
          <Input
            label={t('account.localeLabel')}
            type="select"
            value={form.locale}
            onChange={(e) => setForm({ ...form, locale: e.target.value })}
          >
            {locales.map((l) => (
              <option key={l.code} value={l.code}>{l.label}</option>
            ))}
          </Input>

          <div className="pt-2">
            <Button type="submit">{t('account.save')}</Button>
          </div>
        </form>
      </div>
    </AccountLayout>
  );
}
