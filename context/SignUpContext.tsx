'use client';

import { createContext, useContext, useState, ReactNode } from "react";

// Định nghĩa kiểu dữ liệu của thông tin đăng ký
interface SignUpData {
  fullname: string;
  email: string;
  password: string;
  yearOfBirth: number;
}

// Định nghĩa kiểu dữ liệu context
interface SignUpContextType {
  signUpData: SignUpData | null;
  setSignUpData: (data: SignUpData) => void;
}

// Tạo context với giá trị mặc định là undefined
const SignUpContext = createContext<SignUpContextType | undefined>(undefined);

// Provider cho context
export const SignUpProvider = ({ children }: { children: ReactNode }) => {
  const [signUpData, setSignUpData] = useState<SignUpData | null>(null);

  return (
    <SignUpContext.Provider value={{ signUpData, setSignUpData }}>
      {children}
    </SignUpContext.Provider>
  );
};

// Custom hook để sử dụng SignUpContext
export const useSignUpContext = () => {
  const context = useContext(SignUpContext);
  if (!context) {
    throw new Error("useSignUpContext must be used within a SignUpProvider");
  }
  return context;
};
