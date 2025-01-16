'use client';

import { createContext, useContext, useState, ReactNode } from "react";

// Định nghĩa kiểu dữ liệu của thông tin đăng nhập
interface UserLogin {
  id: number;
  email: string;
  name: string;
}

interface AuthContextType {
  accessToken: string | null;
  user: UserLogin | null;
  setAuthData: (token: string, user: UserLogin) => void;
  clearAuth: () => void;
}

// Tạo context với giá trị mặc định là undefined
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider cho context
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserLogin | null>(null);

  const setAuthData = (token: string, user: UserLogin) => {
    setAccessToken(token);
    setUser(user);
  };

  const clearAuth = () => {
    setAccessToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ accessToken, user, setAuthData, clearAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook để sử dụng AuthContext
export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};
