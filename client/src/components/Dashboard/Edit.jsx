// your-project-folder/src/components/Edit.jsx

import React, { useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';

const Edit = ({ employees, selectedEmployee, setEmployees, setIsEditing }) => {
  const id = selectedEmployee._id;

  const [firstName, setFirstName] = useState(selectedEmployee.firstName);
  const [lastName, setLastName] = useState(selectedEmployee.lastName);
  const [email, setEmail] = useState(selectedEmployee.email);
  const [salary, setSalary] = useState(selectedEmployee.salary);
  const [date, setDate] = useState(selectedEmployee.date);

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:3001/employees/${id}`, {
        firstName,
        lastName,
        email,
        salary,
        date,
      });

      const updatedEmployee = {
        _id: id,
        firstName,
        lastName,
        email,
        salary,
        date,
      };

      const updatedEmployees = employees.map((employee) =>
        employee._id === id ? updatedEmployee : employee
      );

      setEmployees(updatedEmployees);
      setIsEditing(false);

      Swal.fire({
        icon: 'success',
        title: 'Updated!',
        text: `${updatedEmployee.firstName} ${updatedEmployee.lastName}'s data has been updated.`,
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error('Error updating employee:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <form onSubmit={handleUpdate} className="space-y-4">
          <h1 className="text-2xl font-bold mb-4 text-center text-blue-500">Edit Employee</h1>
          <div className="mb-4">
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-600">
              First Name
            </label>
            <input
              id="firstName"
              type="text"
              name="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
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
              onChange={(e) => setLastName(e.target.value)}
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
              onChange={(e) => setEmail(e.target.value)}
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
              onChange={(e) => setSalary(e.target.value)}
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
              onChange={(e) => setDate(e.target.value)}
              className="w-full p-3 border rounded focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 text-white p-3 rounded cursor-pointer transition duration-300 hover:bg-blue-700"
            >
              Update
            </button>
            <button
              onClick={() => setIsEditing(false)}
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

export default Edit;
