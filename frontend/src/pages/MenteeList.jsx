import { useEffect, useState } from 'react';
import api from '../api';
import { Plus, Trash2 } from 'lucide-react';

export default function MenteeList() {
    const [mentees, setMentees] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [newMentee, setNewMentee] = useState({ name: '', goal: '' });

    const fetchMentees = () => {
        api.get('/api/v1/mentees').then(res => setMentees(res.data));
    };

    useEffect(() => {
        fetchMentees();
    }, []);

    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            await api.post('/api/v1/mentees', newMentee);
            setShowModal(false);
            setNewMentee({ name: '', goal: '' });
            fetchMentees();
        } catch (error) {
            alert('Failed to create mentee');
        }
    };

    const handleDelete = async (id) => {
        if (confirm('Are you sure you want to delete this mentee?')) {
            await api.delete(`/api/v1/mentees/${id}`);
            fetchMentees();
        }
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1>Mentee Management</h1>
                <button className="btn btn-primary" onClick={() => setShowModal(true)}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Plus size={16} /> Add Mentee
                    </div>
                </button>
            </div>

            <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Goal</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mentees.map(mentee => (
                            <tr key={mentee.id}>
                                <td>#{mentee.id}</td>
                                <td style={{ fontWeight: 500 }}>{mentee.name}</td>
                                <td>{mentee.goal}</td>
                                <td>
                                    <button onClick={() => handleDelete(mentee.id)} style={{ color: '#ef4444' }}>
                                        <Trash2 size={16} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {mentees.length === 0 && (
                            <tr>
                                <td colSpan="4" style={{ textAlign: 'center', padding: '2rem' }}>No mentees found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {showModal && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center'
                }}>
                    <div className="card" style={{ width: '400px' }}>
                        <h2 style={{ marginBottom: '1.5rem' }}>Add New Mentee</h2>
                        <form onSubmit={handleCreate}>
                            <div style={{ marginBottom: '1rem' }}>
                                <label>Name</label>
                                <input
                                    value={newMentee.name}
                                    onChange={e => setNewMentee({ ...newMentee, name: e.target.value })}
                                    required
                                />
                            </div>
                            <div style={{ marginBottom: '1.5rem' }}>
                                <label>Goal</label>
                                <textarea
                                    value={newMentee.goal}
                                    onChange={e => setNewMentee({ ...newMentee, goal: e.target.value })}
                                />
                            </div>
                            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                                <button type="button" className="btn" onClick={() => setShowModal(false)} style={{ border: '1px solid var(--color-border)' }}>Cancel</button>
                                <button type="submit" className="btn btn-primary">Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
