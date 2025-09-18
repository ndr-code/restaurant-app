import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useAuth } from '@/hooks/useAuth';
import { ROUTES } from '@/config/routes';
import { cn } from '@/lib/utils';
import type { LoginRequest, RegisterRequest } from '@/types/api';

// TypeScript interfaces for form data
interface SignInFormData extends LoginRequest {
  rememberMe: boolean;
}

interface SignUpFormData extends RegisterRequest {}

interface FormErrors {
  [key: string]: string;
}

const Auth: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const {
    login,
    register,
    isLoading,
    error,
    isRegisterLoading,
    registerError,
    isAuthenticated,
  } = useAuth();

  // Get tab from URL parameter, default to 'signin'
  const tabFromUrl = searchParams.get('tab');
  const initialTab = tabFromUrl === 'signup' ? 'signup' : 'signin';
  const [activeTab, setActiveTab] = useState<string>(initialTab);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  // Form data states
  const [signInData, setSignInData] = useState<SignInFormData>({
    email: '',
    password: '',
    rememberMe: false,
  });

  const [signUpData, setSignUpData] = useState<SignUpFormData>({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  // Form errors states
  const [signInErrors, setSignInErrors] = useState<FormErrors>({});
  const [signUpErrors, setSignUpErrors] = useState<FormErrors>({});

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate(ROUTES.HOME);
    }
  }, [isAuthenticated, navigate]);

  // Handle URL parameter changes
  useEffect(() => {
    const tabFromUrl = searchParams.get('tab');
    if (tabFromUrl === 'signup') {
      setActiveTab('signup');
    } else if (tabFromUrl === 'signin') {
      setActiveTab('signin');
    }
  }, [searchParams]);

  // Validation functions
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string): boolean => {
    return password.length >= 6;
  };

  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^[0-9+\-\s()]+$/;
    return phoneRegex.test(phone) && phone.length >= 10;
  };

  // Sign In validation
  const validateSignIn = (): boolean => {
    const errors: FormErrors = {};

    if (!signInData.email) {
      errors.email = 'Email is required';
    } else if (!validateEmail(signInData.email)) {
      errors.email = 'Please enter a valid email';
    }

    if (!signInData.password) {
      errors.password = 'Password is required';
    } else if (!validatePassword(signInData.password)) {
      errors.password = 'Password must be at least 6 characters';
    }

    setSignInErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Sign Up validation
  const validateSignUp = (): boolean => {
    const errors: FormErrors = {};

    if (!signUpData.name) {
      errors.name = 'Name is required';
    }

    if (!signUpData.email) {
      errors.email = 'Email is required';
    } else if (!validateEmail(signUpData.email)) {
      errors.email = 'Please enter a valid email';
    }

    if (!signUpData.phone) {
      errors.phone = 'Phone number is required';
    } else if (!validatePhone(signUpData.phone)) {
      errors.phone = 'Please enter a valid phone number';
    }

    if (!signUpData.password) {
      errors.password = 'Password is required';
    } else if (!validatePassword(signUpData.password)) {
      errors.password = 'Password must be at least 6 characters';
    }

    if (!signUpData.confirmPassword) {
      errors.confirmPassword = 'Please confirm your password';
    } else if (signUpData.password !== signUpData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    setSignUpErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Form handlers
  const handleSignInSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateSignIn()) {
      try {
        const loginData: LoginRequest = {
          email: signInData.email,
          password: signInData.password,
        };

        const result = await login(loginData);

        if (result.type === 'auth/loginUser/fulfilled') {
          // Login successful - redirect will happen via useEffect
          console.log('Login successful');
        }
      } catch (loginError) {
        console.error('Login failed:', loginError);
      }
    }
  };

  const handleSignUpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateSignUp()) {
      try {
        const registerData: RegisterRequest = {
          name: signUpData.name,
          email: signUpData.email,
          phone: signUpData.phone,
          password: signUpData.password,
          confirmPassword: signUpData.confirmPassword,
        };

        const result = await register(registerData);

        if (result.type === 'auth/registerUser/fulfilled') {
          // Registration successful - switch to sign in tab
          setActiveTab('signin');
          // Clear sign up form
          setSignUpData({
            name: '',
            email: '',
            phone: '',
            password: '',
            confirmPassword: '',
          });
          setSignUpErrors({});
          console.log('Registration successful');
        }
      } catch (registerError) {
        console.error('Registration failed:', registerError);
      }
    }
  };

  const handleSignInChange = (
    field: keyof SignInFormData,
    value: string | boolean
  ) => {
    setSignInData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (signInErrors[field]) {
      setSignInErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const handleSignUpChange = (field: keyof SignUpFormData, value: string) => {
    setSignUpData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (signUpErrors[field]) {
      setSignUpErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className='flex min-h-screen'>
      {/* Left side - Background Image */}
      <div className='relative hidden lg:flex lg:w-1/2'>
        <div
          className='h-full w-full bg-cover bg-center bg-no-repeat'
          style={{
            backgroundImage: 'url(/images/auth-background.png)',
          }}
        />
      </div>

      {/* Right side - Form */}
      <div className='flex w-full items-center justify-center bg-white p-8 lg:w-1/2'>
        <div className='w-full max-w-md space-y-8'>
          {/* Logo and Welcome Text */}
          <div className='space-y-4 text-center'>
            <div className='flex items-center justify-center space-x-2'>
              <img
                src='/icons/logo-foody.svg'
                alt='Foody Logo'
                className='h-8 w-8'
                style={{
                  filter:
                    'brightness(0) saturate(100%) invert(14%) sepia(93%) saturate(7151%) hue-rotate(3deg) brightness(90%) contrast(114%)',
                }}
              />
              <h1 className='display-xs-bold text-foreground'>Foody</h1>
            </div>
            <div className='space-y-2'>
              <h2 className='display-sm-bold text-foreground'>Welcome Back</h2>
              <p className='text-muted-foreground text-sm'>
                Good to see you again! Let's eat
              </p>
            </div>
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className='grid w-full grid-cols-2'>
              <TabsTrigger value='signin'>Sign in</TabsTrigger>
              <TabsTrigger value='signup'>Sign up</TabsTrigger>
            </TabsList>

            {/* Sign In Tab Content */}
            <TabsContent value='signin'>
              <form onSubmit={handleSignInSubmit} className='space-y-4'>
                <div className='space-y-2'>
                  <Input
                    type='email'
                    placeholder='Email'
                    value={signInData.email}
                    onChange={(e) =>
                      handleSignInChange('email', e.target.value)
                    }
                    className={cn(
                      'h-12 rounded-lg border-neutral-300 focus:border-[#c12116] focus:ring-[#c12116]',
                      signInErrors.email && 'border-red-500'
                    )}
                  />
                  {signInErrors.email && (
                    <p className='text-xs text-red-500'>{signInErrors.email}</p>
                  )}
                </div>

                <div className='space-y-2'>
                  <div className='relative'>
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      placeholder='Password'
                      value={signInData.password}
                      onChange={(e) =>
                        handleSignInChange('password', e.target.value)
                      }
                      className={cn(
                        'h-12 rounded-lg border-neutral-300 pr-10 focus:border-[#c12116] focus:ring-[#c12116]',
                        signInErrors.password && 'border-red-500'
                      )}
                    />
                    <button
                      type='button'
                      onClick={() => setShowPassword(!showPassword)}
                      className='absolute top-1/2 right-3 -translate-y-1/2 transform text-neutral-500 hover:text-neutral-700'
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                  {signInErrors.password && (
                    <p className='text-xs text-red-500'>
                      {signInErrors.password}
                    </p>
                  )}
                </div>

                <div className='flex items-center space-x-2'>
                  <input
                    type='checkbox'
                    id='rememberMe'
                    checked={signInData.rememberMe}
                    onChange={(e) =>
                      handleSignInChange('rememberMe', e.target.checked)
                    }
                    className='h-4 w-4 rounded border-neutral-300 text-[#c12116] focus:ring-[#c12116]'
                  />
                  <label
                    htmlFor='rememberMe'
                    className='text-sm text-neutral-600'
                  >
                    Remember Me
                  </label>
                </div>

                {/* API Error Display */}
                {error && (
                  <div className='rounded-lg border border-red-200 bg-red-50 p-3'>
                    <p className='text-sm text-red-600'>{error}</p>
                  </div>
                )}

                <Button
                  type='submit'
                  disabled={isLoading}
                  className='h-12 w-full rounded-lg bg-[#c12116] font-semibold text-white hover:bg-[#a01e14] disabled:cursor-not-allowed disabled:opacity-50'
                >
                  {isLoading ? 'Signing in...' : 'Login'}
                </Button>
              </form>
            </TabsContent>

            {/* Sign Up Tab Content */}
            <TabsContent value='signup'>
              <form onSubmit={handleSignUpSubmit} className='space-y-4'>
                <div className='space-y-2'>
                  <Input
                    type='text'
                    placeholder='Name'
                    value={signUpData.name}
                    onChange={(e) => handleSignUpChange('name', e.target.value)}
                    className={cn(
                      'h-12 rounded-lg border-neutral-300 focus:border-[#c12116] focus:ring-[#c12116]',
                      signUpErrors.name && 'border-red-500'
                    )}
                  />
                  {signUpErrors.name && (
                    <p className='text-xs text-red-500'>{signUpErrors.name}</p>
                  )}
                </div>

                <div className='space-y-2'>
                  <Input
                    type='email'
                    placeholder='Email'
                    value={signUpData.email}
                    onChange={(e) =>
                      handleSignUpChange('email', e.target.value)
                    }
                    className={cn(
                      'h-12 rounded-lg border-neutral-300 focus:border-[#c12116] focus:ring-[#c12116]',
                      signUpErrors.email && 'border-red-500'
                    )}
                  />
                  {signUpErrors.email && (
                    <p className='text-xs text-red-500'>{signUpErrors.email}</p>
                  )}
                </div>

                <div className='space-y-2'>
                  <Input
                    type='tel'
                    placeholder='Number Phone'
                    value={signUpData.phone}
                    onChange={(e) =>
                      handleSignUpChange('phone', e.target.value)
                    }
                    className={cn(
                      'h-12 rounded-lg border-neutral-300 focus:border-[#c12116] focus:ring-[#c12116]',
                      signUpErrors.phone && 'border-red-500'
                    )}
                  />
                  {signUpErrors.phone && (
                    <p className='text-xs text-red-500'>{signUpErrors.phone}</p>
                  )}
                </div>

                <div className='space-y-2'>
                  <div className='relative'>
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      placeholder='Password'
                      value={signUpData.password}
                      onChange={(e) =>
                        handleSignUpChange('password', e.target.value)
                      }
                      className={cn(
                        'h-12 rounded-lg border-neutral-300 pr-10 focus:border-[#c12116] focus:ring-[#c12116]',
                        signUpErrors.password && 'border-red-500'
                      )}
                    />
                    <button
                      type='button'
                      onClick={() => setShowPassword(!showPassword)}
                      className='absolute top-1/2 right-3 -translate-y-1/2 transform text-neutral-500 hover:text-neutral-700'
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                  {signUpErrors.password && (
                    <p className='text-xs text-red-500'>
                      {signUpErrors.password}
                    </p>
                  )}
                </div>

                <div className='space-y-2'>
                  <div className='relative'>
                    <Input
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder='Confirm Password'
                      value={signUpData.confirmPassword}
                      onChange={(e) =>
                        handleSignUpChange('confirmPassword', e.target.value)
                      }
                      className={cn(
                        'h-12 rounded-lg border-neutral-300 pr-10 focus:border-[#c12116] focus:ring-[#c12116]',
                        signUpErrors.confirmPassword && 'border-red-500'
                      )}
                    />
                    <button
                      type='button'
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className='absolute top-1/2 right-3 -translate-y-1/2 transform text-neutral-500 hover:text-neutral-700'
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={20} />
                      ) : (
                        <Eye size={20} />
                      )}
                    </button>
                  </div>
                  {signUpErrors.confirmPassword && (
                    <p className='text-xs text-red-500'>
                      {signUpErrors.confirmPassword}
                    </p>
                  )}
                </div>

                {/* API Error Display */}
                {registerError && (
                  <div className='rounded-lg border border-red-200 bg-red-50 p-3'>
                    <p className='text-sm text-red-600'>{registerError}</p>
                  </div>
                )}

                <Button
                  type='submit'
                  disabled={isRegisterLoading}
                  className='h-12 w-full rounded-lg bg-[#c12116] font-semibold text-white hover:bg-[#a01e14] disabled:cursor-not-allowed disabled:opacity-50'
                >
                  {isRegisterLoading ? 'Creating account...' : 'Register'}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Auth;
