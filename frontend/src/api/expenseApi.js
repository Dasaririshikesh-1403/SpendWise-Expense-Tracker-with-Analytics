import axios from 'axios';

const API_URL = 'http://localhost:5001/api/expenses'; 

const expenseApi = {
  getAllExpenses: async () => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      console.error('Error fetching expenses:', error);
      throw error;
    }
  },

  addExpense: async (expenseData) => {
    try {
      const response = await axios.post(API_URL, expenseData);
      return response.data;
    } catch (error) {
      console.error('Error adding expense:', error);
      throw error;
    }
  },

  updateExpense: async (id, expenseData) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, expenseData);
      return response.data;
    } catch (error) {
      console.error('Error updating expense:', error);
      throw error;
    }
  },

  deleteExpense: async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting expense:', error);
      throw error;
    }
  },

  getMonthlySummary: async (month, year) => {
    try {
      const response = await axios.get(`${API_URL}/summary?month=${month}&year=${year}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching monthly summary:', error);
      throw error;
    }
  }
};

export default expenseApi;