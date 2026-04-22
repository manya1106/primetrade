import Layout from '../../components/layout/Layout';
import { useState } from 'react';
import API from '../../api/axios';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';

const MentorDashboard = () => {
  const [formData, setFormData] = useState({ title: '', description: '', category: '' });

  const handleCreateCourse = async (e) => {
    e.preventDefault();
    try {
      await API.post('/courses', formData);
      alert('Course created successfully!');
      setFormData({ title: '', description: '', category: '' });
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to create course');
    }
  };

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6">Mentor Dashboard</h1>
      <div className="bg-white p-6 rounded-lg shadow border border-gray-200 max-w-2xl">
        <h2 className="text-xl font-semibold mb-4">Create New Course</h2>
        <form onSubmit={handleCreateCourse}>
          <Input label="Course Title" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} />
          <Input label="Category" value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} />
          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
            <textarea 
              className="w-full border rounded py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              required
            />
          </div>
          <Button type="submit">Create Course</Button>
        </form>
      </div>
    </Layout>
  );
};

export default MentorDashboard;