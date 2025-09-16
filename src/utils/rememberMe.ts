// Utility functions untuk manage remembered login credentials

const REMEMBERED_EMAIL_KEY = 'rememberedEmail';
const REMEMBERED_PASSWORD_KEY = 'rememberedPassword';
const REMEMBER_TIMESTAMP_KEY = 'rememberTimestamp';

// Credentials expire after 30 days
const REMEMBER_EXPIRY_DAYS = 30;

export interface RememberedCredentials {
  email: string;
  password: string;
}

export const rememberMeUtils = {
  // Save credentials ke localStorage dengan timestamp
  saveCredentials: (email: string, password: string): void => {
    try {
      localStorage.setItem(REMEMBERED_EMAIL_KEY, email);
      localStorage.setItem(REMEMBERED_PASSWORD_KEY, password);
      localStorage.setItem(REMEMBER_TIMESTAMP_KEY, Date.now().toString());
    } catch (error) {
      console.error('Failed to save credentials:', error);
    }
  },

  // Load credentials dari localStorage dengan expiry check
  loadCredentials: (): RememberedCredentials | null => {
    try {
      // Check if credentials have expired
      const timestamp = localStorage.getItem(REMEMBER_TIMESTAMP_KEY);
      if (timestamp) {
        const savedTime = parseInt(timestamp);
        const expiryTime =
          savedTime + REMEMBER_EXPIRY_DAYS * 24 * 60 * 60 * 1000;

        if (Date.now() > expiryTime) {
          // Credentials expired, clear them
          rememberMeUtils.clearCredentials();
          return null;
        }
      }

      const email = localStorage.getItem(REMEMBERED_EMAIL_KEY);
      const password = localStorage.getItem(REMEMBERED_PASSWORD_KEY);

      if (email && password) {
        return { email, password };
      }
      return null;
    } catch (error) {
      console.error('Failed to load credentials:', error);
      return null;
    }
  },

  // Clear saved credentials dan timestamp
  clearCredentials: (): void => {
    try {
      localStorage.removeItem(REMEMBERED_EMAIL_KEY);
      localStorage.removeItem(REMEMBERED_PASSWORD_KEY);
      localStorage.removeItem(REMEMBER_TIMESTAMP_KEY);
    } catch (error) {
      console.error('Failed to clear credentials:', error);
    }
  },

  // Check apakah ada credentials yang tersimpan dan valid
  hasRememberedCredentials: (): boolean => {
    try {
      const credentials = rememberMeUtils.loadCredentials();
      return credentials !== null;
    } catch (error) {
      console.error('Failed to check credentials:', error);
      return false;
    }
  },

  // Update timestamp untuk extend expiry (ketika user login dengan remembered credentials)
  refreshCredentials: (): void => {
    try {
      const credentials = rememberMeUtils.loadCredentials();
      if (credentials) {
        // Refresh timestamp tanpa mengubah credentials
        localStorage.setItem(REMEMBER_TIMESTAMP_KEY, Date.now().toString());
      }
    } catch (error) {
      console.error('Failed to refresh credentials:', error);
    }
  },
};
