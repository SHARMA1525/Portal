const STATUS_STYLES = {
    Draft: 'bg-gray-100 text-gray-700 ring-gray-600/20',
    Published: 'bg-amber-100 text-amber-800 ring-amber-600/20',
    Completed: 'bg-gray-900 text-amber-400 ring-gray-900/50',
};

const STATUS_ICONS = {
    Draft: <svg className="w-3.5 h-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>,
    Published: <svg className="w-3.5 h-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>,
    Completed: <svg className="w-3.5 h-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
};

export default function StatusBadge({ status }) {
    const style = STATUS_STYLES[status] || 'bg-gray-100 text-gray-700 ring-gray-600/20';
    const icon = STATUS_ICONS[status] || STATUS_ICONS.Draft;

    return (
        <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-inset ${style}`}>
            {icon}
            {status}
        </span>
    );
}
