import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { HiOutlineShieldCheck, HiOutlineUserCircle, HiOutlineBadgeCheck } from 'react-icons/hi';

const MakeAdmin = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // User fetch korar function
  const fetchUsers = async () => {
    try {
      const res = await axios.get('http://localhost:5000/users'); // Path-ta check koro backend-er sathe
      setUsers(res.data);
    } catch (err) {
      console.error("User load hoy nai");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Admin bananor function
  const handleMakeAdmin = async (user) => {
    Swal.fire({
      title: 'Make Admin?',
      text: `Do you want to promote ${user.name} to Admin?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#000000',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Promote!',
      customClass: {
        popup: 'rounded-[24px]',
        confirmButton: 'rounded-xl px-6 py-3 font-black text-xs uppercase',
        cancelButton: 'rounded-xl px-6 py-3 font-black text-xs uppercase',
      }
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axios.patch(`http://localhost:5000/users/admin/${user._id}`);
          if (res.data.modifiedCount > 0) {
            // UI update: Database theke abar load na kore local state update kora (Faster)
            const remaining = users.map(u => u._id === user._id ? { ...u, role: 'admin' } : u);
            setUsers(remaining);
            
            Swal.fire({
              title: 'Success!',
              text: `${user.name} is now an Admin.`,
              icon: 'success',
              confirmButtonColor: '#000000',
            });
          }
        } catch (err) {
          Swal.fire('Error', 'Something went wrong!', 'error');
        }
      }
    });
  };

  if (loading) return <div className="p-20 text-center font-black uppercase tracking-widest opacity-40">Loading Database...</div>;

  return (
    <div className="bg-white p-8 rounded-[32px] shadow-sm border border-slate-100 min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div className="flex items-center gap-4">
          <div className="bg-slate-900 p-4 rounded-2xl shadow-lg shadow-slate-200">
            <HiOutlineShieldCheck className="text-white text-3xl" />
          </div>
          <div>
            <h2 className="text-2xl font-black uppercase tracking-tighter text-slate-800">Control Panel</h2>
            <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Authority & Permission Management</p>
          </div>
        </div>
        <div className="bg-slate-50 px-6 py-3 rounded-2xl border border-slate-100">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Active Users</p>
          <p className="text-xl font-black text-slate-900">{users.length}</p>
        </div>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-slate-100">
              <th className="pb-6 text-[10px] font-black uppercase tracking-[2px] text-slate-400">Identity</th>
              <th className="pb-6 text-[10px] font-black uppercase tracking-[2px] text-slate-400">Contact</th>
              <th className="pb-6 text-[10px] font-black uppercase tracking-[2px] text-slate-400">Authorization</th>
              <th className="pb-6 text-[10px] font-black uppercase tracking-[2px] text-slate-400 text-right">Access Level</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {users.map((user) => (
              <tr key={user._id} className="group hover:bg-slate-50/50 transition-all">
                <td className="py-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-400">
                      <HiOutlineUserCircle className="text-2xl" />
                    </div>
                    <span className="text-sm font-black text-slate-800 uppercase tracking-tight">{user.name || 'Anonymous'}</span>
                  </div>
                </td>
                <td className="py-6">
                  <span className="text-xs font-bold text-slate-500">{user.email}</span>
                </td>
                <td className="py-6">
                  {user.role === 'admin' ? (
                    <div className="flex items-center gap-1 text-indigo-600">
                      <HiOutlineBadgeCheck className="text-lg" />
                      <span className="text-[10px] font-black uppercase tracking-widest">Master Admin</span>
                    </div>
                  ) : (
                    <span className="bg-slate-100 text-slate-400 text-[9px] font-black px-3 py-1 rounded-md uppercase tracking-widest">Standard User</span>
                  )}
                </td>
                <td className="py-6 text-right">
                  {user.role !== 'admin' ? (
                    <button 
                      onClick={() => handleMakeAdmin(user)}
                      className="bg-white border-2 border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white px-5 py-2 text-[9px] font-black uppercase tracking-[1px] transition-all rounded-xl active:scale-95"
                    >
                      Make Admin
                    </button>
                  ) : (
                    <span className="text-[10px] font-black text-slate-300 uppercase italic">Full Access</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MakeAdmin;