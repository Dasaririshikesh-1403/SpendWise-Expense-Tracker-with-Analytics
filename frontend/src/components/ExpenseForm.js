import React, { useState } from 'react';

const categories = ['Food', 'Travel', 'Rent', 'Utilities', 'Groceries', 'Entertainment', 'Shopping', 'Transport', 'Healthcare', 'Education', 'Other'];

const ExpenseForm = ({ onAddExpense }) => {
  const [category, setCategory] = useState(categories[0]);
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [note, setNote] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!category || !amount || !date) {
      setError('Please fill in all required fields (Category, Amount, Date).');
      return;
    }
    if (isNaN(amount) || parseFloat(amount) <= 0) {
      setError('Amount must be a positive number.');
      return;
    }

    const newExpense = {
      category,
      amount: parseFloat(amount),
      date: new Date(date).toISOString(), 
      note,
    };

    onAddExpense(newExpense); 
   
    setCategory(categories[0]);
    setAmount('');
    setDate('');
    setNote('');
    setError('');
  };

  return (
    <div className="card expense-form-card">
      <h3>Add New Expense</h3>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Category:</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)} required>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Amount:</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            min="0.01"
            step="0.01"
            required
          />
        </div>
        <div className="form-group">
          <label>Date:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Note (Optional):</label>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            maxLength="200"
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">Add Expense</button>
      </form>
    </div>
  );
};

export default ExpenseForm;