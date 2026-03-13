import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createAssignment } from '../services/assignmentService';
import { toInputDate } from '../utils/dateUtils';

export default function CreateAssignment() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        dueDate: toInputDate(new Date()),
        status: 'Draft',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await createAssignment(formData);
            navigate('/teacher-dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to create assignment.');
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in font-sans">

            <button
                onClick={() => navigate('/teacher-dashboard')}
                className="group flex items-center text-sm font-bold text-gray-500 hover:text-gray-900 transition-colors mb-6 bg-white px-4 py-2 rounded-xl border border-gray-200 shadow-sm w-fit"
            >
                <svg className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                Back to Dashboard
            </button>

            <div className="bg-white rounded-3xl shadow-xl shadow-amber-100/20 border border-gray-100 overflow-hidden relative">
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-amber-100 to-yellow-100 rounded-full blur-3xl -mr-32 -mt-32 mix-blend-multiply pointer-events-none"></div>

                <div className="px-6 py-8 md:px-10 border-b border-gray-100 relative z-10 flex items-center gap-4">
                    <div className="p-3 bg-amber-100 text-amber-600 rounded-2xl">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                    </div>
                    <div>
                        <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">
                            Compose Assignment
                        </h2>
                        <p className="text-gray-500 font-medium text-sm mt-1">Draft a new objective for your students.</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="px-6 py-8 md:p-10 space-y-8 relative z-10 bg-gray-50/30">
                    {error && (
                        <div className="bg-red-50 text-red-600 p-4 rounded-2xl border border-red-100 flex items-center shadow-sm">
                            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            <span className="font-medium text-sm">{error}</span>
                        </div>
                    )}

                    <div className="space-y-6">
                        <div>
                            <label htmlFor="title" className="block text-sm font-bold text-gray-700 mb-2 ml-1">
                                Assignment Title
                            </label>
                            <input
                                type="text"
                                name="title"
                                id="title"
                                required
                                value={formData.title}
                                onChange={handleChange}
                                className="block w-full py-3.5 px-4 bg-white border border-gray-200 rounded-2xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all shadow-sm placeholder-gray-400 font-medium"
                                placeholder="e.g., Midterm Essay: The Impact of AI"
                            />
                        </div>

                        <div>
                            <label htmlFor="description" className="block text-sm font-bold text-gray-700 mb-2 ml-1">
                                Instructions & Details
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                rows={5}
                                required
                                value={formData.description}
                                onChange={handleChange}
                                className="block w-full py-4 px-4 bg-white border border-gray-200 rounded-2xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all shadow-sm placeholder-gray-400 font-medium leading-relaxed"
                                placeholder="Describe the assignment requirements, rubrics, and any necessary resources..."
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="dueDate" className="block text-sm font-bold text-gray-700 mb-2 ml-1">
                                    Due Date
                                </label>
                                <input
                                    type="date"
                                    name="dueDate"
                                    id="dueDate"
                                    required
                                    value={formData.dueDate}
                                    onChange={handleChange}
                                    min={toInputDate(new Date())}
                                    className="block w-full py-3.5 px-4 bg-white border border-gray-200 rounded-2xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all shadow-sm font-medium"
                                />
                            </div>

                            <div>
                                <label htmlFor="status" className="block text-sm font-bold text-gray-700 mb-2 ml-1">
                                    Publication Status
                                </label>
                                <div className="relative">
                                    <select
                                        id="status"
                                        name="status"
                                        value={formData.status}
                                        onChange={handleChange}
                                        className="appearance-none block w-full py-3.5 px-4 bg-white border border-gray-200 rounded-2xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all shadow-sm font-medium pr-10"
                                    >
                                        <option value="Draft">Save as Draft (Hidden)</option>
                                        <option value="Published">Publish Immediately</option>
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="pt-6 mt-8 flex items-center justify-end gap-4 border-t border-gray-200">
                        <button
                            type="button"
                            onClick={() => navigate('/teacher-dashboard')}
                            className="rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-gray-700 shadow-sm border border-gray-200 hover:bg-gray-50 hover:text-gray-900 transition-all focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 active:scale-95"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="group inline-flex items-center justify-center rounded-xl bg-gray-900 px-8 py-3.5 text-sm font-bold text-amber-400 shadow-lg shadow-gray-900/20 hover:bg-gray-800 hover:shadow-xl transition-all focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed active:scale-95"
                        >
                            {loading ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-amber-400" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                    </svg>
                                    Processing...
                                </>
                            ) : (
                                <>
                                    {formData.status === 'Draft' ? 'Save Draft' : 'Publish Assignment'}
                                    <svg className="w-4 h-4 ml-2 opacity-70 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
