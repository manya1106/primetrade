import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const Sidebar = () => {
  const { user, logout } = useAuth();
  const nav = useNavigate();

  const handleLogout = () => {
    logout();
    nav('/login');
  };

  return (
    <aside className="w-64 bg-slate-900 text-white flex flex-col h-screen p-6">
      <h1 className="text-2xl font-bold mb-10 text-blue-400">EduPlatform</h1>
      <nav className="flex-1 space-y-4">
        <Link to="/browse" className="block hover:text-blue-300">Browse Courses</Link>
        {user?.role === 'student' && <Link to="/student" className="block hover:text-blue-300">My Dashboard</Link>}
        {user?.role === 'mentor' && <Link to="/mentor" className="block hover:text-blue-300">Mentor Dashboard</Link>}
        {user?.role === 'admin' && <Link to="/admin" className="block hover:text-blue-300">Admin Dashboard</Link>}
      </nav>
      <div className="mt-auto">
        <p className="mb-4 text-sm text-gray-400">Logged in as: {user?.name}</p>
        <button onClick={handleLogout} className="w-full bg-red-600 hover:bg-red-700 py-2 rounded text-white font-semibold">
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;