import { useEffect, useState } from 'react';
import api from '../api';
import { Users, Calendar, CheckCircle } from 'lucide-react';

export default function Dashboard() {
    const [stats, setStats] = useState({ total_mentees: 0, upcoming_sessions: 0, active_mentees: 0 });

    useEffect(() => {
        api.get('/api/v1/stats')
            .then(res => setStats(res.data))
            .catch(err => console.error(err));
    }, []);

    return (
        <div>
            <h1 style={{ marginBottom: '2rem' }}>Dashboard</h1>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
                <div className="card">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--color-primary)' }}>
                        <Users size={32} />
                        <div>
                            <p style={{ margin: 0, color: 'var(--color-text-light)' }}>Active Mentees</p>
                            <p style={{ margin: 0, fontSize: '2rem', fontWeight: 'bold', color: 'var(--color-text)' }}>{stats.active_mentees}</p>
                        </div>
                    </div>
                </div>

                <div className="card">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: '#10b981' }}>
                        <Calendar size={32} />
                        <div>
                            <p style={{ margin: 0, color: 'var(--color-text-light)' }}>Upcoming Sessions</p>
                            <p style={{ margin: 0, fontSize: '2rem', fontWeight: 'bold', color: 'var(--color-text)' }}>{stats.upcoming_sessions}</p>
                        </div>
                    </div>
                </div>
            </div>

            <h2>Today's Schedule</h2>
            <div className="card" style={{ marginTop: '1rem', textAlign: 'center', color: 'var(--color-text-light)' }}>
                <p>No sessions scheduled for today.</p>
                {/* Placeholder: Real implementation would fetch today's sessions */}
            </div>
        </div>
    );
}
