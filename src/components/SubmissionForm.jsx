import { useState } from 'react';
import { submitAnswer } from '../services/submissionService';

export default function SubmissionForm({ assignmentId, disabled, onSubmitted }) {
    const [answer, setAnswer] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!answer.trim()) {
            setError('Please enter your answer before submitting.');
            return;
        }

        setSubmitting(true);

        try {
            const data = await submitAnswer(assignmentId, answer.trim());
            onSubmitted(data);
        } catch (err) {
            const message = err.response?.data?.message || 'Failed to submit. Please try again.';
            setError(message);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="answer" className="block text-sm font-bold text-gray-700 mb-2 pl-1">
                    Your Answer
                </label>
                <textarea
                    id="answer"
                    rows={6}
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    disabled={disabled || submitting}
                    placeholder="Type your answer here..."
                    className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm shadow-sm placeholder-gray-400 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/50 disabled:bg-gray-50 disabled:text-gray-400 transition-all outline-none"
                />
            </div>

            {error && (
                <div className="text-sm font-medium text-red-600 bg-red-50 py-2 px-3 rounded-xl border border-red-100 flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    {error}
                </div>
            )}

            <button
                type="submit"
                disabled={disabled || submitting}
                className="w-full sm:w-auto rounded-xl bg-amber-400 px-6 py-3 text-sm font-bold text-gray-900 shadow-md shadow-amber-400/20 hover:bg-amber-500 hover:shadow-lg hover:-translate-y-0.5 disabled:bg-gray-200 disabled:text-gray-400 disabled:shadow-none disabled:transform-none disabled:cursor-not-allowed transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
            >
                {submitting ? 'Submitting...' : 'Submit Answer'}
            </button>
        </form>
    );
}
