import React, { useState, useEffect } from "react";
import spendingData from "../data/spending_data.json";

// LocalStorage keys used to store data (same as Dashboard.jsx)
const CUSTOM_KEY = "customCategories";
const RECORD_KEY = "savedRecords";

const Journal = () => {
  // Default categories come from JSON file
  const defaultCategories = [
    ...new Set(spendingData.map((item) => item.category)),
  ];

  // State for managing UI and storage
  const [customCategories, setCustomCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [savedRecords, setSavedRecords] = useState([]);

  // Load custom categories and saved records on component load
  useEffect(() => {
    const storedCustom = JSON.parse(localStorage.getItem(CUSTOM_KEY)) || [];
    let storedRecords = JSON.parse(localStorage.getItem(RECORD_KEY)) || [];

    // Fix: Make sure each record has a unique id (for delete function to work properly)
    storedRecords = storedRecords.map((record) => ({
      ...record,
      id: record.id || Date.now() + Math.random(),
    }));

    setCustomCategories(storedCustom);
    setSavedRecords(storedRecords);
    localStorage.setItem(RECORD_KEY, JSON.stringify(storedRecords)); // save back with ids
  }, []);

  // Save category list to localStorage
  const saveCustomCategories = (categories) => {
    localStorage.setItem(CUSTOM_KEY, JSON.stringify(categories));
  };

  // Save records to localStorage
  const saveRecords = (records) => {
    localStorage.setItem(RECORD_KEY, JSON.stringify(records));
  };

  // Add a new custom category
  const handleAddCategory = () => {
    if (newCategory && !customCategories.includes(newCategory)) {
      const updated = [...customCategories, newCategory];
      setCustomCategories(updated);
      saveCustomCategories(updated);
      setNewCategory("");
    }
  };

  // Remove a custom category (does not remove existing records)
  const handleDeleteCategory = (category) => {
    const updated = customCategories.filter((c) => c !== category);
    setCustomCategories(updated);
    saveCustomCategories(updated);
  };

  // Add a new spending record
  const handleSaveRecord = () => {
    if (!selectedCategory || !amount || !date) return;
    const newRecord = {
      id: Date.now(), // timestamp is good enough for uniqueness
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

  // Remove a specific record
  const handleDeleteRecord = (id) => {
    const updated = savedRecords.filter((r) => r.id !== id);
    setSavedRecords(updated);
    saveRecords(updated);
  };

  // Combine default and custom categories
  const allCategories = [...defaultCategories, ...customCategories];

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h2>Spending Journal</h2>

      {/* ============ Add Record ============ */}
      <div style={{ marginBottom: "20px" }}>
        <h4>Add New Record</h4>
        <label>
          Date:
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </label>
        <br />
        <label>
          Category:
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">Select</option>
            {allCategories.map((cat, index) => (
              <option key={index} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </label>
        <br />
        <label>
          Amount:
          <input
            type="number"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </label>
        <br />
        <button onClick={handleSaveRecord}>Save Record</button>
      </div>

      {/* ============ Add Custom Category ============ */}
      <div style={{ marginBottom: "20px" }}>
        <h4>Add Custom Category</h4>
        <input
          type="text"
          placeholder="New category"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
        />
        <button onClick={handleAddCategory}>Add</button>
        <ul>
          {customCategories.map((cat, index) => (
            <li key={index}>
              {cat}{" "}
              <button onClick={() => handleDeleteCategory(cat)}>Remove</button>
            </li>
          ))}
        </ul>
      </div>

      {/* ============ View Records ============ */}
      <div>
        <h4>Saved Records</h4>
        {savedRecords.length === 0 ? (
          <p>No records yet.</p>
        ) : (
          <ul>
            {[...savedRecords]
              .sort((a, b) => new Date(b.date) - new Date(a.date)) // latest first
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
