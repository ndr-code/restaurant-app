// Token management utilities

const TOKEN_KEY = 'jwt_token';
const USER_DATA_KEY = 'user_data';

export const tokenUtils = {
  // Get token from localStorage
  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  },

  // Set token in localStorage
  setToken(token: string): void {
    localStorage.setItem(TOKEN_KEY, token);
  },

  // Remove token from localStorage
  removeToken(): void {
    localStorage.removeItem(TOKEN_KEY);
  },

  // Check if user is authenticated (has valid token)
  isAuthenticated(): boolean {
    return !!this.getToken();
  },

  // Get user data from localStorage
  getUserData(): string | null {
    return localStorage.getItem(USER_DATA_KEY);
  },

  // Set user data in localStorage
  setUserData(userData: string): void {
    localStorage.setItem(USER_DATA_KEY, userData);
  },

  // Remove user data from localStorage
  removeUserData(): void {
    localStorage.removeItem(USER_DATA_KEY);
  },

  // Clear all auth data
  clearAuthData(): void {
    this.removeToken();
    this.removeUserData();
  },
};
