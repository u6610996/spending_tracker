import React from 'react';
import spendingData from '../data/spending_data.json';

function Dashboard() {
  return (
    <div style={{ padding: '1rem' }}>
      <h1>💸 Spending Dashboard</h1>

      <h2>📋 Spending Categories</h2>
      <ul>
        {spendingData.map((item) => (
          <li key={item.spending_id}>
            <strong>{item.category}</strong>: {item.description}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
