import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function Navbar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    if (!user) return null;

    const dashboardPath = user.role === 'teacher'
        ? '/teacher-dashboard'
        : '/student-dashboard';

    return (
        <div className="sticky top-0 z-50 px-4 sm:px-6 lg:px-8 py-4">
            <nav className="max-w-7xl mx-auto bg-white/80 backdrop-blur-md border border-white/20 shadow-sm shadow-amber-100/50 rounded-2xl px-6 py-3 transition-all">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Link to={dashboardPath} className="flex items-center gap-3 group">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-500 flex items-center justify-center shadow-md shadow-amber-200 group-hover:shadow-lg group-hover:-translate-y-0.5 transition-all">
                                <svg className="w-6 h-6 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477-4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                            </div>
                            <span className="text-xl font-extrabold text-gray-900 tracking-tight hidden sm:block">
                                Assignment Portal
                            </span>
                        </Link>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-xl border border-gray-100">
                            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
                            <span className="text-sm font-semibold text-gray-600">
                                {user.email}
                            </span>
                        </div>

                        <span className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold capitalize border shadow-sm
                            ${user.role === 'teacher'
                                ? 'bg-amber-50 text-amber-700 border-amber-100'
                                : 'bg-gray-50 text-gray-700 border-gray-100'
                            }`}
                        >
                            {user.role === 'teacher' ? (
                                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                            ) : (
                                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" /></svg>
                            )}
                            {user.role}
                        </span>

                        <div className="w-px h-6 bg-gray-200 mx-1 hidden sm:block"></div>

                        <button
                            onClick={handleLogout}
                            className="group flex items-center gap-2 text-sm font-bold text-gray-600 hover:text-red-600 hover:bg-red-50 px-4 py-2 rounded-xl transition-all active:scale-95 border border-transparent hover:border-red-100"
                        >
                            <span className="hidden sm:block">Log out</span>
                            <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                        </button>
                    </div>
                </div>
            </nav>
        </div>
    );
}
