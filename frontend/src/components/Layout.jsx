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
                        대시보드
                    </NavLink>
                    <NavLink to="/mentees" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                        <Users size={20} />
                        멘티 관리
                    </NavLink>
                    <NavLink to="/calendar" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                        <Calendar size={20} />
                        캘린더
                    </NavLink>
                </nav>
            </aside>
            <main className="main-content">
                <Outlet />
            </main>
        </div>
    );
}
