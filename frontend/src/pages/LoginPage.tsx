import { useState } from 'react';

interface LoginPageProps {
  onLogin: (token: string, user: any) => void;
}

export default function LoginPage({ onLogin }: LoginPageProps) {
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState('Aster Vale');
  const [email, setEmail] = useState('demo@winterarc.app');
  const [password, setPassword] = useState('123456');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('http://localhost:5000/api/auth/' + (isRegister ? 'register' : 'login'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Ошибка входа');
      }

      onLogin(data.token, data.user);
    } catch (error: any) {
      setMessage(error.message || 'Что-то пошло не так');
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
          <p>{isRegister ? 'Start your Cold season journey.' : 'Welcome back, champion.'}</p>
        </div>

        <form className="login-form" onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
          {isRegister && (
            <div className="field">
              <label>Имя</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ваше имя"
              />
            </div>
          )}

          <div className="field">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
            />
          </div>

          <div className="field">
            <label>Пароль</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••"
            />
          </div>

          {message && <div className="login-error">{message}</div>}

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
