import React from 'react';
import { format } from 'date-fns';

const ExpenseList = ({ expenses, onDeleteExpense, onEditExpense }) => {
  return (
    <div className="card expense-list-card">
      <h3>All Expenses</h3>
      {expenses.length === 0 ? (
        <p>No expenses recorded yet.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Category</th>
              <th>Amount</th>
              <th>Note</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense) => (
              <tr key={expense._id}>
                <td>{format(new Date(expense.date), 'MM/dd/yyyy')}</td>
                <td>{expense.category}</td>
                <td>${expense.amount.toFixed(2)}</td>
                <td>{expense.note}</td>
                <td>
                  {}
                  <button onClick={() => onDeleteExpense(expense._id)} className="btn btn-danger btn-small">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ExpenseList;