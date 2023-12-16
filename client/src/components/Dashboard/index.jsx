// your-project-folder/src/components/Dashboard.jsx

import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';

import Header from './Header';
import Table from './Table';
import Add from './Add';
import Edit from './Edit';

const Dashboard = ({ setIsAuthenticated }) => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // Fetch employees from MongoDB when the component mounts
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('http://localhost:3001/employees');
        setEmployees(response.data);
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };

    fetchEmployees();
  }, []);

  const handleEdit = (id) => {
    const employee = employees.find((emp) => emp._id === id);
    setSelectedEmployee(employee);
    setIsEditing(true);
  };

  const handleDelete = (id) => {
    Swal.fire({
      icon: 'warning',
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
    }).then(async (result) => {
      if (result.value) {
        try {
          await axios.delete(`http://localhost:3001/employees/${id}`);

          Swal.fire({
            icon: 'success',
            title: 'Deleted!',
            text: 'Employee data has been deleted.',
            showConfirmButton: false,
            timer: 1500,
          });

          const updatedEmployees = employees.filter((employee) => employee._id !== id);
          setEmployees(updatedEmployees);
        } catch (error) {
          console.error('Error deleting employee:', error);
        }
      }
    });
  };

  return (
    <div className="container mx-auto p-4">
      {!isAdding && !isEditing && (
        <>
          <Header
            setIsAdding={setIsAdding}
            setIsAuthenticated={setIsAuthenticated}
          />
          <Table
            employees={employees}
            setEmployees={setEmployees}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        </>
      )}
      {isAdding && (
        <Add
          employees={employees}
          setEmployees={setEmployees}
          setIsAdding={setIsAdding}
        />
      )}
      {isEditing && (
        <Edit
          employees={employees}
          selectedEmployee={selectedEmployee}
          setEmployees={setEmployees}
          setIsEditing={setIsEditing}
        />
      )}
    </div>
  );
};

export default Dashboard;
