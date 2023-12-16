import React, { useState } from 'react';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
import axios from 'axios';


const Add = ({ employees, setEmployees, setIsAdding }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [salary, setSalary] = useState('');
  const [date, setDate] = useState('');

  const handleAdd = async e => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/employees', {
        firstName,
        lastName,
        email,
        salary,
        date,
      });

      const newEmployee = response.data;

      Swal.fire({
        icon: 'success',
        title: 'Added!',
        text: `${newEmployee.firstName} ${newEmployee.lastName}'s data has been Added.`,
        showConfirmButton: false,
        timer: 1500,
      });

      setIsAdding(false);
    } catch (error) {
      console.error('Error adding employee:', error);
    }

    const id = employees.length + 1;
    const newEmployee = {
      id,
      firstName,
      lastName,
      email,
      salary,
      date,
    };

    employees.push(newEmployee);
    localStorage.setItem('employees_data', JSON.stringify(employees));
    setEmployees(employees);
    setIsAdding(false);

    Swal.fire({
      icon: 'success',
      title: 'Added!',
      text: `${firstName} ${lastName}'s data has been Added.`,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <form onSubmit={handleAdd} className="space-y-4">
          <h1 className="text-2xl font-bold mb-4 text-center text-blue-500">Add Employee</h1>
          <div className="mb-4">
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-600">
              First Name
            </label>
            <input
              id="firstName"
              type="text"
              name="firstName"
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
              className="w-full p-3 border rounded focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-600">
              Last Name
            </label>
            <input
              id="lastName"
              type="text"
              name="lastName"
              value={lastName}
              onChange={e => setLastName(e.target.value)}
              className="w-full p-3 border rounded focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full p-3 border rounded focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="salary" className="block text-sm font-medium text-gray-600">
              Salary ($)
            </label>
            <input
              id="salary"
              type="number"
              name="salary"
              value={salary}
              onChange={e => setSalary(e.target.value)}
              className="w-full p-3 border rounded focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="date" className="block text-sm font-medium text-gray-600">
              Date
            </label>
            <input
              id="date"
              type="date"
              name="date"
              value={date}
              onChange={e => setDate(e.target.value)}
              className="w-full p-3 border rounded focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 text-white p-3 rounded cursor-pointer transition duration-300 hover:bg-blue-700"
            >
              Add
            </button>
            <button
              onClick={() => setIsAdding(false)}
              className="ml-4 bg-gray-400 text-white p-3 rounded cursor-pointer transition duration-300 hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Add;
