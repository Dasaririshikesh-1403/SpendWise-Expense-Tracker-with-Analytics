import React, { useState, useEffect } from 'react';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseList from '../components/ExpenseList';
import MonthlySummaryChart from '../components/MonthlySummaryChart';
import expenseApi from '../api/expenseApi';

const HomePage = () => {
  const [expenses, setExpenses] = useState([]);
  const [monthlySummary, setMonthlySummary] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [filterMonth, setFilterMonth] = useState(new Date().getMonth() + 1); // Current month
  const [filterYear, setFilterYear] = useState(new Date().getFullYear()); // Current year
  const [filterCategory, setFilterCategory] = useState(''); // All categories

  
  useEffect(() => {
    fetchData();
  }, [filterMonth, filterYear]); 

  const fetchData = async () => {
    setLoading(true);
    setError('');
    try {
      const allExpenses = await expenseApi.getAllExpenses();
      setExpenses(allExpenses);

      const summary = await expenseApi.getMonthlySummary(filterMonth, filterYear);
      setMonthlySummary(summary);

    } catch (err) {
      setError('Failed to fetch data. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddExpense = async (newExpense) => {
    try {
      await expenseApi.addExpense(newExpense);
      fetchData(); 
    } catch (err) {
      setError('Failed to add expense. Please check your input.');
      console.error(err);
    }
  };

  const handleDeleteExpense = async (id) => {
    try {
      await expenseApi.deleteExpense(id);
      fetchData(); 
    } catch (err) {
      setError('Failed to delete expense.');
      console.error(err);
    }
  };

 
  const filteredExpenses = expenses.filter(expense => {
    const expenseDate = new Date(expense.date);
    const expenseMonth = expenseDate.getMonth() + 1;
    const expenseYear = expenseDate.getFullYear();

    const monthMatch = (filterMonth === '' || expenseMonth === parseInt(filterMonth));
    const yearMatch = (filterYear === '' || expenseYear === parseInt(filterYear));
    const categoryMatch = (filterCategory === '' || expense.category === filterCategory);

    return monthMatch && yearMatch && categoryMatch;
  });

  const availableYears = Array.from(new Set(expenses.map(exp => new Date(exp.date).getFullYear()))).sort((a, b) => b - a);
  if (!availableYears.includes(new Date().getFullYear())) {
    availableYears.unshift(new Date().getFullYear());
  }

  const allCategories = ['All', ...new Set(expenses.map(exp => exp.category))];

  if (loading) return <p>Loading expenses...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="home-page">
      <h1>SpendWise - Expense Tracker</h1>
      <div className="main-content">
        <div className="left-panel">
          <ExpenseForm onAddExpense={handleAddExpense} />
        </div>
        <div className="right-panel">
          <div className="filter-controls card">
            <h4>Filter Expenses</h4>
            <div className="form-group">
              <label>Month:</label>
              <select value={filterMonth} onChange={(e) => setFilterMonth(e.target.value)}>
                <option value="">All</option>
                {Array.from({ length: 12 }, (_, i) => i + 1).map(m => (
                  <option key={m} value={m}>{new Date(filterYear, m - 1).toLocaleString('default', { month: 'long' })}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Year:</label>
              <select value={filterYear} onChange={(e) => setFilterYear(e.target.value)}>
                <option value="">All</option>
                {availableYears.map(y => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Category:</label>
              <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
                {allCategories.map(cat => (
                  <option key={cat} value={cat === 'All' ? '' : cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>
          <ExpenseList expenses={filteredExpenses} onDeleteExpense={handleDeleteExpense} />
          <MonthlySummaryChart summaryData={monthlySummary} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;