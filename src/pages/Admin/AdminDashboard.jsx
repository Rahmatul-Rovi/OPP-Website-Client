import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  HiOutlineCurrencyBangladeshi,
  HiOutlineShoppingBag,
  HiOutlineTrendingUp,
  HiOutlineCalendar,
  HiOutlineClipboardList,
  HiOutlineViewGrid,
} from "react-icons/hi";
import Swal from "sweetalert2";

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [todayOrders, setTodayOrders] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/admin-stats")
      .then((res) => setStats(res.data))
      .catch((err) => console.error(err));

    axios
      .get("http://localhost:5000/all-sales")
      .then((res) => {
        const today = new Date().toLocaleDateString();
        const filtered = res.data.filter(
          (s) => new Date(s.date).toLocaleDateString() === today,
        );
        setTodayOrders(filtered);
      })
      .catch((err) => console.error(err));
  }, []);

  if (!stats)
    return (
      <div className="p-10 text-center font-black uppercase italic">
        Updating Dashboard...
      </div>
    );

  return (
    <div className="p-8 bg-slate-50 min-h-screen font-sans">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-10">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Management Console
          </h2>
          <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">
            Real-time Business Overview
          </p>
        </div>
        <div className="bg-white px-4 py-2 rounded-2xl shadow-sm border border-slate-200">
          <p className="text-[10px] font-black uppercase text-slate-400">
            Date Today
          </p>
          <p className="font-bold text-slate-800 text-sm">
            {new Date().toLocaleDateString("en-GB", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </p>
        </div>
      </div>

      {/* TOP STAT CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {[
          {
            label: "Today's Revenue",
            val: `৳${stats.todayIncome}`,
            icon: <HiOutlineTrendingUp />,
            col: "text-indigo-600",
            bg: "bg-indigo-50",
          },
          {
            label: "Today's Orders",
            val: stats.todaySalesCount,
            icon: <HiOutlineShoppingBag />,
            col: "text-cyan-600",
            bg: "bg-cyan-50",
          },
          {
            label: "Total Gross",
            val: `৳${stats.totalIncome}`,
            icon: <HiOutlineCurrencyBangladeshi />,
            col: "text-violet-600",
            bg: "bg-violet-50",
          },
          {
            label: "Lifetime Sales",
            val: stats.totalSales,
            icon: <HiOutlineViewGrid />,
            col: "text-emerald-600",
            bg: "bg-emerald-50",
          },
        ].map((item, i) => (
          <div
            key={i}
            className="bg-white p-6 rounded-[28px] shadow-sm border border-slate-100 transition-all hover:shadow-md"
          >
            <div
              className={`${item.bg} ${item.col} w-12 h-12 rounded-2xl flex items-center justify-center text-2xl mb-4`}
            >
              {item.icon}
            </div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
              {item.label}
            </p>
            <p className="text-2xl font-black text-slate-900">{item.val}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
        {/* BAR CHART SECTION */}
        <div className="lg:col-span-2 bg-white p-8 rounded-[32px] shadow-sm border border-slate-100">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">
                Sales Performance
              </h2>
              <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">
                Last 7 Days Analysis
              </p>
            </div>
            <div className="flex gap-6">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-indigo-600 shadow-[0_0_10px_rgba(99,102,241,0.3)]"></span>
                <span className="text-[11px] font-black text-slate-700 uppercase tracking-widest">
                  Revenue
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.3)]"></span>
                <span className="text-[11px] font-black text-slate-700 uppercase tracking-widest">
                  Orders
                </span>
              </div>
            </div>
          </div>

          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={stats.graphData}
                margin={{ top: 20, right: 10, left: 0, bottom: 0 }}
                barGap={8}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#f1f5f9"
                />

                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#1e293b", fontSize: 12, fontWeight: "900" }}
                  dy={15}
                />

                {/* Y-Axis: Revenue (Left) */}
                <YAxis
                  yAxisId="left"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#475569", fontSize: 11, fontWeight: "700" }}
                  tickFormatter={(value) => `৳${value}`}
                />

                {/* Hidden Right Y-Axis for correct scaling */}
                <YAxis yAxisId="right" orientation="right" hide />

                {/* CUSTOM TOOLTIP */}
                <Tooltip
                  cursor={{ fill: "#f8fafc", radius: 12 }}
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-white p-4 shadow-[0_20px_50px_rgba(0,0,0,0.15)] rounded-[24px] border border-slate-50 min-w-[180px]">
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[2px] mb-3 border-b border-slate-50 pb-2">
                            {label} Details
                          </p>
                          <div className="space-y-3">
                            <div className="flex items-center justify-between gap-4">
                              <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-indigo-600"></div>
                                <span className="text-[11px] font-bold text-slate-500 uppercase">
                                  Revenue
                                </span>
                              </div>
                              <span className="text-sm font-black text-slate-900 font-mono">
                                ৳{payload[0].value}
                              </span>
                            </div>
                            <div className="flex items-center justify-between gap-4">
                              <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-cyan-400"></div>
                                <span className="text-[11px] font-bold text-slate-500 uppercase">
                                  Orders
                                </span>
                              </div>
                              <span className="text-sm font-black text-slate-900">
                                {payload[1]?.value || 0}
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />

                {/* Bars with better radius and sizing */}
                <Bar
                  yAxisId="left"
                  dataKey="amount"
                  fill="#6366f1"
                  radius={[10, 10, 0, 0]}
                  barSize={32}
                />
                <Bar
                  yAxisId="right"
                  dataKey="count"
                  fill="#22d3ee"
                  radius={[10, 10, 0, 0]}
                  barSize={32}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 📋 TODAY'S ORDERS LIST (White Theme) */}
        <div className="bg-white p-8 rounded-[32px] shadow-sm border border-slate-100 flex flex-col h-full">
          <h3 className="text-lg font-bold text-slate-800 uppercase tracking-tight mb-6 flex items-center gap-3">
            <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center">
              <HiOutlineClipboardList className="text-white text-lg" />
            </div>
            Today's Log
          </h3>

          <div className="space-y-4 overflow-y-auto max-h-[500px] pr-2 custom-scrollbar flex-1">
            {todayOrders.length > 0 ? (
              todayOrders.map((sale) => (
                <div
                  key={sale._id}
                  className="p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-indigo-200 transition-all group"
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-[10px] font-black text-indigo-500 bg-indigo-50 px-2 py-1 rounded-md tracking-tighter">
                      #{sale.invoiceNo}
                    </span>
                    <span className="text-sm font-black text-slate-900">
                      ৳{sale.totalAmount}
                    </span>
                  </div>

                  <p className="text-xs font-bold text-slate-700 uppercase truncate mb-3">
                    {sale.customerName}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-slate-400">
                      <HiOutlineCalendar className="text-[10px]" />
                      <span className="text-[9px] font-black uppercase">
                        {new Date(sale.date).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>

                    {/* 🔥 VIEW DETAILS BUTTON */}
                    <button
                      onClick={() => {
                        if (!sale || !sale.cart) {
                          Swal.fire({
                            title: "Error!",
                            text: "Item details not found for this order.",
                            icon: "error",
                            confirmButtonColor: "#000000",
                          });
                          return;
                        }

                        Swal.fire({
                          title: `<span class="text-sm font-black uppercase tracking-widest">Order Details - ${sale.invoiceNo}</span>`,
                          html: `
        <div class="text-left mt-4 border-t pt-4">
          <p class="text-[10px] font-black text-slate-400 uppercase">Customer: <span class="text-slate-900">${sale.customerName}</span></p>
          <div class="mt-4 space-y-2">
            ${sale.cart
              ?.map(
                (item) => `
              <div class="flex justify-between text-xs font-bold border-b border-dashed pb-2">
                <span class="uppercase text-slate-600">${item.title || "Unknown Item"} (x${item.quantity || 1})</span>
                <span class="text-slate-900">৳${(item.price || 0) * (item.quantity || 1)}</span>
              </div>
            `,
              )
              .join("")}
          </div>
          <div class="flex justify-between mt-4 pt-2 border-t-2">
             <span class="text-xs font-black uppercase">Total Amount</span>
             <span class="text-lg font-black text-indigo-600">৳${sale.totalAmount}</span>
          </div>
        </div>
      `,
                          confirmButtonText: "CLOSE",
                          confirmButtonColor: "#000000",
                          customClass: {
                            popup: "rounded-[32px] p-8",
                            confirmButton:
                              "rounded-xl px-10 py-3 font-black text-xs",
                          },
                        });
                      }}
                      className="text-[9px] font-black bg-white border border-slate-200 px-3 py-1.5 rounded-lg uppercase tracking-widest hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all"
                    >
                      View Items
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center h-full py-20 text-center opacity-40">
                <HiOutlineShoppingBag className="text-4xl mb-2 text-slate-300" />
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                  No Orders Today
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 📋 BOTTOM SUMMARY GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-[24px] border border-slate-100 flex items-center gap-4">
          <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-600 text-xl">
            <HiOutlineShoppingBag />
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">
              Stock Movement
            </p>
            <p className="text-xl font-black text-slate-800">
              {stats.totalSales * 2}+ Items Out
            </p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-[24px] border border-slate-100 flex items-center gap-4">
          <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-600 text-xl">
            <HiOutlineCurrencyBangladeshi />
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">
              Avg. Ticket Size
            </p>
            <p className="text-xl font-black text-slate-800">
              ৳{Math.round(stats.totalIncome / stats.totalSales || 0)}
            </p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-[24px] border border-slate-100 flex items-center gap-4 hover:border-indigo-100 transition-all">
          <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center text-green-600 text-xl">
            <HiOutlineTrendingUp />
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">
              Growth Index
            </p>
            <p className="text-xl font-black text-green-600">+12.4% Up</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
