'use client';

import { createContext, useContext, useState, ReactNode } from "react";

// Định nghĩa kiểu dữ liệu của thông tin đăng nhập
interface AuthContextType {
  accessToken: string | null;
  setAccessToken: (token: string) => void;
  clearAccessToken: () => void;
}

// Tạo context với giá trị mặc định là undefined
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider cho context
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [accessToken, setAccessTokenState] = useState<string | null>(null);

  const setAccessToken = (token: string) => {
    setAccessTokenState(token);
    localStorage.setItem("accessToken", token); 
  };

  const clearAccessToken = () => {
    setAccessTokenState(null);
    localStorage.removeItem("accessToken"); 
  };

  return (
    <AuthContext.Provider value={{ accessToken, setAccessToken, clearAccessToken }}>
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
