import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { HiOutlineCurrencyBangladeshi, HiOutlineShoppingBag, HiOutlineTrendingUp, HiOutlineCalendar } from 'react-icons/hi';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/admin-stats')
      .then(res => setStats(res.data))
      .catch(err => console.error(err));
  }, []);

  if (!stats) return <div className="p-10 text-center font-black uppercase italic">Loading Analytics...</div>;

  const statCards = [
    { id: 1, title: "Today's Income", value: `৳${stats.todayIncome}`, icon: <HiOutlineTrendingUp/>, color: "bg-green-500" },
    { id: 2, title: "Today's Sales", value: stats.todaySalesCount, icon: <HiOutlineCalendar/>, color: "bg-blue-500" },
    { id: 3, title: "Total Income", value: `৳${stats.totalIncome}`, icon: <HiOutlineCurrencyBangladeshi/>, color: "bg-purple-500" },
    { id: 4, title: "Total Sales", value: stats.totalSales, icon: <HiOutlineShoppingBag/>, color: "bg-orange-500" },
  ];

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-black uppercase tracking-tighter italic mb-8">Admin Insights</h2>

      {/* 📊 STAT CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {statCards.map(card => (
          <div key={card.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-5">
            <div className={`${card.color} w-12 h-12 rounded-xl flex items-center justify-center text-white text-2xl shadow-lg`}>
              {card.icon}
            </div>
            <div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{card.title}</p>
              <p className="text-2xl font-black text-black">{card.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* 📈 GRAPH CHART */}
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
        <h3 className="text-sm font-black uppercase tracking-widest mb-8 flex items-center gap-2">
          <span className="w-2 h-2 bg-black rounded-full"></span> Sales Revenue (Last 7 Records)
        </h3>
        
        

        <div className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={stats.graphData}>
              <defs>
                <linearGradient id="colorAmt" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#000" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#000" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 'bold'}} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 'bold'}} />
              <Tooltip 
                contentStyle={{ borderRadius: '15px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
              />
              <Area type="monotone" dataKey="amount" stroke="#000" strokeWidth={3} fillOpacity={1} fill="url(#colorAmt)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;