import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { HiOutlineCurrencyBangladeshi, HiOutlineShoppingBag, HiOutlineTrendingUp, HiOutlineCalendar, HiOutlineClipboardList, HiOutlineViewGrid } from 'react-icons/hi';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [todayOrders, setTodayOrders] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/admin-stats')
      .then(res => setStats(res.data))
      .catch(err => console.error(err));

    axios.get('http://localhost:5000/all-sales')
      .then(res => {
        const today = new Date().toLocaleDateString();
        const filtered = res.data.filter(s => new Date(s.date).toLocaleDateString() === today);
        setTodayOrders(filtered);
      })
      .catch(err => console.error(err));
  }, []);

  if (!stats) return <div className="p-10 text-center font-black uppercase italic">Updating Dashboard...</div>;

  return (
    <div className="p-8 bg-slate-50 min-h-screen font-sans">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-10">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Management Console</h2>
          <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Real-time Business Overview</p>
        </div>
        <div className="bg-white px-4 py-2 rounded-2xl shadow-sm border border-slate-200">
           <p className="text-[10px] font-black uppercase text-slate-400">Date Today</p>
           <p className="font-bold text-slate-800 text-sm">{new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
        </div>
      </div>

      {/* 📊 TOP STAT CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {[
          { label: "Today's Revenue", val: `৳${stats.todayIncome}`, icon: <HiOutlineTrendingUp/>, col: "text-indigo-600", bg: "bg-indigo-50" },
          { label: "Today's Orders", val: stats.todaySalesCount, icon: <HiOutlineShoppingBag/>, col: "text-cyan-600", bg: "bg-cyan-50" },
          { label: "Total Gross", val: `৳${stats.totalIncome}`, icon: <HiOutlineCurrencyBangladeshi/>, col: "text-violet-600", bg: "bg-violet-50" },
          { label: "Lifetime Sales", val: stats.totalSales, icon: <HiOutlineViewGrid/>, col: "text-emerald-600", bg: "bg-emerald-50" }
        ].map((item, i) => (
          <div key={i} className="bg-white p-6 rounded-[28px] shadow-sm border border-slate-100 transition-all hover:shadow-md">
            <div className={`${item.bg} ${item.col} w-12 h-12 rounded-2xl flex items-center justify-center text-2xl mb-4`}>
              {item.icon}
            </div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{item.label}</p>
            <p className="text-2xl font-black text-slate-900">{item.val}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
        {/* 📈 BAR CHART SECTION */}
        <div className="lg:col-span-2 bg-white p-8 rounded-[32px] shadow-sm border border-slate-100">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-xl font-bold text-slate-800 uppercase tracking-tight">Sales Performance</h2>
              <p className="text-slate-400 text-xs font-bold uppercase tracking-tighter">Last 7 Days Analysis</p>
            </div>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-indigo-500"></span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Revenue</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-cyan-400"></span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Orders</span>
              </div>
            </div>
          </div>

          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.graphData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <YAxis yAxisId="right" orientation="right" hide />
                <Tooltip 
                  cursor={{fill: '#f8fafc'}}
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }}
                  itemStyle={{ fontSize: '12px', fontWeight: 'bold' }}
                />
                <Bar yAxisId="left" dataKey="amount" fill="#6366f1" radius={[6, 6, 0, 0]} barSize={30} />
                <Bar yAxisId="right" dataKey="count" fill="#22d3ee" radius={[6, 6, 0, 0]} barSize={30} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 📋 TODAY'S ORDERS LIST (White Theme) */}
        <div className="bg-white p-8 rounded-[32px] shadow-sm border border-slate-100 flex flex-col">
          <h3 className="text-lg font-bold text-slate-800 uppercase tracking-tight mb-6 flex items-center gap-3">
            <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center">
                <HiOutlineClipboardList className="text-white text-lg"/>
            </div>
            Today's Log
          </h3>
          
          <div className="space-y-4 overflow-y-auto max-h-[420px] pr-2 custom-scrollbar flex-1">
            {todayOrders.length > 0 ? todayOrders.map((sale) => (
              <div key={sale._id} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-indigo-200 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-[10px] font-black text-indigo-500 bg-indigo-50 px-2 py-1 rounded-md tracking-tighter">#{sale.invoiceNo}</span>
                  <span className="text-sm font-black text-slate-900">৳{sale.totalAmount}</span>
                </div>
                <p className="text-xs font-bold text-slate-700 uppercase truncate">{sale.customerName}</p>
                <div className="flex items-center gap-1 mt-2 text-slate-400">
                   <HiOutlineCalendar className="text-[10px]"/>
                   <span className="text-[9px] font-bold">{new Date(sale.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
              </div>
            )) : (
              <div className="flex flex-col items-center justify-center h-full py-20 text-center opacity-40">
                <HiOutlineShoppingBag className="text-4xl mb-2 text-slate-300"/>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">No Orders Today</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 📋 BOTTOM SUMMARY GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-[24px] border border-slate-100 flex items-center gap-4">
             <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-600 text-xl">
                <HiOutlineShoppingBag/>
             </div>
             <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Stock Movement</p>
                <p className="text-xl font-black text-slate-800">{stats.totalSales * 2}+ Items Out</p>
             </div>
          </div>
          <div className="bg-white p-6 rounded-[24px] border border-slate-100 flex items-center gap-4">
             <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-600 text-xl">
                <HiOutlineCurrencyBangladeshi/>
             </div>
             <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Avg. Ticket Size</p>
                <p className="text-xl font-black text-slate-800">৳{Math.round(stats.totalIncome / stats.totalSales || 0)}</p>
             </div>
          </div>
          <div className="bg-white p-6 rounded-[24px] border border-slate-100 flex items-center gap-4 hover:border-indigo-100 transition-all">
             <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center text-green-600 text-xl">
                <HiOutlineTrendingUp/>
             </div>
             <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Growth Index</p>
                <p className="text-xl font-black text-green-600">+12.4% Up</p>
             </div>
          </div>
      </div>
    </div>
  );
};

export default AdminDashboard;