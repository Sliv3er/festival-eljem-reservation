import { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import AuthLayout from '../../Layouts/AuthLayout';
import useLocale from '../../hooks/useLocale';
import Input from '../../Components/Input';
import Button from '../../Components/Button';

export default function Register() {
  const { t } = useLocale();
  const [form, setForm] = useState({ name: '', email: '', password: '', password_confirmation: '' });
  const [errors] = useState({});
  const [processing, setProcessing] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setProcessing(true);
    setTimeout(() => { setProcessing(false); }, 1500);
  };

  return (
    <AuthLayout>
      <Head title={t('auth.registerTitle')} />

      <div>
        <h1 className="text-xl font-display font-bold text-text">{t('auth.registerTitle')}</h1>
        <p className="mt-1 text-sm text-text/60">{t('auth.registerSubtitle')}</p>
      </div>

      <form onSubmit={handleSubmit} className="mt-4 space-y-3">
        <Input
          label={t('auth.name')}
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          error={errors.name}
          required
          autoComplete="name"
        />
        <Input
          label={t('auth.email')}
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          error={errors.email}
          required
          autoComplete="email"
        />
        <Input
          label={t('auth.password')}
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          error={errors.password}
          required
          autoComplete="new-password"
        />
        <Input
          label={t('auth.confirmPassword')}
          type="password"
          value={form.password_confirmation}
          onChange={(e) => setForm({ ...form, password_confirmation: e.target.value })}
          error={errors.password_confirmation}
          required
          autoComplete="new-password"
        />

        <Button type="submit" className="w-full" loading={processing}>
          {t('auth.register')}
        </Button>
      </form>

      <p className="mt-3 text-center text-sm text-text/60">
        {t('auth.hasAccount')}{' '}
        <Link href="/login" className="font-medium text-gold hover:text-gold-light">
          {t('auth.login')}
        </Link>
      </p>
    </AuthLayout>
  );
}
