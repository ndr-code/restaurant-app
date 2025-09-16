import { useAppSelector, useAppDispatch } from '../store';
import {
  loginUser,
  registerUser,
  logout,
  fetchProfile,
  updateProfile,
  changePassword,
} from '../store/slices/authSlice';
import type {
  LoginRequest,
  RegisterRequest,
  UpdateProfileRequest,
  ChangePasswordRequest,
} from '../types/api';

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth);

  const login = async (credentials: LoginRequest) => {
    return dispatch(loginUser(credentials));
  };

  const register = async (userData: RegisterRequest) => {
    return dispatch(registerUser(userData));
  };

  const logoutUser = () => {
    dispatch(logout());
  };

  const getProfile = async () => {
    return dispatch(fetchProfile());
  };

  const updateUserProfile = async (profileData: UpdateProfileRequest) => {
    return dispatch(updateProfile(profileData));
  };

  const changeUserPassword = async (passwordData: ChangePasswordRequest) => {
    return dispatch(changePassword(passwordData));
  };

  return {
    // State
    user: auth.user,
    token: auth.token,
    isAuthenticated: auth.isAuthenticated,

    // Loading states
    isLoading: auth.isLoading,
    error: auth.error,
    isRegisterLoading: auth.isRegisterLoading,
    registerError: auth.registerError,
    isProfileLoading: auth.isProfileLoading,
    profileError: auth.profileError,
    isPasswordChanging: auth.isPasswordChanging,
    passwordChangeError: auth.passwordChangeError,

    // Actions
    login,
    register,
    logout: logoutUser,
    getProfile,
    updateUserProfile,
    changeUserPassword,

    // Computed values
    isGuest: !auth.isAuthenticated,
    userName: auth.user?.name || '',
    userEmail: auth.user?.email || '',
    userRole: auth.user?.role || 'customer',
  };
};
