import { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import AuthLayout from '../../Layouts/AuthLayout';
import useLocale from '../../hooks/useLocale';
import Input from '../../Components/Input';
import Button from '../../Components/Button';
import Alert from '../../Components/Alert';

export default function ForgotPassword() {
  const { t } = useLocale();
  const [email, setEmail] = useState('');
  const [processing, setProcessing] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setProcessing(true);
    setTimeout(() => { setProcessing(false); setSent(true); }, 1500);
  };

  return (
    <AuthLayout>
      <Head title={t('auth.forgotTitle')} />

      <div>
        <h1 className="text-xl font-display font-bold text-text">{t('auth.forgotTitle')}</h1>
        <p className="mt-1 text-sm text-text/60">{t('auth.forgotSubtitle')}</p>
      </div>

      {sent && <Alert variant="success" className="mt-3">{t('auth.resetSent')}</Alert>}

      <form onSubmit={handleSubmit} className="mt-5 space-y-3.5">
        <Input
          label={t('auth.email')}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
        />

        <Button type="submit" className="w-full" loading={processing}>
          {t('auth.sendResetLink')}
        </Button>
      </form>

      <p className="mt-4 text-center text-sm text-text/60">
        <Link href="/login" className="font-medium text-gold hover:text-gold-light">
          {t('auth.login')}
        </Link>
      </p>
    </AuthLayout>
  );
}
