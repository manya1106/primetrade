import { useEffect, useState } from 'react';
import API from '../api/axios';
import Layout from '../components/layout/Layout';
import Button from '../components/common/Button';
import Spinner from '../components/common/Spinner';
import { useAuth } from '../hooks/useAuth';

const BrowseCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    API.get('/courses')
      .then(res => setCourses(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const handleEnroll = async (id) => {
    try {
      await API.post(`/enroll/${id}`);
      alert("Enrolled successfully!");
    } catch (err) {
      alert(err.response?.data?.message || "Enrollment failed");
    }
  };

  if (loading) return <Layout><Spinner /></Layout>;

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6">Available Courses</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map(course => (
          <div key={course._id} className="bg-white rounded-xl shadow p-5 border border-gray-200">
            <span className="text-xs font-bold text-blue-600 uppercase">{course.category}</span>
            <h3 className="text-xl font-bold mt-2">{course.title}</h3>
            <p className="text-gray-600 text-sm mt-2 mb-4 line-clamp-3">{course.description}</p>
            {user?.role === 'student' && (
              <Button onClick={() => handleEnroll(course._id)}>Enroll Now</Button>
            )}
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default BrowseCourses;