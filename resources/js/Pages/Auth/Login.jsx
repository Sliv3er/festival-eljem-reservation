import { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import AuthLayout from '../../Layouts/AuthLayout';
import useLocale from '../../hooks/useLocale';
import Input from '../../Components/Input';
import Button from '../../Components/Button';
import Alert from '../../Components/Alert';

export default function Login() {
  const { t } = useLocale();
  const [form, setForm] = useState({ email: '', password: '', remember: false });
  const [errors, setErrors] = useState({});
  const [processing, setProcessing] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setProcessing(true);
    // Simulate login
    setTimeout(() => { setProcessing(false); }, 1500);
  };

  return (
    <AuthLayout>
      <Head title={t('auth.loginTitle')} />

      <div>
        <h1 className="text-xl font-display font-bold text-text">{t('auth.loginTitle')}</h1>
        <p className="mt-1 text-sm text-text/60">{t('auth.loginSubtitle')}</p>
      </div>

      {errors.general && <Alert variant="error" className="mt-3">{errors.general}</Alert>}

      <form onSubmit={handleSubmit} className="mt-5 space-y-3.5">
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
          autoComplete="current-password"
        />

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={form.remember}
              onChange={(e) => setForm({ ...form, remember: e.target.checked })}
              className="h-4 w-4 rounded border-sandstone/30 text-gold focus:ring-gold/20"
            />
            <span className="text-sm text-text/70">{t('auth.rememberMe')}</span>
          </label>
          <Link href="/forgot-password" className="text-sm font-medium text-gold hover:text-gold-light">
            {t('auth.forgotPassword')}
          </Link>
        </div>

        <Button type="submit" className="w-full" loading={processing}>
          {t('auth.login')}
        </Button>
      </form>

      <p className="mt-4 text-center text-sm text-text/60">
        {t('auth.noAccount')}{' '}
        <Link href="/register" className="font-medium text-gold hover:text-gold-light">
          {t('auth.register')}
        </Link>
      </p>
    </AuthLayout>
  );
}
