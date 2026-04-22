import { useEffect, useState } from 'react';
import API from '../../api/axios';
import Layout from '../../components/layout/Layout';
import Spinner from '../../components/common/Spinner';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = () => {
    API.get('/admin/users')
      .then(res => setUsers(res.data))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchUsers(); }, []);

  const changeRole = async (id, newRole) => {
    try {
      await API.patch(`/admin/role/${id}`, { role: newRole });
      fetchUsers();
    } catch (err) {
      alert("Failed to update role");
    }
  };

  const deleteUser = async (id) => {
    if(window.confirm("Are you sure you want to delete this user?")) {
      try {
        await API.delete(`/admin/users/${id}`);
        fetchUsers();
      } catch (err) {
        alert("Failed to delete user");
      }
    }
  };

  if (loading) return <Layout><Spinner /></Layout>;

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6">Manage Users</h1>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Role</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u._id} className="border-b hover:bg-gray-50">
                <td className="p-4">{u.name}</td>
                <td className="p-4">{u.email}</td>
                <td className="p-4 uppercase text-xs font-bold">{u.role}</td>
                <td className="p-4 space-x-3">
                  {u.role !== 'mentor' && <button onClick={() => changeRole(u._id, 'mentor')} className="text-blue-600 font-medium">Promote</button>}
                  {u.role !== 'student' && <button onClick={() => changeRole(u._id, 'student')} className="text-yellow-600 font-medium">Demote</button>}
                  <button onClick={() => deleteUser(u._id)} className="text-red-600 font-medium">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default AdminUsers;