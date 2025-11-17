import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export type UserRole = 'ADMIN' | 'LIBRARIAN' | 'USER';

interface User {
  username: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string, role: UserRole) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Temporary predefined accounts
const TEMP_ACCOUNTS = [
  { username: 'admin', password: 'admin123', role: 'ADMIN' as UserRole },
  { username: 'librarian', password: 'lib123', role: 'LIBRARIAN' as UserRole },
  { username: 'user', password: 'user123', role: 'USER' as UserRole },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check for stored user on mount
    const storedUser = localStorage.getItem('lms_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (username: string, password: string, role: UserRole): boolean => {
    const account = TEMP_ACCOUNTS.find(
      (acc) => acc.username === username && acc.password === password && acc.role === role
    );

    if (account) {
      const userData = { username: account.username, role: account.role };
      setUser(userData);
      localStorage.setItem('lms_user', JSON.stringify(userData));
      toast.success(`Welcome back, ${username}!`);
      
      // Redirect based on role
      switch (role) {
        case 'ADMIN':
          navigate('/admin/dashboard');
          break;
        case 'LIBRARIAN':
          navigate('/librarian/dashboard');
          break;
        case 'USER':
          navigate('/user/dashboard');
          break;
      }
      return true;
    }
    
    toast.error('Invalid credentials');
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('lms_user');
    toast.info('Logged out successfully');
    navigate('/login');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
