# 💸 Spending Tracker Web App

A React.js web application for tracking personal expenses. Built as a group project to visualize and manage spending using charts and journal entries — fully powered by LocalStorage.

## 🔗 Live Demo
[View on GitHub Pages](https://u6610996.github.io/spending_tracker)
## 📄 Features
### 🧾 Page 1: Journal

- Add spending records with: ✅ 
  - Date (no time) ✅ 
  - Category (from preloaded list or custom) ✅ 
  - Amount ✅ 
- View saved records in a list ✅ 
- Delete saved records ✅ 
- Save custom categories not in the default list (and remove) ✅
- Stored using `localStorage` (no backend needed) ✅ 

### 📊 Page 2: Analytics Dashboard

- Switch between:✅
  - Daily✅
  - Weekly✅
  - Monthly views✅
- View **total spending of all time** and **of the selected month**✅
- Visualize spending using:
  - 📈 Line chart✅
  - 🥧 Pie chart✅
- Grouped by category✅

---

## 🖼️ Screenshots

> (📷 Add screenshots here after deploying — e.g., Journal page, Dashboard page)

---

## 👥 Team Members

- Ratchanon puwapattaraokin
- Worachai Aranchot

---

## 🚀 How to Run Locally

1. Clone the repo:
   ```bash
   cd to your project
   git clone https://github.com/u6610996/spending_tracker.git
   cd spending_tracker
   npm install
   npm install recharts
   npm install react-datepicker
   npm install date-fns
   npm run dev

