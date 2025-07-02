import { createContext, useState } from 'react';
import type { ReactNode } from 'react';

interface AuthContextType {
  token: string | null;
  setToken: (token: string | null, isPremium?: boolean) => void;
  removeToken: () => void;
  isPremium: boolean;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setTokenState] = useState<string | null>(localStorage.getItem('token'));
  const [isPremium, setIsPremiumState] = useState<boolean>(localStorage.getItem('isPremium') === 'true');

  const setToken = (token: string | null, isPremium?: boolean) => {
    setTokenState(token);
    localStorage.setItem('token', token || "");
    setIsPremiumState(!!isPremium);
    localStorage.setItem('isPremium', isPremium ? 'true' : 'false');
  };

  const removeToken = () => {
    setTokenState(null);
    setIsPremiumState(false);
    localStorage.removeItem('token');
    localStorage.removeItem('isPremium');
  };

  return (
    <AuthContext.Provider value={{ token, setToken, removeToken, isPremium }}>
      {children}
    </AuthContext.Provider>
  );
};
