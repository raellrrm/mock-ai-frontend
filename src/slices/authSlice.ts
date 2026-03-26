import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface User {
  id: string;
  email: string;
  name: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const getUserFromStorage = (): User | null => {
  if (typeof window !== 'undefined') {
    const storedUser = localStorage.getItem('@mockai:user');
    if (storedUser) return JSON.parse(storedUser);
  }
  return null;
};

const initialUser = getUserFromStorage();

const initialState: AuthState = {
  user: initialUser,
  isAuthenticated: !!initialUser,
  isLoading: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.isLoading = false;
      if (typeof window !== 'undefined') {
        localStorage.setItem('@mockai:user', JSON.stringify(action.payload));
      }
    },

    logoutSuccess: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      if (typeof window !== 'undefined') {
        localStorage.removeItem('@mockai:user');
      }
    },

    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setCredentials, logoutSuccess, setLoading } = authSlice.actions;

export default authSlice.reducer;