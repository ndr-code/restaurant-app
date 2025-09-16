import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { useAuth } from '../hooks/useAuth';
import { ROUTES } from '../config/routes';
import type { LoginRequest } from '../types/api';

const Login: React.FC = () => {
  const [formData, setFormData] = useState<LoginRequest>({
    email: '',
    password: '',
  });

  const [rememberMe, setRememberMe] = useState(false);

  const navigate = useNavigate();

  const { isLoading, error, isAuthenticated, login } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate(ROUTES.HOME);
    }
  }, [isAuthenticated, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const result = await login(formData);

      if (result.type === 'auth/loginUser/fulfilled') {
        console.log('Login successful:', result.payload);
      } else {
        console.error('Login failed:', result.payload);
      }
    } catch (loginError) {
      console.error('Login failed:', loginError);
    }
  };

  return (
    <div className='flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8'>
      <div className='w-full max-w-md space-y-8'>
        {/* Header */}
        <div className='text-center'>
          <h1 className='mb-2 text-3xl font-bold text-gray-900'>
            Welcome Back
          </h1>
          <p className='text-gray-600'>Sign in to your account to continue</p>
        </div>

        {/* Login Form */}
        <Card className='p-6'>
          <form onSubmit={handleSubmit} className='space-y-6'>
            {error && (
              <div className='rounded-lg border border-red-200 bg-red-50 p-4'>
                <p className='text-sm text-red-600'>{error}</p>
              </div>
            )}

            <div>
              <label
                htmlFor='email'
                className='mb-2 block text-sm font-medium text-gray-700'
              >
                Email Address
              </label>
              <Input
                id='email'
                name='email'
                type='email'
                required
                placeholder='Enter your email'
                value={formData.email}
                onChange={handleInputChange}
                disabled={isLoading}
              />
            </div>

            <div>
              <label
                htmlFor='password'
                className='mb-2 block text-sm font-medium text-gray-700'
              >
                Password
              </label>
              <Input
                id='password'
                name='password'
                type='password'
                required
                placeholder='Enter your password'
                value={formData.password}
                onChange={handleInputChange}
                disabled={isLoading}
              />
            </div>

            <div className='flex items-center justify-between'>
              <div className='flex items-center'>
                <input
                  id='remember-me'
                  name='remember-me'
                  type='checkbox'
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className='h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500'
                />
                <label
                  htmlFor='remember-me'
                  className='ml-2 block text-sm text-gray-700'
                >
                  Remember me
                </label>
              </div>

              <div className='text-sm'>
                <Link
                  to={ROUTES.FORGOT_PASSWORD}
                  className='font-medium text-blue-600 hover:text-blue-500'
                >
                  Forgot your password?
                </Link>
              </div>
            </div>

            <Button type='submit' className='w-full' disabled={isLoading}>
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          {/* Sign Up Link */}
          <div className='mt-6 text-center'>
            <p className='text-sm text-gray-600'>
              Don't have an account?{' '}
              <Link
                to={ROUTES.REGISTER}
                className='font-medium text-blue-600 hover:text-blue-500'
              >
                Sign up here
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Login;
