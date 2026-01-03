import { NavLink, Outlet } from 'react-router-dom';
import { LayoutDashboard, Users, Calendar } from 'lucide-react';

export default function Layout() {
    return (
        <div className="layout">
            <aside className="sidebar">
                <h2 style={{ marginBottom: '2rem', color: 'var(--color-primary)' }}>Mentoring</h2>
                <nav>
                    <NavLink to="/" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                        <LayoutDashboard size={20} />
                        Dashboard
                    </NavLink>
                    <NavLink to="/mentees" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                        <Users size={20} />
                        Mentees
                    </NavLink>
                    <NavLink to="/calendar" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                        <Calendar size={20} />
                        Calendar
                    </NavLink>
                </nav>
            </aside>
            <main className="main-content">
                <Outlet />
            </main>
        </div>
    );
}
