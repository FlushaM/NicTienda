import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

interface AuthContextProps {
  user: { role: string } | null;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextProps>({
  user: null,
  signIn: async () => {},
  signOut: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<{ role: string } | null>(null);

  const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

  const signIn = async (email: string, password: string) => {
    const response = await axios.post(`${baseURL}/api/auth/login`, { email, password });

    if (response.data.token) {
      // Guardar token en localStorage
      localStorage.setItem('token', response.data.token);
      // Guardar user role en localStorage
      localStorage.setItem('role', response.data.user.role);
      // Actualizar el estado local
      setUser({ role: response.data.user.role });
    } else {
      throw new Error('Login fallido');
    }
  };

  const signOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
