const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    
    required: false 
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['Food', 'Travel', 'Rent', 'Utilities', 'Groceries', 'Entertainment', 'Shopping', 'Transport', 'Healthcare', 'Education', 'Other'], // Define allowed categories
    default: 'Other'
  },
  amount: {
    type: Number,
    required: [true, 'Amount is required'],
    min: [0.01, 'Amount must be a positive number']
  },
  date: {
    type: Date,
    default: Date.now,
    required: [true, 'Date is required']
  },
  note: {
    type: String,
    trim: true,
    maxlength: [200, 'Note cannot be more than 200 characters']
  }
}, {
  timestamps: true 
});

module.exports = mongoose.model('Expense', expenseSchema);