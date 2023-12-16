// models/Employee.js

const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  salary: Number,
  date: String,
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
