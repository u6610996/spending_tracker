import React, { useState, useEffect } from 'react';
import {
  LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './Dashboard.css';

const RECORD_KEY = "savedRecords";
const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7f50', '#00bfff', '#ff69b4', '#7b68ee'];

const Dashboard = () => {
  const [records, setRecords] = useState([]);
  const [viewMode, setViewMode] = useState('monthly');
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [selectedWeek, setSelectedWeek] = useState('Week 1');

  useEffect(() => {
    const saved = localStorage.getItem(RECORD_KEY);
    if (saved) setRecords(JSON.parse(saved));
  }, []);

  const getWeekRange = (date, weekIndex) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const start = new Date(firstDay);
    start.setDate(1 + (weekIndex - 1) * 7);
    const end = new Date(start);
    end.setDate(start.getDate() + 6);
    return { start, end };
  };

  const isInSelectedWeek = (dateStr) => {
    const { start, end } = getWeekRange(selectedMonth, parseInt(selectedWeek.split(' ')[1]));
    const date = new Date(dateStr);
    return date >= start && date <= end;
  };

  const getMonthKey = (date) => date.toISOString().slice(0, 7);

  const filtered = records.filter((r) => {
    if (viewMode === 'monthly') return r.date.startsWith(getMonthKey(selectedMonth));
    if (viewMode === 'daily') return r.date === new Date().toISOString().slice(0, 10);
    if (viewMode === 'weekly') return isInSelectedWeek(r.date);
    return true;
  });

  const categorySummary = filtered.reduce((acc, rec) => {
    const amount = parseFloat(rec.amount) || 0;
    acc[rec.category] = (acc[rec.category] || 0) + amount;
    return acc;
  }, {});

  const totalAllTime = records.reduce((sum, r) => sum + parseFloat(r.amount || 0), 0);
  const totalSelected = Object.values(categorySummary).reduce((sum, val) => sum + val, 0);

  const pieData = Object.entries(categorySummary).map(([cat, amt]) => ({ name: cat, value: amt }));

  const lineData = filtered
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .reduce((acc, rec) => {
      const entry = acc.find((e) => e.date === rec.date);
      if (entry) {
        entry.amount += parseFloat(rec.amount || 0);
      } else {
        acc.push({ date: rec.date, amount: parseFloat(rec.amount || 0) });
      }
      return acc;
    }, []);

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">📊 Spending Dashboard</h1>

      <div className="dashboard-controls">
        <label>View: </label>
        <select value={viewMode} onChange={(e) => setViewMode(e.target.value)}>
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="all">All Time</option>
        </select>

        {(viewMode === 'monthly' || viewMode === 'weekly') && (
          <>
            <label>Month: </label>
            <DatePicker
              selected={selectedMonth}
              onChange={(date) => setSelectedMonth(date)}
              dateFormat="MM/yyyy"
              showMonthYearPicker
              className="custom-month-picker"
            />
          </>
        )}

        {viewMode === 'weekly' && (
          <>
            <label>Week: </label>
            <select value={selectedWeek} onChange={(e) => setSelectedWeek(e.target.value)}>
              <option>Week 1</option>
              <option>Week 2</option>
              <option>Week 3</option>
              <option>Week 4</option>
              <option>Week 5</option>
            </select>
          </>
        )}
      </div>

      <h3>💰 Total Spending</h3>
      <p>All Time: ${totalAllTime.toFixed(2)}</p>
      {viewMode !== 'all' && <p>Selected View: ${totalSelected.toFixed(2)}</p>}

      <hr />

      <h3>🥧 Spending by Category</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
            {pieData.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>

      <h3>📈 Spending Over Time</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={lineData}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="amount" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Dashboard;
