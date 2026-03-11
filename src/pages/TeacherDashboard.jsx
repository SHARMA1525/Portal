import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAssignments, updateAssignmentStatus, deleteAssignment } from '../services/assignmentService';
import AssignmentCard from '../components/AssignmentCard';

export default function TeacherDashboard() {
    const [assignments, setAssignments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [filter, setFilter] = useState('All');

    useEffect(() => {
        fetchAssignments();
    }, []);

    const fetchAssignments = async () => {
        try {
            setLoading(true);
            const data = await getAssignments();
            setAssignments(data);
        } catch (err) {
            setError('Failed to load assignments.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleStatusChange = async (id, newStatus) => {
        try {
            await updateAssignmentStatus(id, newStatus);
            setAssignments(assignments.map(a =>
                a._id === id ? { ...a, status: newStatus } : a
            ));
        } catch (err) {
            console.error('Failed to change status:', err);
            alert('Failed to update assignment status.');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this draft?')) return;

        try {
            await deleteAssignment(id);
            setAssignments(assignments.filter(a => a._id !== id));
        } catch (err) {
            console.error('Failed to delete:', err);
            alert('Failed to delete assignment.');
        }
    };

    const filteredAssignments = filter === 'All'
        ? assignments
        : assignments.filter(a => a.status === filter);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="relative">
                    <div className="w-16 h-16 border-4 border-amber-200 rounded-full animate-spin"></div>
                    <div className="w-16 h-16 border-4 border-gray-900 rounded-full animate-spin absolute top-0 left-0 border-t-transparent"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in font-sans">
            <div className="bg-white rounded-3xl p-8 mb-8 shadow-sm border border-gray-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-gradient-to-br from-amber-100 to-yellow-100 rounded-full opacity-50 blur-3xl mix-blend-multiply pointer-events-none"></div>
                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <span className="p-2 bg-amber-100 text-amber-600 rounded-xl">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
                            </span>
                            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Teacher Workspace</h1>
                        </div>
                        <p className="text-gray-500 font-medium ml-11">Monitor, manage, and evaluate your class assignments</p>
                    </div>

                    <Link
                        to="/create-assignment"
                        className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gray-900 px-6 py-3.5 text-sm font-bold text-amber-400 shadow-lg shadow-gray-900/20 hover:bg-gray-800 hover:shadow-xl hover:-translate-y-0.5 transition-all outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
                    >
                        <svg className="w-5 h-5 transition-transform group-hover:rotate-90 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                        </svg>
                        Create New Assignment
                    </Link>
                </div>
            </div>

            {error && (
                <div className="mb-8 bg-red-50 text-red-600 p-4 rounded-2xl border border-red-100 flex items-center shadow-sm">
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    <span className="font-medium">{error}</span>
                </div>
            )}
            <div className="mb-8 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
                <div className="inline-flex bg-white border border-gray-200 rounded-2xl p-1.5 shadow-sm">
                    {['All', 'Draft', 'Published', 'Completed'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setFilter(tab)}
                            className={`
                                relative whitespace-nowrap px-6 py-2.5 text-sm font-semibold rounded-xl transition-all duration-300
                                ${filter === tab
                                    ? 'bg-amber-100 text-gray-900 shadow-sm ring-1 ring-amber-300'
                                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                                }
                            `}
                        >
                            {tab}
                            {filter === tab && (
                                <span className="absolute -bottom-1.5 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-gray-900 rounded-full"></span>
                            )}
                        </button>
                    ))}
                </div>
            </div>
            {filteredAssignments.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200 shadow-sm flex flex-col items-center">
                    <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                        <svg className="w-10 h-10 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"></path></svg>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">No Assignments Found</h3>
                    <p className="text-gray-500 font-medium">Get started by creating a new assignment loop.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredAssignments.map((assignment) => (
                        <AssignmentCard
                            key={assignment._id}
                            assignment={assignment}
                            role="teacher"
                            onDelete={handleDelete}
                            onStatusChange={handleStatusChange}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
