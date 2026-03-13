import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { login, user } = useAuth();
    const navigate = useNavigate();

    if (user) {
        return <Navigate to={user.role === 'teacher' ? '/teacher-dashboard' : '/student-dashboard'} replace />;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const role = await login(email, password);
            if (role === 'teacher') {
                navigate('/teacher-dashboard');
            } else {
                navigate('/student-dashboard');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Invalid login credentials. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
    };

    return (
        <div className="min-h-screen w-full flex bg-[#f8fafc] overflow-hidden relative font-sans">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-amber-200/50 rounded-full mix-blend-multiply filter blur-[100px] animate-blob" />
            <div className="absolute top-[20%] right-[-10%] w-[35%] h-[45%] bg-gray-300/50 rounded-full mix-blend-multiply filter blur-[100px] animate-blob" style={{ animationDelay: '2s' }} />
            <div className="absolute bottom-[-10%] left-[20%] w-[40%] h-[40%] bg-yellow-200/30 rounded-full mix-blend-multiply filter blur-[100px] animate-blob" style={{ animationDelay: '4s' }} />

            <div className="w-full max-w-[1400px] mx-auto min-h-screen flex items-center justify-center p-4 sm:p-8 lg:p-12 relative z-10">
                <div className="w-full flex flex-col lg:flex-row bg-white/70 backdrop-blur-2xl rounded-[2.5rem] shadow-2xl border border-white/50 overflow-hidden min-h-[700px]">
                    <div className="relative w-full lg:w-5/12 bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white p-10 lg:p-16 flex flex-col justify-between overflow-hidden">
                        <div className="absolute inset-0 bg-[url('https://patterns.dev/img/ui/plus.svg')] opacity-5 mix-blend-overlay"></div>
                        <div className="absolute -top-24 -left-24 w-64 h-64 bg-amber-500/20 rounded-full blur-3xl"></div>
                        <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-gray-500/20 rounded-full blur-3xl"></div>
                        <div className="relative z-10 flex-grow flex flex-col">
                            <div className="inline-flex items-center gap-3 mb-10 lg:mb-16">
                                <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center shadow-lg shadow-amber-500/30">
                                    <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0v6" />
                                    </svg>
                                </div>
                                <span className="text-xl font-bold tracking-wide text-white">AssignFlow</span>
                            </div>

                            <div className="mb-8">
                                <h1 className="text-4xl lg:text-5xl font-extrabold leading-tight mb-4 tracking-tight drop-shadow-sm text-white">
                                    Simplify Your <br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-200">Class Workflow</span>
                                </h1>
                                <p className="text-gray-300 text-lg leading-relaxed max-w-sm">
                                    A seamless bridge between teachers drafting assignments and students delivering excellence.
                                </p>
                            </div>

                            <div className="mt-auto space-y-4">
                                <div className="p-5 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 transition-all duration-300 group">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="bg-amber-500/20 text-amber-300 text-xs font-bold px-2 py-0.5 rounded border border-amber-500/30 uppercase tracking-wider">Demo Teacher</span>
                                    </div>
                                    <div className="flex flex-col gap-1 text-sm font-medium text-white/90 font-mono">
                                        <div className="flex justify-between items-center group-hover:text-amber-400 transition-colors cursor-pointer" onClick={() => { setEmail('teacher@test.com'); setPassword('password123'); }}>
                                            <span>teacher@test.com</span>
                                        </div>
                                        <div className="flex justify-between items-center group-hover:text-amber-400 transition-colors text-white/60">
                                            <span>password123</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-5 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 transition-all duration-300 group">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="bg-gray-500/30 text-gray-300 text-xs font-bold px-2 py-0.5 rounded border border-gray-500/50 uppercase tracking-wider">Demo Student</span>
                                    </div>
                                    <div className="flex flex-col gap-1 text-sm font-medium text-white/90 font-mono">
                                        <div className="flex justify-between items-center group-hover:text-amber-400 transition-colors cursor-pointer" onClick={() => { setEmail('student@test.com'); setPassword('password123'); }}>
                                            <span>student@test.com</span>
                                        </div>
                                        <div className="flex justify-between items-center group-hover:text-amber-400 transition-colors text-white/60">
                                            <span>password123</span>
                                        </div>
                                    </div>
                                </div>
                                <p className="text-xs text-gray-400 mt-4 text-center italic">Click a demo account to auto-fill credentials.</p>
                            </div>
                        </div>
                    </div>
                    <div className="w-full lg:w-7/12 p-8 lg:p-16 flex items-center justify-center bg-white/40">
                        <div className="w-full max-w-[420px]">
                            <div className="mb-10 text-center lg:text-left">
                                <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Welcome Back</h2>
                                <p className="text-gray-500 font-medium">Please enter your details to sign in.</p>
                            </div>

                            <form className="space-y-6" onSubmit={handleSubmit}>
                                {error && (
                                    <div className="bg-red-50 text-red-600 px-4 py-3 rounded-xl text-sm flex items-center shadow-sm border border-red-100 animate-fade-in">
                                        <svg className="w-5 h-5 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <span className="font-medium">{error}</span>
                                    </div>
                                )}

                                <div>
                                    <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-2 ml-1">Email Address</label>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-amber-600 text-gray-400">
                                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            required
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="block w-full pl-11 pr-4 py-3.5 bg-white border border-gray-200 rounded-2xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all shadow-sm placeholder-gray-400 font-medium"
                                            placeholder="Enter your email"
                                            disabled={loading}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <div className="flex items-center justify-between mb-2 ml-1">
                                        <label htmlFor="password" className="block text-sm font-bold text-gray-700">Password</label>
                                        <a href="#" className="text-sm font-semibold text-amber-600 hover:text-amber-700 transition-colors">Forgot password?</a>
                                    </div>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-amber-600 text-gray-400">
                                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                            </svg>
                                        </div>
                                        <input
                                            id="password"
                                            name="password"
                                            type="password"
                                            required
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="block w-full pl-11 pr-4 py-3.5 bg-white border border-gray-200 rounded-2xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all shadow-sm placeholder-gray-400 font-medium"
                                            placeholder="••••••••"
                                            disabled={loading}
                                        />
                                    </div>
                                </div>

                                <div className="pt-2">
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full flex justify-center items-center py-4 px-4 border border-transparent text-sm font-bold rounded-2xl text-gray-900 bg-amber-400 hover:bg-amber-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 disabled:opacity-70 disabled:cursor-not-allowed transition-all shadow-lg shadow-amber-400/20 active:scale-[0.98]"
                                    >
                                        {loading ? (
                                            <>
                                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-900" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                                </svg>
                                                Authenticating...
                                            </>
                                        ) : 'Sign In'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
