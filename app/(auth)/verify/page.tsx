'use client';

import { useState, useRef } from 'react';
import Head from 'next/head';

export default function Home() {
  const [code, setCode] = useState<string[]>(new Array(6).fill(''));
  const inputs = useRef<Array<HTMLInputElement | null>>([]);

  const handleChange = (value: string, index: number) => {
    if (/^[0-9]$/.test(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      // Move focus to the next input
      if (index < 5) {
        inputs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = () => {
    alert(`Entered Code: ${code.join('')}`);
  };

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

              <button
                onClick={handleSubmit}
                className="w-full bg-emerald-500 text-white py-2 px-4 rounded-md hover:bg-emerald-600 transition duration-200"
              >
                Verify
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

            {/* Added message with a link to resend the email */}
            <p className="text-center text-white">
              <a href="#" className="underline font-semibold hover:text-emerald-300">
                Can't find your code? Click here to resend.
              </a>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
