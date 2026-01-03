import { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import api from '../api';

export default function CalendarPage() {
    const [events, setEvents] = useState([]);
    const [mentees, setMentees] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [newEvent, setNewEvent] = useState({ mentee_id: '', start_time: '', duration: 60 });

    useEffect(() => {
        fetchEvents();
        api.get('/api/v1/mentees').then(res => setMentees(res.data));
    }, []);

    const fetchEvents = () => {
        api.get('/api/v1/sessions').then(res => {
            const formattedEvents = res.data.map(session => ({
                id: session.id,
                title: `멘토링 #${session.mentee_id}`, // In real app, join with mentee name
                start: session.start_time,
                end: new Date(new Date(session.start_time).getTime() + session.duration_minutes * 60000).toISOString(),
                backgroundColor: 'var(--color-primary)',
                borderColor: 'var(--color-primary)'
            }));
            setEvents(formattedEvents);
        });
    };

    const handleDateClick = (arg) => {
        setSelectedDate(arg.dateStr);
        setNewEvent({ ...newEvent, start_time: arg.dateStr + 'T10:00' });
        setShowModal(true);
    };

    const handleEventDrop = async (info) => {
        const newStart = info.event.start.toISOString();
        try {
            await api.put(`/api/v1/sessions/${info.event.id}`, {
                start_time: newStart
            });
            alert('일정이 변경되었습니다.');
        } catch (error) {
            info.revert();
            alert('일정 변경 실패');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/api/v1/sessions', {
                mentee_id: parseInt(newEvent.mentee_id),
                start_time: newEvent.start_time,
                duration_minutes: 60
            });
            setShowModal(false);
            fetchEvents();
        } catch (error) {
            alert('세션 생성 실패');
        }
    };

    return (
        <div style={{ height: 'calc(100vh - 4rem)', display: 'flex', flexDirection: 'column' }}>
            <h1>캘린더</h1>
            <div className="card" style={{ flex: 1, marginTop: '1rem' }}>
                <FullCalendar
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    initialView="dayGridMonth"
                    headerToolbar={{
                        left: 'prev,next today',
                        center: 'title',
                        right: 'dayGridMonth,timeGridWeek,timeGridDay'
                    }}
                    editable={true}
                    selectable={true}
                    events={events}
                    dateClick={handleDateClick}
                    eventDrop={handleEventDrop}
                    height="100%"
                />
            </div>

            {showModal && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1000,
                    display: 'flex', justifyContent: 'center', alignItems: 'center'
                }}>
                    <div className="card" style={{ width: '400px' }}>
                        <h2>일정 등록</h2>
                        <form onSubmit={handleSubmit}>
                            <div style={{ marginBottom: '1rem' }}>
                                <label>멘티</label>
                                <select
                                    value={newEvent.mentee_id}
                                    onChange={e => setNewEvent({ ...newEvent, mentee_id: e.target.value })}
                                    required
                                >
                                    <option value="">멘티 선택</option>
                                    {mentees.map(m => (
                                        <option key={m.id} value={m.id}>{m.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div style={{ marginBottom: '1rem' }}>
                                <label>날짜 및 시간</label>
                                <input
                                    type="datetime-local"
                                    value={newEvent.start_time}
                                    onChange={e => setNewEvent({ ...newEvent, start_time: e.target.value })}
                                    required
                                />
                            </div>
                            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                                <button type="button" className="btn" onClick={() => setShowModal(false)} style={{ border: '1px solid var(--color-border)' }}>취소</button>
                                <button type="submit" className="btn btn-primary">등록</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
