// your-project-folder/src/components/Table.jsx

import React from 'react';
import { motion } from 'framer-motion';
import Swal from 'sweetalert2';
import axios from 'axios';

const Table = ({ employees, setEmployees, handleEdit, handleDelete }) => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: null,
  });

  const handleDeleteEmployee = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/employees/${id}`);

      const updatedEmployees = employees.filter((employee) => employee._id !== id);
      setEmployees(updatedEmployees);

      Swal.fire({
        icon: 'success',
        title: 'Deleted!',
        text: 'Employee data has been deleted.',
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  const tableVariants = {
    enter: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: '10px' },
  };

  const rowVariants = {
    hover: { scale: 1.02 },
  };

  return (
    <div className="container mx-auto p-4 overflow-x-auto">
      {/* Added overflow-x-auto to enable horizontal scrolling */}
      <motion.table
        variants={tableVariants}
        initial="exit"
        animate="enter"
        className="min-w-full rounded-lg overflow-hidden shadow-md"
      >
        <thead className="bg-gray-200">
          <tr>
            <motion.th
              whileHover={rowVariants.hover}
              className="py-2 px-4 border-b text-left"
            >
              No.
            </motion.th>
            <motion.th
              whileHover={rowVariants.hover}
              className="py-2 px-4 border-b text-left"
            >
              First Name
            </motion.th>
            <motion.th
              whileHover={rowVariants.hover}
              className="py-2 px-4 border-b text-left"
            >
              Last Name
            </motion.th>
            <motion.th
              whileHover={rowVariants.hover}
              className="py-2 px-4 border-b text-left"
            >
              Email
            </motion.th>
            <motion.th
              whileHover={rowVariants.hover}
              className="py-2 px-4 border-b text-left"
            >
              Salary
            </motion.th>
            <motion.th
              whileHover={rowVariants.hover}
              className="py-2 px-4 border-b text-left"
            >
              Date
            </motion.th>
            <th colSpan={2} className="py-2 px-4 border-b text-center">
              Actions
            </th>
          </tr>
        </thead>
        <motion.tbody
          initial="exit"
          animate="enter"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {employees.length > 0 ? (
            employees.map((employee, i) => (
              <motion.tr
                key={employee._id}
                variants={rowVariants}
                className={`bg-gray-100 dark:bg-gray-800 ${
                  i % 2 === 0 && 'hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                                <motion.td
                  whileHover={rowVariants.hover}
                  className="py-2 px-4 border-b text-left font-medium"
                >
                  {i + 1}
                </motion.td>
                <motion.td
                  whileHover={rowVariants.hover}
                  className="py-2 px-4 border-b text-left font-medium"
                >
                  {employee.firstName}
                </motion.td>
                <motion.td
                  whileHover={rowVariants.hover}
                  className="py-2 px-4 border-b text-left font-medium"
                >
                  {employee.lastName}
                </motion.td>
                <motion.td
                  whileHover={rowVariants.hover}
                  className="py-2 px-4 border-b text-left font-medium"
                >
                  {employee.email}
                </motion.td>
                <motion.td
                  whileHover={rowVariants.hover}
                  className="py-2 px-4 border-b text-left font-medium"
                >
                  {formatter.format(employee.salary)}
                </motion.td>
                <motion.td
                  whileHover={rowVariants.hover}
                  className="py-2 px-4 border-b text-left font-medium"
                >
                  {employee.date}
                </motion.td>
                <td className="py-2 px-4 border-b text-right">
                  <button
                    onClick={() => handleEdit(employee._id)}
                    className="text-blue-500 hover:underline focus:outline-none font-medium"
                  >
                    Edit
                  </button>
                </td>
                <td className="py-2 px-4 border-b text-left">
                  <button
                    onClick={() => handleDeleteEmployee(employee._id)}
                    className="text-red-500 hover:underline focus:outline-none font-medium"
                  >
                    Delete
                  </button>
                </td>
              </motion.tr>
            ))
          ) : (
            <motion.tr
              initial="exit"
              animate="enter"
              className="bg-gray-100 dark:bg-gray-800"
            >
            <td colSpan={7} className="py-2 px-4 border-b text-center font-medium">
                No Employees
            </td>
            </motion.tr>
          )}
        </motion.tbody>
      </motion.table>
    </div>
  );
};

export default Table;