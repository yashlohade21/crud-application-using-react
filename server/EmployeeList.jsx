// EmployeeList.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/employees')
      .then(response => setEmployees(response.data))
      .catch(error => console.error('Error fetching employees:', error));
  }, []);

  return (
    <div>
      <h2>Employee List</h2>
      <ul>
        {employees.map(employee => (
          <li key={employee._id}>
            {employee.firstName} {employee.lastName}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmployeeList;
