import React, { useState } from 'react';
import { BASE_URL } from '../App';
export default function Register() {
  const [userData, setUserData] = useState({
    name:"",
    username:"",
    phone:"",
    email:"",
    location:"",
    password:"",
    confirmPassword:""
  })
  const [passwordMatch, setPasswordMatch] = useState(null); // null, true, false

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setUserData(prev => ({ ...prev, [id]: value }));
    
    // Check password match when either password field changes
    if (id === 'password' || id === 'confirmPassword') {
      const password = id === 'password' ? value : userData.password;
      const confirmPassword = id === 'confirmPassword' ? value : userData.confirmPassword;
      
      if (password && confirmPassword) {
        setPasswordMatch(password === confirmPassword);
      } else {
        setPasswordMatch(null);
      }
    }
  };

  const handleSubmit = async(e)=>{
    e.preventDefault();

    if (userData.password !== userData.confirmPassword) {
      setPasswordMatch(false);
      return;
    }
    const payload = {
      ...userData,
    }
    try {
      const res = await fetch(`${BASE_URL}/user`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (!res.ok || data.msg === 'Error') throw new Error(data.error || 'Failed to create');
      alert("Account created successfully!");
      setUserData({
        name:"",
        username:"",
        phone:"",
        email:"",
        location:"",
        password:"",
        confirmPassword:""
      });
      setPasswordMatch(null);
      window.location.href = '/login';

    } catch (err) {
      alert(`Registration failed: ${err.message}`);
    }
  }

  return (
    <div>
      <main
        id="main-content"
        className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 w-full"
      >
        <div className="w-full max-w-2xl space-y-8 bg-white p-8 rounded-lg shadow">
          <div>
            <h1 className="mt-6 text-center text-3xl font-extrabold text-secondary-900">
              Create a new account
            </h1>
            <p className="mt-2 text-center text-sm text-secondary-600">
              Or{' '}
              <a
                href="/login"
                className="font-medium text-primary-600 hover:text-primary-500"
              >
                sign in to your account
              </a>
            </p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-secondary-700">
                  Name
                </label>
                <div className="mt-1">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    value={userData.name}
                    onChange={handleInputChange}
                    className="appearance-none block w-full px-3 py-2 border border-secondary-300 rounded-md shadow-sm placeholder-secondary-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="username" className="block text-sm font-medium text-secondary-700">
                  Username
                </label>
                <div className="mt-1">
                  <input
                    id="username"
                    name="username"
                    type="text"
                    autoComplete="username"
                    required
                    value={userData.username}
                    onChange={handleInputChange}
                    className="appearance-none block w-full px-3 py-2 border border-secondary-300 rounded-md shadow-sm placeholder-secondary-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-secondary-700">
                    Email
                  </label>
                  <div className="mt-1">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={userData.email}
                      onChange={handleInputChange}
                      className="appearance-none block w-full px-3 py-2 border border-secondary-300 rounded-md shadow-sm placeholder-secondary-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-secondary-700">
                    Phone
                  </label>
                  <div className="mt-1">
                    <input
                      id="phone"
                      name="phone"
                      type="number"
                      autoComplete="tel"
                      required
                      value={userData.phone}
                      onChange={handleInputChange}
                      className="appearance-none block w-full px-3 py-2 border border-secondary-300 rounded-md shadow-sm placeholder-secondary-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    />
                  </div>
                </div>
              </div>

             
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-secondary-700">
                  Location
                </label>
                <div className="mt-1 relative">
                  <span className="material-symbols-outlined pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-secondary-400 text-lg">location_on</span>
                  <input
                    id="location"
                    name="location"
                    type="text"
                    placeholder="City, Country"
                    autoComplete="address-level2"
                    required
                    value={userData.location}
                    onChange={handleInputChange}
                    className="appearance-none block w-full pl-10 px-3 py-2 border border-secondary-300 rounded-md shadow-sm placeholder-secondary-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  />
                </div>
              </div>

              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-secondary-700">
                    Password
                  </label>
                  <div className="mt-1">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="new-password"
                      required
                      value={userData.password}
                      onChange={handleInputChange}
                      className="appearance-none block w-full px-3 py-2 border border-secondary-300 rounded-md shadow-sm placeholder-secondary-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-secondary-700">
                    Confirm Password
                  </label>
                  <div className="mt-1">
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      autoComplete="new-password"
                      required
                      value={userData.confirmPassword}
                      onChange={handleInputChange}
                      className="appearance-none block w-full px-3 py-2 border border-secondary-300 rounded-md shadow-sm placeholder-secondary-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    />
                    
                    {passwordMatch === true && (
                      <span className="text-green-600 text-sm mt-1 flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm">check_circle</span>
                        Passwords match
                      </span>
                    )}
                    {passwordMatch === false && (
                      <span className="text-red-600 text-sm mt-1 flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm">error</span>
                        Passwords don't match
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div>
              <button
                className="w-full inline-flex justify-center rounded-md bg-primary-600 px-4 py-2 text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              >
                Create Account
              </button>
            </div>
            </form>
        </div>
        </main>
    </div>
  )
}