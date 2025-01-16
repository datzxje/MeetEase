'use client';

import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import { useRouter } from "next/navigation";
import axiosInstance from "@/utils/axiosInstance";
import { useSignUpContext } from '@/context/SignUpContext';

export default function VerifyPage() {
  const [code, setCode] = useState<string[]>(new Array(6).fill(''));
  const [timer, setTimer] = useState<number>(60); // Thời gian đếm ngược
  const [isResendVisible, setIsResendVisible] = useState<boolean>(false);
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isVerified, setIsVerified] = useState<boolean>(false); // New state for successful verification message
  const inputs = useRef<Array<HTMLInputElement | null>>([]);
  const router = useRouter(); // Use router for navigation

  // Giả sử thông tin đăng ký lấy từ context
  const { signUpData } = useSignUpContext();

  const handleChange = (value: string, index: number) => {
    if (value === '' || /^[0-9]$/.test(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      if (value && index < 5) {
        inputs.current[index + 1]?.focus();
      }
    } else {
      alert('Only numeric values are allowed.');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async () => {
    if (!signUpData) {
      alert('Sign up data is missing.');
      return;
    }

    if (code.includes('')) {
      alert('Please fill all fields before submitting.');
      return;
    }

    try {
      setIsVerifying(true);
      setErrorMessage(null);

      const verifyRequest = {
        email: signUpData.email,
        code: code.join(''),
        signUpRequest: {
          fullname: signUpData.fullname,
          email: signUpData.email,
          password: signUpData.password,
          yearOfBirth: signUpData.yearOfBirth,
        },
      };

      const response = await axiosInstance.post('/user/verify', verifyRequest);
      alert('Verification successful!');
      console.log('API response:', response.data);

      // After successful verification, show the success message
      setIsVerified(true);
    } catch (error: any) {
      setErrorMessage(error.response?.data?.message || 'Verification failed.');
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResend = async () => {
    if (!signUpData) {
      alert('Sign up data is missing.');
      return;
    }

    try {
      setIsResendVisible(false);
      setTimer(60);
      setErrorMessage(null);

      const response = await axiosInstance.post(`/user/resend-code?email=${encodeURIComponent(signUpData.email)}`);

      alert('Verification code resent successfully.');
      console.log('Resend response:', response.data);
    } catch (error: any) {
      setErrorMessage(error.response?.data?.message || 'Failed to resend code.');
    }
  };

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);

      return () => clearInterval(interval);
    } else {
      setIsResendVisible(true);
    }
  }, [timer]);

  return (
    <div className="flex flex-col items-center justify-center h-screen py-2">
      <Head>
        <title>Verify Your Email</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <div className="bg-white rounded-2xl shadow-2xl flex w-2/3 max-w-4xl">
          <div className="w-3/5 p-5">
            <div className="text-left font-bold">
              <span className="text-emerald-500">Meet</span>Ease
            </div>
            <div className="py-10">
              <h2 className="text-3xl font-bold text-emerald-500 mb-2">
                Verify Your Email
              </h2>
              <div className="border-2 w-10 border-emerald-500 inline-block mb-2"></div>
              <p className="text-gray-400 my-3">Please enter the verification code sent to your email</p>

              <div className="flex justify-center gap-2 mb-6">
                {code.map((digit, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(e.target.value, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    ref={(el: HTMLInputElement | null): void => {
                      inputs.current[index] = el;
                    }}
                    className="w-12 h-12 text-center text-xl border rounded-md focus:ring-2 focus:ring-emerald-500 outline-none border-gray-300"
                  />
                ))}
              </div>

              {errorMessage && <p className="text-red-500 mb-2">{errorMessage}</p>}

              <button
                onClick={handleSubmit}
                disabled={isVerifying}
                className="w-full bg-emerald-500 text-white py-2 px-4 rounded-md hover:bg-emerald-600 transition duration-200 disabled:opacity-50"
              >
                {isVerifying ? 'Verifying...' : 'Verify'}
              </button>
            </div>
          </div>

          <div className="w-2/5 bg-emerald-500 text-white rounded-tr-2xl rounded-br-2xl flex flex-col justify-center items-center py-12 px-12">
            <h2 className="text-3xl font-bold mb-2">Almost There!</h2>
            <div className="border-2 w-10 border-white inline-block mb-2"></div>
            <p className="mb-10 text-center">Fill up the verification code to proceed</p>
            <a
              href="#"
              className="border-2 border-white rounded-full px-12 py-2 inline-block font-semibold hover:bg-white hover:text-emerald-500 mb-4"
            >
              Need Help?
            </a>

            <div className="text-center">
              {timer > 0 ? (
                <p className="text-white mt-2">
                  <span className="opacity-60">{`Resend your code (${timer} seconds)`}</span>
                </p>
              ) : (
                isResendVisible && (
                  <div>
                    <button
                      onClick={handleResend}
                      className="underline font-semibold text-white hover:text-emerald-300"
                    >
                      Resend your code
                    </button>
                  </div>
                )
              )}
            </div>
          </div>
        </div>

        {/* Success message after verification */}
        {isVerified && (
          <div className="mt-6 text-green-500 font-bold">
            <p>
              Verify successfully, please{' '}
              <span
                className="cursor-pointer underline"
                onClick={() => router.push('/login')}
              >
                click here
              </span>{' '}
              to login.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
