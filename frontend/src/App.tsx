import { Flame, Home, Trophy, Dumbbell, Sparkles, Target, ChevronRight } from 'lucide-react';

const stats = [
  { label: 'Streak', value: '18 days', trend: '+3 from last week' },
  { label: 'Workout XP', value: '1280', trend: '+220 today' },
  { label: 'Coins', value: '245', trend: '+50 earned' },
  { label: 'Recovery', value: '92%', trend: 'Well rested' },
];

const workouts = [
  { title: 'Ice Sprint', type: 'Cardio', duration: '18 min', difficulty: 'Hard' },
  { title: 'Core Freeze', type: 'Abs', duration: '14 min', difficulty: 'Medium' },
  { title: 'Glacier Lift', type: 'Strength', duration: '24 min', difficulty: 'Hard' },
];

const rewards = [
  { title: 'Snowflake Badge', desc: '7-day streak', value: 'Unlock' },
  { title: 'Crown of Power', desc: '250 XP', value: 'Claim' },
  { title: 'Elite Pack', desc: 'Top 10 ranking', value: 'Open' },
];

const chartData = [36, 52, 45, 68, 74, 60, 90];

const navItems = [
  { label: 'Overview', icon: Home, active: true },
  { label: 'Train', icon: Dumbbell, active: false },
  { label: 'Goals', icon: Target, active: false },
  { label: 'Rewards', icon: Trophy, active: false },
  { label: 'Boost', icon: Sparkles, active: false },
];

const formatIcon = (icon: any) => {
  const Icon = icon;
  return <Icon size={18} />;
};

function App() {
  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand">
          <div className="brand-badge">❄️</div>
          <div>
            <h1>Winter Arc</h1>
          </div>
        </div>

        <div className="badge-mini">
          <Flame size={14} color="#ff9f5a" />
          18 day streak
        </div>
      </header>

      <div className="dashboard">
        <aside className="sidebar">
          <div className="user-card">
            <div className="avatar">🏆</div>
            <div className="user-name">Aster Vale</div>
            <div className="user-role">Level 12 · Elite</div>
          </div>

          <nav className="nav-list">
            {navItems.map(({ label, icon, active }) => (
              <button key={label} className={`nav-item ${active ? 'active' : ''}`}>
                {formatIcon(icon)}
                <span className="nav-label">{label}</span>
              </button>
            ))}
          </nav>
        </aside>

        <main className="main-panel">
          <section className="hero">
            <div>
              <h2>Build your cold-season power.</h2>
              <p>
                Keep your streak alive, complete high-impact sessions, and unlock rewards that push
                your discipline further every day.
              </p>
            </div>

            <div className="hero-actions">
              <button className="primary-btn">Start today</button>
              <button className="secondary-btn">View plan</button>
            </div>
          </section>

          <section className="stats-grid">
            {stats.map(({ label, value, trend }) => (
              <div key={label} className="stat-card">
                <div className="stat-label">
                  <span>{label}</span>
                  <span>↗</span>
                </div>
                <div className="stat-value">{value}</div>
                <div className="stat-trend">{trend}</div>
              </div>
            ))}
          </section>

          <section className="content-grid">
            <div className="card">
              <div className="section-header">
                <h3>Today’s plan</h3>
                <span className="tag">3 sessions</span>
              </div>

              <div className="workout-list">
                {workouts.map(({ title, type, duration, difficulty }) => (
                  <div key={title} className="workout-item">
                    <div className="workout-main">
                      <div className="icon-box">⚡</div>
                      <div className="workout-info">
                        <h4>{title}</h4>
                        <div className="workout-meta">
                          {type} · {duration}
                        </div>
                      </div>
                    </div>

                    <div className="pill">{difficulty}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="stack">
              <div className="card">
                <div className="section-header">
                  <h3>Rewards</h3>
                  <span className="tag">New</span>
                </div>

                {rewards.map(({ title, desc, value }) => (
                  <div key={title} className="reward-item">
                    <div className="workout-main">
                      <div className="reward-icon">🎁</div>
                      <div className="workout-info">
                        <h4>{title}</h4>
                        <div className="reward-meta">{desc}</div>
                      </div>
                    </div>

                    <div className="pill">{value}</div>
                  </div>
                ))}
              </div>

              <div className="card">
                <div className="section-header">
                  <h3>Weekly power</h3>
                  <span className="tag">+24%</span>
                </div>

                <div className="chart-panel">
                  {chartData.map((value, idx) => (
                    <div key={idx} className="bar-wrap">
                      <div className="bar" style={{ height: `${value}%` }} />
                      <div className="day-label">{['M', 'T', 'W', 'T', 'F', 'S', 'S'][idx]}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default App;
