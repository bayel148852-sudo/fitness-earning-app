import { useEffect, useState } from 'react';
import { Flame, Home, Trophy, Dumbbell, Sparkles, Target, LogOut } from 'lucide-react';
import './index.css';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';

const defaultUser = {
  id: 'demo-user',
  name: 'Aster Vale',
  email: 'demo@winterarc.app',
  avatar: '🏆',
  level: 12,
  streak: 18,
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<any>(defaultUser);
  const [currentPage, setCurrentPage] = useState('overview');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('winterArcUser');
    const token = localStorage.getItem('winterArcToken');

    if (savedUser && token) {
      setUser(JSON.parse(savedUser));
      setIsLoggedIn(true);
    }

    setLoading(false);
  }, []);

  const handleLogin = (userData: any, token: string) => {
    localStorage.setItem('winterArcUser', JSON.stringify(userData));
    localStorage.setItem('winterArcToken', token);
    setUser(userData);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('winterArcUser');
    localStorage.removeItem('winterArcToken');
    setIsLoggedIn(false);
    setUser(defaultUser);
    setCurrentPage('overview');
  };

  if (loading) {
    return <div className="loading-screen">Загрузка...</div>;
  }

  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand">
          <div className="brand-badge">❄️</div>
          <h1>Winter Arc</h1>
        </div>

        <div className="badge-mini">
          <Flame size={14} color="#ff9f5a" />
          {user.streak} day streak
        </div>

        <button className="secondary-btn" onClick={handleLogout}>
          <LogOut size={16} />
          Выход
        </button>
      </header>

      <div className="dashboard">
        <aside className="sidebar">
          <div className="user-card">
            <div className="avatar">{user.avatar}</div>
            <div className="user-name">{user.name}</div>
            <div className="user-role">Level {user.level} · Elite</div>
          </div>

          <nav className="nav-list">
            {[
              { label: 'Overview', key: 'overview', icon: Home },
              { label: 'Train', key: 'train', icon: Dumbbell },
              { label: 'Goals', key: 'goals', icon: Target },
              { label: 'Rewards', key: 'rewards', icon: Trophy },
              { label: 'Boost', key: 'boost', icon: Sparkles },
            ].map(({ label, key, icon: Icon }) => (
              <button
                key={key}
                className={`nav-item ${currentPage === key ? 'active' : ''}`}
                onClick={() => setCurrentPage(key)}
              >
                <Icon size={18} />
                <span>{label}</span>
              </button>
            ))}
          </nav>
        </aside>

        <main className="main-panel">
          <DashboardPage page={currentPage} user={user} setUser={setUser} />
        </main>
      </div>
    </div>
  );
}

export default App;