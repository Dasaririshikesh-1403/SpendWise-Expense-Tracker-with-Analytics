const express = require('express');
const router = express.Router();

const Expense = require('../models/Expense');


router.get('/', async (req, res) => {
  try {
    const expenses = await Expense.find({});
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.post('/', async (req, res) => {
  const { userId, category, amount, date, note } = req.body;

  const expense = new Expense({
    userId,
    category,
    amount,
    date: date || new Date(),
    note
  });

  try {
    const newExpense = await expense.save();
    res.status(201).json(newExpense);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


router.get('/summary', async (req, res) => {
  try {
    const { month, year } = req.query;

    if (!month || !year) {
      return res.status(400).json({ message: 'Month and year are required for summary.' });
    }

    const startOfMonth = new Date(year, month - 1, 1); 
    const endOfMonth = new Date(year, month, 0); 

    const summary = await Expense.aggregate([
      { $match: { date: { $gte: startOfMonth, $lte: endOfMonth } } },
      { $group: { _id: '$category', totalAmount: { $sum: '$amount' } } },
      { $project: { _id: 0, category: '$_id', totalAmount: 1 } }
    ]);

    res.json(summary);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.get('/:id', async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);
    if (!expense) return res.status(404).json({ message: 'Expense not found' });
    res.json(expense);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.put('/:id', async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);
    if (!expense) return res.status(404).json({ message: 'Expense not found' });

    if (req.body.category !== undefined) expense.category = req.body.category;
    if (req.body.amount !== undefined) expense.amount = req.body.amount;
    if (req.body.date !== undefined) expense.date = req.body.date;
    if (req.body.note !== undefined) expense.note = req.body.note;

    const updatedExpense = await expense.save();
    res.json(updatedExpense);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


router.delete('/:id', async (req, res) => {
  try {
    const result = await Expense.deleteOne({ _id: req.params.id });
    if (result.deletedCount === 0) return res.status(404).json({ message: 'Expense not found' });
    res.json({ message: 'Expense deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;