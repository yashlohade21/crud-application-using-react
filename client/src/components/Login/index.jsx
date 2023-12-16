import React, { useState } from 'react';
import Swal from 'sweetalert2';

const Login = ({ setIsAuthenticated }) => {
  const adminEmail = 'demo@gmail.com';
  const adminPassword = 'password';

  const [email, setEmail] = useState('demo@gmail.com');
  const [password, setPassword] = useState('password');

  const handleLogin = e => {
    e.preventDefault();

    if (email === adminEmail && password === adminPassword) {
      Swal.fire({
        timer: 1500,
        showConfirmButton: false,
        willOpen: () => {
          Swal.showLoading();
        },
        willClose: () => {
          localStorage.setItem('is_authenticated', true);
          setIsAuthenticated(true);

          Swal.fire({
            icon: 'success',
            title: 'Successfully logged in!',
            showConfirmButton: false,
            timer: 1500,
          });
        },
      });
    } else {
      Swal.fire({
        timer: 1500,
        showConfirmButton: false,
        willOpen: () => {
          Swal.showLoading();
        },
        willClose: () => {
          Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: 'Incorrect email or password.',
            showConfirmButton: true,
          });
        },
      });
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <form onSubmit={handleLogin} className="space-y-4">
          <h1 className="text-2xl font-bold mb-4 text-center text-blue-500">
            Admin Login
          </h1>
          <label htmlFor="email" className="block text-sm font-medium text-gray-600">
            Email
          </label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="admin@example.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
          />
          <label htmlFor="password" className="block text-sm font-medium text-gray-600">
            Password
          </label>
          <input
            id="password"
            type="password"
            name="password"
            placeholder="qwerty"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full p-2 border rounded"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded cursor-pointer transition duration-300 hover:bg-blue-700"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
