import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { HiOutlineBadgeCheck, HiOutlineUserGroup, HiOutlineShieldCheck } from 'react-icons/hi';

const MakeAdmin = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Database theke sob user-der niye ashar function
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/users');
        setUsers(res.data);
      } catch (err) {
        console.error("User load hoy nai");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  // Admin bananor logic
  const handleMakeAdmin = async (id) => {
    const proceed = window.confirm("Are you sure you want to make this user an Admin?");
    if (proceed) {
      try {
        await axios.patch(`http://localhost:5000/api/users/admin/${id}`);
        alert("Success! User is now an Admin.");
        // UI update korar jonno list ta abar load kora
      } catch (err) {
        alert("Something went wrong!");
      }
    }
  };

  return (
    <div className="bg-white p-8 shadow-sm border border-gray-100 min-h-screen">
      <div className="flex items-center gap-4 mb-10">
        <div className="bg-blue-100 p-3 rounded-full text-blue-600">
          <HiOutlineShieldCheck className="text-3xl" />
        </div>
        <div>
          <h2 className="text-2xl font-black uppercase tracking-tighter">User Management</h2>
          <p className="text-xs text-gray-400 uppercase tracking-widest">Assign roles and manage permissions</p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="p-4 text-[10px] font-black uppercase tracking-[2px] text-gray-500">User Name</th>
              <th className="p-4 text-[10px] font-black uppercase tracking-[2px] text-gray-500">Email Address</th>
              <th className="p-4 text-[10px] font-black uppercase tracking-[2px] text-gray-500">Current Role</th>
              <th className="p-4 text-[10px] font-black uppercase tracking-[2px] text-gray-500 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? users.map((user) => (
              <tr key={user._id} className="border-b border-gray-50 hover:bg-gray-50/50 transition">
                <td className="p-4 text-sm font-bold text-gray-800">{user.name}</td>
                <td className="p-4 text-sm text-gray-500">{user.email}</td>
                <td className="p-4">
                  {user.role === 'admin' ? (
                    <span className="bg-green-100 text-green-600 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">Admin</span>
                  ) : (
                    <span className="bg-gray-100 text-gray-400 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">User</span>
                  )}
                </td>
                <td className="p-4 text-right">
                  {user.role !== 'admin' && (
                    <button 
                      onClick={() => handleMakeAdmin(user._id)}
                      className="text-blue-600 hover:text-white hover:bg-blue-600 border border-blue-600 px-4 py-2 text-[10px] font-black uppercase tracking-widest transition-all rounded-sm"
                    >
                      Make Admin
                    </button>
                  )}
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan="4" className="p-10 text-center text-gray-400 uppercase text-xs tracking-widest italic">
                  No users found in database
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MakeAdmin;