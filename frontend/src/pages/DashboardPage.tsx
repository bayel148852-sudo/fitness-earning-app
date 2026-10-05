import { useEffect, useState } from 'react';
import { ChevronRight, Flame, Zap, Trophy, Target, ArrowUpRight } from 'lucide-react';

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

export default function DashboardPage({ page, user, setUser }: any) {
  const [dashboard, setDashboard] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) return;

    fetch('http://localhost:5000/api/dashboard', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.user) {
          setUser(data.user);
        }
        setDashboard(data);
      })
      .catch((err) => console.error('Dashboard fetch failed', err));
  }, [setUser]);

  if (!dashboard) {
    return <div className="card">Загрузка панели...</div>;
  }

  const stats = [
    { label: 'Streak', value: `${dashboard.overview.streak} days`, trend: '+3 from last week' },
    { label: 'Workout XP', value: String(dashboard.overview.xp), trend: '+220 today' },
    { label: 'Coins', value: String(dashboard.overview.coins), trend: '+50 earned' },
    { label: 'Recovery', value: `${dashboard.overview.recovery}%`, trend: 'Well rested' },
  ];

  const renderOverview = () => (
    <>
      <section className="hero">
        <div>
          <h2>Build your cold-season power.</h2>
          <p>
            Keep your streak alive, complete high-impact sessions, and unlock rewards that push your discipline further every day.
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
            <span className="tag">{workouts.length} sessions</span>
          </div>

          <div className="workout-list">
            {workouts.map(({ title, type, duration, difficulty }) => (
              <div key={title} className="workout-item">
                <div className="workout-main">
                  <div className="icon-box">⚡</div>
                  <div className="workout-info">
                    <h4>{title}</h4>
                    <div className="workout-meta">{type} · {duration}</div>
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
    </>
  );

  const renderTrain = () => (
    <div className="card">
      <div className="section-header">
        <h3>Training plan</h3>
        <span className="tag">Power mode</span>
      </div>

      <div className="stack">
        {workouts.map((item) => (
          <div key={item.title} className="training-card">
            <div className="training-head">
              <div>
                <p className="mini-label">Session</p>
                <h4>{item.title}</h4>
              </div>
              <div className="pill">{item.difficulty}</div>
            </div>
            <div className="training-meta">
              <span>{item.type}</span>
              <span>{item.duration}</span>
            </div>
            <button className="primary-btn small">Start training</button>
          </div>
        ))}
      </div>
    </div>
  );

  const renderGoals = () => (
    <div className="card">
      <div className="section-header">
        <h3>Goals</h3>
        <span className="tag">3 active</span>
      </div>
      <div className="stack">
        {[
          { title: '7-day streak', progress: 85, label: '6 of 7 days' },
          { title: 'Workout XP', progress: 68, label: '1360 / 2000 XP' },
          { title: 'Recovery score', progress: 92, label: '92% optimized' },
        ].map((goal) => (
          <div key={goal.title} className="goal-row">
            <div className="goal-top">
              <strong>{goal.title}</strong>
              <span>{goal.label}</span>
            </div>
            <div className="progress-bar">
              <span style={{ width: `${goal.progress}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderRewards = () => (
    <div className="card">
      <div className="section-header">
        <h3>Rewards</h3>
        <span className="tag">Keep pushing</span>
      </div>
      <div className="stack">
        {rewards.map((reward) => (
          <div key={reward.title} className="reward-item bigger">
            <div className="workout-main">
              <div className="reward-icon">🏅</div>
              <div className="workout-info">
                <h4>{reward.title}</h4>
                <div className="reward-meta">{reward.desc}</div>
              </div>
            </div>
            <div className="pill">{reward.value}</div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderBoost = () => (
    <div className="card">
      <div className="section-header">
        <h3>Boost & momentum</h3>
        <span className="tag">Daily</span>
      </div>
      <div className="boost-box">
        <div className="boost-row">
          <Flame size={20} />
          <span>Cold streak</span>
          <strong>{dashboard.overview.streak} days</strong>
        </div>
        <div className="boost-row">
          <Zap size={20} />
          <span>Power output</span>
          <strong>+24%</strong>
        </div>
        <div className="boost-row">
          <Trophy size={20} />
          <span>Rank</span>
          <strong>Top 10</strong>
        </div>
      </div>
    </div>
  );

  const views: Record<string, any> = {
    overview: renderOverview(),
    train: renderTrain(),
    goals: renderGoals(),
    rewards: renderRewards(),
    boost: renderBoost(),
  };

  return views[page] || views.overview;
}
