import React, { useState, useEffect } from "react";
import spendingData from "../data/spending_data.json";
import "./Journal.css";

const CUSTOM_KEY = "customCategories";
const RECORD_KEY = "savedRecords";

const Journal = () => {
  const defaultCategories = [...new Set(spendingData.map((item) => item.category))];
  const [customCategories, setCustomCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [savedRecords, setSavedRecords] = useState([]);

  useEffect(() => {
    const storedCustom = JSON.parse(localStorage.getItem(CUSTOM_KEY)) || [];
    let storedRecords = JSON.parse(localStorage.getItem(RECORD_KEY)) || [];
    storedRecords = storedRecords.map((record) => ({
      ...record,
      id: record.id || Date.now() + Math.random(),
    }));
    setCustomCategories(storedCustom);
    setSavedRecords(storedRecords);
    localStorage.setItem(RECORD_KEY, JSON.stringify(storedRecords));
  }, []);

  const saveCustomCategories = (categories) => {
    localStorage.setItem(CUSTOM_KEY, JSON.stringify(categories));
  };

  const saveRecords = (records) => {
    localStorage.setItem(RECORD_KEY, JSON.stringify(records));
  };

  const handleAddCategory = () => {
    if (newCategory && !customCategories.includes(newCategory)) {
      const updated = [...customCategories, newCategory];
      setCustomCategories(updated);
      saveCustomCategories(updated);
      setNewCategory("");
    }
  };

  const handleDeleteCategory = (category) => {
    const updated = customCategories.filter((c) => c !== category);
    setCustomCategories(updated);
    saveCustomCategories(updated);
  };

  const handleSaveRecord = () => {
    if (!selectedCategory || !amount || !date) return;
    const newRecord = {
      id: Date.now(),
      category: selectedCategory,
      amount: parseFloat(amount),
      date,
    };
    const updated = [...savedRecords, newRecord];
    setSavedRecords(updated);
    saveRecords(updated);
    setAmount("");
    setDate("");
    setSelectedCategory("");
  };

  const handleDeleteRecord = (id) => {
    const updated = savedRecords.filter((r) => r.id !== id);
    setSavedRecords(updated);
    saveRecords(updated);
  };

  const allCategories = [...defaultCategories, ...customCategories];

  return (
    <div className="journal-container">
      <h2>Spending Journal</h2>

      <div className="journal-section">
        <h4>Add New Record</h4>
        <label>Date:</label>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />

        <label>Category:</label>
        <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
          <option value="">Select</option>
          {allCategories.map((cat, index) => (
            <option key={index} value={cat}>{cat}</option>
          ))}
        </select>

        <label>Amount:</label>
        <input type="number" step="0.01" value={amount} onChange={(e) => setAmount(e.target.value)} />

        <button onClick={handleSaveRecord}>Save Record</button>
      </div>

      <div className="journal-section">
        <h4>Add Custom Category</h4>
        <input type="text" placeholder="New category" value={newCategory} onChange={(e) => setNewCategory(e.target.value)} />
        <button onClick={handleAddCategory}>Add</button>
        <ul>
          {customCategories.map((cat, index) => (
            <li key={index}>
              {cat}
              <button onClick={() => handleDeleteCategory(cat)}>Remove</button>
            </li>
          ))}
        </ul>
      </div>

      <div className="journal-section">
        <h4>Saved Records</h4>
        {savedRecords.length === 0 ? (
          <p>No records yet.</p>
        ) : (
          <ul>
            {[...savedRecords]
              .sort((a, b) => new Date(b.date) - new Date(a.date))
              .map((record) => (
                <li key={record.id}>
                  {record.date} – {record.category} – ${record.amount.toFixed(2)}
                  <button onClick={() => handleDeleteRecord(record.id)}>Delete</button>
                </li>
              ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Journal;
