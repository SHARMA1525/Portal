import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { getAssignmentById } from '../services/assignmentService';
import { getSubmissions } from '../services/submissionService';
import StatusBadge from '../components/StatusBadge';
import SubmissionForm from '../components/SubmissionForm';
import { formatDate, isPastDue } from '../utils/dateUtils';

export default function AssignmentDetails() {
    const { id } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();

    const [assignment, setAssignment] = useState(null);
    const [submissions, setSubmissions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        loadData();
    }, [id, user.role]);

    const loadData = async () => {
        try {
            setLoading(true);
            const assignmentData = await getAssignmentById(id);
            setAssignment(assignmentData);

            const submissionsData = await getSubmissions(id);
            setSubmissions(submissionsData);
        } catch (err) {
            console.error(err);
            setError('Failed to load assignment details.');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmitted = (newSubmission) => {
        setSubmissions([newSubmission]);
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

    if (error || !assignment) {
        return (
            <div className="max-w-4xl mx-auto px-4 py-12">
                <div className="bg-red-50 text-red-600 p-6 rounded-2xl border border-red-100 flex items-center shadow-sm">
                    <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                    <span className="font-medium text-lg">{error || 'Assignment not found.'}</span>
                </div>
                <button
                    onClick={() => navigate(-1)}
                    className="mt-6 flex items-center text-amber-600 hover:text-amber-700 font-bold group bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-100 w-fit"
                >
                    <svg className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                    Go Back
                </button>
            </div>
        );
    }

    const overdue = isPastDue(assignment.dueDate);
    const isTeacher = user.role === 'teacher';
    const hasSubmitted = submissions.length > 0;

    return (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-fade-in font-sans">
            <div>
                <button
                    onClick={() => navigate(isTeacher ? '/teacher-dashboard' : '/student-dashboard')}
                    className="group flex items-center text-sm font-bold text-gray-500 hover:text-gray-900 transition-colors mb-6 bg-white px-4 py-2 rounded-xl border border-gray-200 shadow-sm w-fit"
                >
                    <svg className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                    Back to Dashboard
                </button>

                <div className="bg-white shadow-xl shadow-amber-100/20 rounded-3xl border border-gray-100 overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-amber-50 to-yellow-50 rounded-full blur-3xl -mr-32 -mt-32 mix-blend-multiply pointer-events-none"></div>

                    <div className="px-6 py-8 sm:p-10 relative z-10 flex flex-col md:flex-row md:justify-between items-start gap-6 border-b border-gray-100">
                        <div className="space-y-4">
                            <h3 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                                {assignment.title}
                            </h3>
                            <div className="flex flex-wrap items-center gap-3">
                                <div className="flex items-center gap-1.5 text-sm font-semibold text-gray-600 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-200">
                                    <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                    Due: {formatDate(assignment.dueDate)}
                                </div>
                                {overdue && assignment.status !== 'Completed' && (
                                    <span className="inline-flex items-center gap-1 text-sm font-bold text-red-600 bg-red-50 px-3 py-1.5 rounded-lg border border-red-100">
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                                        Overdue
                                    </span>
                                )}
                            </div>
                        </div>
                        <div className="shrink-0">
                            <StatusBadge status={assignment.status} />
                        </div>
                    </div>
                    <div className="px-6 py-8 sm:p-10 bg-gray-50/30">
                        <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Instructions</h4>
                        <div className="prose prose-amber max-w-none text-gray-700 leading-relaxed bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                            <p className="whitespace-pre-wrap">{assignment.description}</p>
                        </div>
                    </div>
                </div>
            </div>
            {!isTeacher && (
                <div className="bg-white shadow-xl shadow-amber-100/20 rounded-3xl border border-gray-100 overflow-hidden">
                    <div className="px-6 py-6 sm:px-10 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
                        <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                            <span className="p-1.5 bg-amber-100 text-amber-600 rounded-lg">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                            </span>
                            Your Submission
                        </h3>
                    </div>
                    <div className="px-6 py-8 sm:p-10">
                        {hasSubmitted ? (
                            <div className="space-y-6">
                                <div className="rounded-2xl bg-emerald-50 p-6 border border-emerald-100 shadow-sm flex items-start gap-4">
                                    <div className="shrink-0 p-2 bg-emerald-100 rounded-full mt-0.5">
                                        <svg className="w-5 h-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                                    </div>
                                    <div>
                                        <h3 className="text-base font-bold text-emerald-900 mb-1">
                                            Successfully Submitted
                                        </h3>
                                        <p className="text-sm text-emerald-700 font-medium">
                                            Turned in on {formatDate(submissions[0].createdAt)}
                                        </p>
                                    </div>
                                </div>
                                <div className="bg-white border-2 border-gray-100 rounded-2xl p-8 relative">
                                    <div className="absolute top-0 left-8 -mt-3 bg-white px-2 text-xs font-bold text-gray-400 uppercase tracking-widest">
                                        Your Answer
                                    </div>
                                    <p className="text-gray-800 whitespace-pre-wrap leading-relaxed">
                                        {submissions[0].answer}
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <div className="bg-white">
                                <SubmissionForm
                                    assignmentId={assignment._id}
                                    disabled={assignment.status === 'Completed' || overdue}
                                    onSubmitted={handleSubmitted}
                                />
                            </div>
                        )}

                        {!hasSubmitted && assignment.status === 'Completed' && (
                            <div className="mt-6 flex items-center gap-2 text-sm font-bold text-red-600 bg-red-50 p-4 rounded-xl border border-red-100">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                                This assignment is marked as completed. Submissions are closed.
                            </div>
                        )}
                        {!hasSubmitted && overdue && assignment.status !== 'Completed' && (
                            <div className="mt-6 flex items-center gap-2 text-sm font-bold text-red-600 bg-red-50 p-4 rounded-xl border border-red-100">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                                The due date has passed. Submissions are closed.
                            </div>
                        )}
                    </div>
                </div>
            )}
            {isTeacher && (
                <div className="bg-white shadow-xl shadow-amber-100/20 rounded-3xl border border-gray-100 overflow-hidden">
                    <div className="px-6 py-6 sm:px-10 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
                        <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                            <span className="p-1.5 bg-amber-100 text-amber-600 rounded-lg">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                            </span>
                            Student Submissions ({submissions.length})
                        </h3>
                    </div>

                    {submissions.length === 0 ? (
                        <div className="px-6 py-20 text-center flex flex-col items-center justify-center">
                            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4 border border-gray-100">
                                <svg className="w-8 h-8 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" /></svg>
                            </div>
                            <p className="text-gray-500 font-medium">No submissions have been received yet.</p>
                        </div>
                    ) : (
                        <ul className="divide-y divide-gray-100">
                            {submissions.map((sub) => (
                                <li key={sub._id} className="p-6 sm:p-8 hover:bg-gray-50/50 transition-colors">
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-amber-500 flex items-center justify-center text-gray-900 font-extrabold shadow-inner">
                                                {(sub.studentName || sub.studentEmail || 'U').charAt(0).toUpperCase()}
                                            </div>
                                            <h4 className="text-base font-bold text-gray-900">
                                                {sub.studentName || sub.studentEmail || 'Unknown Student'}
                                            </h4>
                                        </div>
                                        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 bg-white border border-gray-200 px-3 py-1.5 rounded-lg shadow-sm">
                                            <svg className="w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                            {formatDate(sub.createdAt)}
                                        </span>
                                    </div>
                                    <div className="bg-white border border-gray-100 shadow-sm rounded-2xl p-6 text-sm text-gray-800 whitespace-pre-wrap leading-relaxed pl-14">
                                        {sub.answer}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}
        </div>
    );
}
