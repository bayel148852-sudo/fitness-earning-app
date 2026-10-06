import { useState } from 'react';

type LoginPageProps = {
  onLogin: (user: any, token: string) => void;
};

export default function LoginPage({ onLogin }: LoginPageProps) {
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState('Aster Vale');
  const [email, setEmail] = useState('demo@winterarc.app');
  const [password, setPassword] = useState('123456');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    setError('');

    try {
      const endpoint = isRegister ? 'register' : 'login';
      const body = isRegister ? { name, email, password } : { email, password };

      const response = await fetch(`http://localhost:5000/api/auth/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Ошибка входа');
      }

      onLogin(data.user, data.token);
    } catch (err: any) {
      setError(err.message || 'Не удалось войти');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-header">
          <div className="brand-badge large">❄️</div>
          <h1>{isRegister ? 'Create account' : 'Winter Arc'}</h1>
          <p>{isRegister ? 'Start your winter streak.' : 'Welcome back, champion.'}</p>
        </div>

        <form
          className="login-form"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          {isRegister && (
            <div className="field">
              <label>Имя</label>
              <input value={name} onChange={(e) => setName(e.target.value)} />
            </div>
          )}

          <div className="field">
            <label>Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>

          <div className="field">
            <label>Пароль</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>

          {error && <div className="login-error">{error}</div>}

          <button type="submit" className="primary-btn full" disabled={loading}>
            {loading ? 'Подождите...' : isRegister ? 'Создать' : 'Войти'}
          </button>

          <button
            type="button"
            className="secondary-btn full"
            onClick={() => setIsRegister((v) => !v)}
          >
            {isRegister ? 'Уже есть аккаунт?' : 'Нет аккаунта?'}
          </button>
        </form>
      </div>
    </div>
  );
}