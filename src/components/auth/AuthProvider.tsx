'use client';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { authService } from '@/services/auth.service';
import { logoutSuccess, setCredentials, setLoading } from '@/slices/authSlice';


export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const user = await authService.getProfile();
        
        dispatch(setCredentials(user));
      } catch (error) {
        dispatch(logoutSuccess());
      } finally {
        dispatch(setLoading(false));
      }
    };

    checkSession();
  }, [dispatch]);

  return <>{children}</>;
}