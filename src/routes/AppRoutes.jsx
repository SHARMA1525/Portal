import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/Login';
import TeacherDashboard from '../pages/TeacherDashboard';
import StudentDashboard from '../pages/StudentDashboard';
import CreateAssignment from '../pages/CreateAssignment';
import AssignmentDetails from '../pages/AssignmentDetails';
import ProtectedRoute from '../components/ProtectedRoute';
import Navbar from '../components/Navbar';
import { useAuth } from '../hooks/useAuth';

export default function AppRoutes() {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen bg-gray-50">
                <div className="animate-spin h-8 w-8 border-4 border-amber-500 border-t-transparent rounded-full" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <main>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route
                        path="/teacher-dashboard"
                        element={
                            <ProtectedRoute allowedRole="teacher">
                                <TeacherDashboard />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/create-assignment"
                        element={
                            <ProtectedRoute allowedRole="teacher">
                                <CreateAssignment />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/student-dashboard"
                        element={
                            <ProtectedRoute allowedRole="student">
                                <StudentDashboard />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/assignments/:id"
                        element={
                            <ProtectedRoute>
                                <AssignmentDetails />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/"
                        element={
                            <Navigate
                                to={user ? (user.role === 'teacher' ? '/teacher-dashboard' : '/student-dashboard') : '/login'}
                                replace
                            />
                        }
                    />
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </main>
        </div>
    );
}
