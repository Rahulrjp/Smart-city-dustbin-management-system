import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import './App.css'
import AuthPage from './pages/AuthPage';
import Dashboard from './pages/Dashboard';
// import AdminDashboard from './pages/AdminDashboard';
// import DriverDashboard from './pages/DriverDashboard';
import DriverDashboard from './testing/DriverDashboard';
import AdminDashboard from './testing/AdminDashboard';
import { useAuth } from './context/AuthContext';
import BinManagement from './components/dashboard/admin/BinManagement';

const ProtectedRoute = ({ children, allowedRoles }) => {
    const { user, loading } = useAuth();
    if (loading) return <div>Loading...</div>;

    // Not logged in
    if (!user) {
        console.log("User not authenticated, redirecting to login.");
        return <Navigate to="/" replace />;
    }

    // Role check
    if (allowedRoles && !allowedRoles.includes(user.role)) {
        console.log(`User role "${user.role}" not authorized to access this route, redirecting to login.`);
        return <Navigate to="/" replace />;
    }

    return children;
};

const ProtectAuthRoute = ({ children }) => {
    const { user, loading } = useAuth();

    if (loading) return <div>Loading...</div>;

    if (user) {
        console.log("User already authenticated, redirecting to dashboard.");
        return <Navigate to={`/dashboard/${user.role}`} replace />;
    }
    return children;
}

function App() {

    return (
        <>
            <Routes>
                <Route path="/" element={<ProtectAuthRoute>
                    <AuthPage />
                </ProtectAuthRoute>} />

                <Route
                    path="/dashboard/admin"
                    element={
                        <ProtectedRoute allowedRoles={["admin"]}>
                            <AdminDashboard />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/dashboard/driver"
                    element={
                        <ProtectedRoute allowedRoles={["driver"]}>
                            <DriverDashboard />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/dashboard/admin/bin-management"
                    element={
                        <ProtectedRoute allowedRoles={["admin"]}>
                            <BinManagement />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </>
    )
}

export default App
