import { useState, useEffect } from 'react';
import { getPublishedAssignments } from '../services/assignmentService';
import AssignmentCard from '../components/AssignmentCard';

export default function StudentDashboard() {
    const [assignments, setAssignments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchAssignments();
    }, []);

    const fetchAssignments = async () => {
        try {
            setLoading(true);
            const data = await getPublishedAssignments();
            setAssignments(data);
        } catch (err) {
            setError('Failed to load published assignments.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

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
                <div className="absolute -top-24 -right-24 w-80 h-80 bg-gradient-to-br from-amber-100 to-yellow-100 rounded-full opacity-50 blur-3xl mix-blend-multiply pointer-events-none"></div>
                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <span className="p-2 bg-amber-100 text-amber-600 rounded-xl">
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477-4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                            </span>
                            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Student Study Hub</h1>
                        </div>
                        <p className="text-gray-500 font-medium ml-11">View new assignments and track your course progress</p>
                    </div>
                </div>
            </div>

            {error && (
                <div className="mb-8 bg-red-50 text-red-600 p-4 rounded-2xl border border-red-100 flex items-center shadow-sm">
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    <span className="font-medium">{error}</span>
                </div>
            )}

            {assignments.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200 shadow-sm flex flex-col items-center">
                    <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                        <span className="text-3xl">🎉</span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">No Active Assignments!</h3>
                    <p className="text-gray-500 font-medium">You're all caught up. Take a break and relax.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {assignments.map((assignment) => (
                        <AssignmentCard
                            key={assignment._id}
                            assignment={assignment}
                            role="student"
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
