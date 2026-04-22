import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/routing/ProtectedRoute';
import { useAuth } from './hooks/useAuth';

// Pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import BrowseCourses from './pages/BrowseCourses';
import StudentDashboard from './pages/student/StudentDashboard';
import MentorDashboard from './pages/mentor/MentorDashboard';
import AdminUsers from './pages/admin/AdminUsers';

function App() {
  const { user } = useAuth();

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/browse" />} />
        <Route path="/register" element={!user ? <Register /> : <Navigate to="/browse" />} />
        
        {/* Redirect root to browse or login */}
        <Route path="/" element={<Navigate to="/browse" />} />

        {/* Protected Routes (Everyone logged in) */}
        <Route path="/browse" element={
          <ProtectedRoute>
            <BrowseCourses />
          </ProtectedRoute>
        } />

        {/* Role Specific Routes */}
        <Route path="/student" element={
          <ProtectedRoute allowedRoles={['student', 'admin']}>
            <StudentDashboard />
          </ProtectedRoute>
        } />

        <Route path="/mentor" element={
          <ProtectedRoute allowedRoles={['mentor', 'admin']}>
            <MentorDashboard />
          </ProtectedRoute>
        } />

        <Route path="/admin" element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminUsers />
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;