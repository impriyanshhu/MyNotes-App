import React, { useState } from 'react';
import logo from '../assets/logo.png';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { useAuth } from '../Context/ContextProvider.jsx';
import { toast } from 'react-toastify';
import BACKEND_URL from '../API/URL.js';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    try {
      const loginData = { email, password };

      const response = await BACKEND_URL.post("/auth/login", loginData);
      console.log(response.data);

      if (response.data.success) {
        login(response.data.user)
        localStorage.setItem("token", response.data.token);
        toast.success("Logged in successfully!");
        navigate('/dashboard')
      } else {
        toast.error("Invalid credentials");
      }
    } catch (error) {
      console.error(error);
      toast.error("Login failed. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='flex flex-col min-h-screen bg-white max-sm:text-sm'>
      <div className='flex grow overflow-hidden'>
        <div className='w-full lg:w-1/2 flex items-center justify-center px-4 py-8 sm:py-12 lg:py-16 bg-[#F9FAFB]'>
          <div className='w-full max-w-md'>
            <div className='bg-white rounded-2xl p-6 sm:p-8 md:p-10 shadow-xl border border-gray-100'>
              <form onSubmit={handleSubmit} className='space-y-6'>

                <div className='text-center mb-8'>
                  <h4 className='text-2xl sm:text-3xl md:text-4xl font-bold text-[#1D4ED8] mb-2'>Log In</h4>
                  <p className='text-sm sm:text-base text-gray-600'>Enter your credentials to access your account</p>
                </div>

                <div className='space-y-4'>
                  <input
                    type="email"
                    placeholder='Email'
                    className='w-full px-4 py-3 text-sm sm:text-base rounded-lg border-2 border-gray-200 focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB] focus:ring-opacity-20 transition-all duration-200'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <input
                    type="password"
                    placeholder='Password'
                    className='w-full px-4 py-3 text-sm sm:text-base rounded-lg border-2 border-gray-200 focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB] focus:ring-opacity-20 transition-all duration-200'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <button
                  type='submit'
                  disabled={isLoading}
                  className='cursor-pointer w-full bg-[#2563EB] text-white py-3 sm:py-3.5 rounded-lg sm:text-base font-semibold hover:bg-[#1D4ED8] disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-200 hover:shadow-lg hover:scale-[1.01] flex items-center justify-center'
                >
                  {isLoading ? (
                    <span className="inline-flex items-center">
                      <div className="h-5 w-5 mr-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Logging in...
                    </span>
                  ) : (
                    "Log In"
                  )}
                </button>

                <div className="text-center">
                  <p className='text-sm sm:text-base text-gray-600'>
                    Don't have an account? {" "}
                    <Link to="/signup" className='text-[#2563EB] font-semibold hover:underline'>
                      Sign Up
                    </Link>
                  </p>
                </div>

              </form>
            </div>
          </div>
        </div>

        <div className='hidden lg:flex lg:w-1/2 relative items-center justify-center overflow-hidden bg-white'>
          <img src={logo} alt="Logo" className='w-3/4 h-auto object-contain' />
        </div>
      </div>
    </div>
  );
};

export default Login;
