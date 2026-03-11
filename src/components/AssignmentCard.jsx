import { Link } from 'react-router-dom';
import StatusBadge from './StatusBadge';
import { formatDate, isPastDue } from '../utils/dateUtils';

export default function AssignmentCard({ assignment, role, onDelete, onStatusChange }) {
    const { _id, title, description, dueDate, status } = assignment;
    const overdue = isPastDue(dueDate);

    return (
        <div className="group bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-amber-200 transition-all duration-300 p-6 flex flex-col h-full transform hover:-translate-y-1 overflow-hidden relative">
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-amber-100 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-2xl z-0 pointer-events-none"></div>
            <div className="relative z-10 flex flex-col flex-grow">
                <div className="flex items-start justify-between gap-4 mb-4">
                    <StatusBadge status={status} />

                    {overdue && status !== 'Completed' && (
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-red-600 bg-red-50 px-2.5 py-1 rounded-full border border-red-100">
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                            Overdue
                        </span>
                    )}
                </div>

                <div className="mb-4">
                    <h3 className="text-xl font-bold text-gray-900 line-clamp-1 mb-1 group-hover:text-amber-600 transition-colors">
                        {title}
                    </h3>
                    <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">
                        {description}
                    </p>
                </div>

                <div className="mt-auto">
                    <div className="flex items-center gap-2 text-sm text-gray-500 font-medium mb-6 bg-gray-50/50 p-2.5 rounded-xl">
                        <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                        Due: <span className="text-gray-900">{formatDate(dueDate)}</span>
                    </div>

                    {role === 'teacher' && (
                        <div className="flex flex-wrap items-center gap-2">
                            {status === 'Draft' && (
                                <>
                                    <button
                                        onClick={() => onStatusChange(_id, 'Published')}
                                        className="flex-1 rounded-xl bg-gray-900 px-4 py-2 text-sm font-semibold text-amber-400 shadow-sm hover:bg-gray-800 hover:shadow-md transition-all active:scale-95"
                                    >
                                        Publish
                                    </button>
                                    <button
                                        onClick={() => onDelete(_id)}
                                        className="rounded-xl px-4 py-2 text-sm font-semibold text-red-600 bg-red-50 hover:bg-red-100 transition-all active:scale-95 border border-red-100"
                                    >
                                        Delete
                                    </button>
                                </>
                            )}

                            {status === 'Published' && (
                                <>
                                    <button
                                        onClick={() => onStatusChange(_id, 'Completed')}
                                        className="rounded-xl bg-gray-200 px-4 py-2 text-sm font-semibold text-gray-800 shadow-sm hover:bg-gray-300 hover:shadow-md transition-all active:scale-95 flex items-center justify-center gap-1.5"
                                    >
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                                        Complete
                                    </button>
                                    <Link
                                        to={`/assignments/${_id}`}
                                        className="flex-1 text-center rounded-xl bg-gray-900 px-4 py-2 text-sm font-semibold text-amber-400 hover:bg-gray-800 transition-all active:scale-95 shadow-sm"
                                    >
                                        Submissions
                                    </Link>
                                </>
                            )}

                            {status === 'Completed' && (
                                <Link
                                    to={`/assignments/${_id}`}
                                    className="w-full text-center rounded-xl bg-gray-100 px-4 py-2.5 text-sm font-bold text-gray-700 hover:bg-gray-200 transition-all active:scale-95 border border-gray-200"
                                >
                                    View Details
                                </Link>
                            )}
                        </div>
                    )}

                    {role === 'student' && (
                        <div>
                            <Link
                                to={`/assignments/${_id}`}
                                className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 px-4 py-2.5 text-sm font-bold text-gray-900 hover:from-amber-500 hover:to-yellow-500 transition-all active:scale-95 shadow-md shadow-amber-500/20"
                            >
                                View &amp; Submit
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7" /></svg>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
