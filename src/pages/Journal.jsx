import React, { useState, useEffect } from "react";
import defaultCategories from "../data/spending_data.json";

function Journal() {
  const [form, setForm] = useState({
    date: "",
    category: "",
    customCategory: "",
    amount: ""
  });

  const [records, setRecords] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("spendingRecords")) || [];
    setRecords(saved);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.date || !form.amount || (!form.category && !form.customCategory)) {
      alert("Please fill in all required fields.");
      return;
    }

    const selectedCategory =
      form.category === "Other"
        ? form.customCategory.trim()
        : form.category;

    const newRecord = {
      date: form.date,
      category: selectedCategory,
      amount: parseFloat(form.amount)
    };

    const updated = [...records, newRecord];
    setRecords(updated);
    localStorage.setItem("spendingRecords", JSON.stringify(updated));

    setForm({ date: "", category: "", customCategory: "", amount: "" });
  };

  const handleDelete = (indexToDelete) => {
    const updated = records.filter((_, index) => index !== indexToDelete);
    setRecords(updated);
    localStorage.setItem("spendingRecords", JSON.stringify(updated));
  };

  const categoryOptions = [
    ...defaultCategories.map((item) => item.category),
    "Other"
  ];

  return (
    <div style={{ padding: "1rem", maxWidth: "500px", margin: "0 auto" }}>
      <h1>📝 Spending Journal</h1>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "1rem" }}>
          <label>Date: </label><br />
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            required
          />
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label>Category: </label><br />
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            required
          >
            <option value="">-- Select Category --</option>
            {categoryOptions.map((cat, idx) => (
              <option key={idx} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {form.category === "Other" && (
          <div style={{ marginBottom: "1rem" }}>
            <label>Custom Category: </label><br />
            <input
              type="text"
              name="customCategory"
              placeholder="Enter custom category"
              value={form.customCategory}
              onChange={handleChange}
              required
            />
          </div>
        )}

        <div style={{ marginBottom: "1rem" }}>
          <label>Amount (฿): </label><br />
          <input
            type="number"
            name="amount"
            value={form.amount}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">💾 Save</button>
      </form>

      <hr style={{ margin: "2rem 0" }} />

      <h2>📋 Saved Records</h2>
      {records.length === 0 ? (
        <p>No records yet.</p>
      ) : (
        <ul>
          {[...records]
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .map((rec, idx) => (
              <li key={idx} style={{ marginBottom: "0.5rem" }}>
                📅 {rec.date} — {rec.category} — ฿{rec.amount}
                <button
                  onClick={() => handleDelete(idx)}
                  style={{
                    marginLeft: "1rem",
                    background: "red",
                    color: "white",
                    border: "none",
                    padding: "2px 8px",
                    cursor: "pointer",
                    borderRadius: "4px"
                  }}
                >
                  🗑 Delete
                </button>
              </li>
            ))}
        </ul>
      )}
    </div>
  );
}

export default Journal;