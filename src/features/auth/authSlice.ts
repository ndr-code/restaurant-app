import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import api from '../../services/api/axios';
import type { 
  User, 
  LoginRequest, 
  RegisterRequest, 
  LoginResponse, 
  UpdateProfileRequest, 
  ChangePasswordRequest,
  ApiResponse 
} from '../../types/api';

// Async thunks for API calls
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials: LoginRequest, { rejectWithValue }) => {
    try {
      const response = await api.post<ApiResponse<LoginResponse>>('/api/auth/login', credentials);
      const { data } = response;

      if (!data.success) {
        return rejectWithValue(data.message);
      }

      // Store token in localStorage
      localStorage.setItem('jwt_token', data.data.token);

      return data.data;
    } catch (error) {
      if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as { response?: { data?: { message?: string } } };
        return rejectWithValue(axiosError.response?.data?.message || 'Network error occurred');
      }
      return rejectWithValue('Network error occurred');
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData: RegisterRequest, { rejectWithValue }) => {
    try {
      const response = await api.post<ApiResponse<{ user: User }>>('/api/auth/register', userData);
      const { data } = response;

      if (!data.success) {
        return rejectWithValue(data.message);
      }

      return data.data.user;
    } catch (error) {
      if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as { response?: { data?: { message?: string } } };
        return rejectWithValue(axiosError.response?.data?.message || 'Network error occurred');
      }
      return rejectWithValue('Network error occurred');
    }
  }
);

export const fetchProfile = createAsyncThunk(
  'auth/fetchProfile',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get<ApiResponse<User>>('/api/auth/profile');
      const { data } = response;

      if (!data.success) {
        return rejectWithValue(data.message);
      }

      return data.data;
    } catch (error) {
      if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as { response?: { data?: { message?: string } } };
        return rejectWithValue(axiosError.response?.data?.message || 'Network error occurred');
      }
      return rejectWithValue('Network error occurred');
    }
  }
);

export const updateProfile = createAsyncThunk(
  'auth/updateProfile',
  async (profileData: UpdateProfileRequest, { rejectWithValue }) => {
    try {
      const response = await api.put<ApiResponse<User>>('/api/auth/profile', profileData);
      const { data } = response;

      if (!data.success) {
        return rejectWithValue(data.message);
      }

      return data.data;
    } catch (error) {
      if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as { response?: { data?: { message?: string } } };
        return rejectWithValue(axiosError.response?.data?.message || 'Network error occurred');
      }
      return rejectWithValue('Network error occurred');
    }
  }
);

export const changePassword = createAsyncThunk(
  'auth/changePassword',
  async (passwordData: ChangePasswordRequest, { rejectWithValue }) => {
    try {

      const response = await api.put<ApiResponse<{ message: string }>>('/api/auth/profile', passwordData);
      const { data } = response;

      if (!data.success) {
        return rejectWithValue(data.message);
      }

      return data.data.message;
    } catch (error) {
      if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as { response?: { data?: { message?: string } } };
        return rejectWithValue(axiosError.response?.data?.message || 'Network error occurred');
      }
      return rejectWithValue('Network error occurred');
    }
  }
);

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  isRegisterLoading: boolean;
  registerError: string | null;
  isProfileLoading: boolean;
  profileError: string | null;
  isPasswordChanging: boolean;
  passwordChangeError: string | null;
}

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem('jwt_token'),
  isAuthenticated: !!localStorage.getItem('jwt_token'),
  isLoading: false,
  error: null,
  isRegisterLoading: false,
  registerError: null,
  isProfileLoading: false,
  profileError: null,
  isPasswordChanging: false,
  passwordChangeError: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
      localStorage.removeItem('jwt_token');
    },
    clearError: (state) => {
      state.error = null;
      state.registerError = null;
      state.profileError = null;
      state.passwordChangeError = null;
    },
    setCredentials: (state, action: PayloadAction<LoginResponse>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.error = null;
      localStorage.setItem('jwt_token', action.payload.token);
    },
  },
  extraReducers: (builder) => {
    // Login cases
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.error = action.payload as string;
      })
      
      // Register cases
      .addCase(registerUser.pending, (state) => {
        state.isRegisterLoading = true;
        state.registerError = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.isRegisterLoading = false;
        state.registerError = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isRegisterLoading = false;
        state.registerError = action.payload as string;
      })
      
      // Fetch profile cases
      .addCase(fetchProfile.pending, (state) => {
        state.isProfileLoading = true;
        state.profileError = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.isProfileLoading = false;
        state.user = action.payload;
        state.profileError = null;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.isProfileLoading = false;
        state.profileError = action.payload as string;
        // If token is invalid, logout user
        if (action.payload === 'No token found' || action.payload === 'Unauthorized') {
          state.user = null;
          state.token = null;
          state.isAuthenticated = false;
          localStorage.removeItem('jwt_token');
        }
      })
      
      // Update profile cases
      .addCase(updateProfile.pending, (state) => {
        state.isProfileLoading = true;
        state.profileError = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.isProfileLoading = false;
        state.user = action.payload;
        state.profileError = null;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.isProfileLoading = false;
        state.profileError = action.payload as string;
      })
      
      // Change password cases
      .addCase(changePassword.pending, (state) => {
        state.isPasswordChanging = true;
        state.passwordChangeError = null;
      })
      .addCase(changePassword.fulfilled, (state) => {
        state.isPasswordChanging = false;
        state.passwordChangeError = null;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.isPasswordChanging = false;
        state.passwordChangeError = action.payload as string;
      });
  },
});

export const { logout, clearError, setCredentials } = authSlice.actions;
export default authSlice.reducer;
