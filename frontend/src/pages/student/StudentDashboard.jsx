import Layout from '../../components/layout/Layout';
import { useAuth } from '../../hooks/useAuth';

const StudentDashboard = () => {
  const { user } = useAuth();
  
  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6">Welcome back, {user?.name}!</h1>
      <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
        <h2 className="text-xl font-semibold mb-4">My Enrolled Courses</h2>
        <p className="text-gray-600">Your enrolled courses and progress tracking will appear here.</p>
        {/* You can map through enrolled courses by creating a GET /api/enroll/my-courses endpoint on backend */}
      </div>
    </Layout>
  );
};

export default StudentDashboard;