"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Head from "next/head";
import { FaRegEnvelope } from "react-icons/fa";
import { MdLockOutline } from "react-icons/md";
import { motion } from "framer-motion";
import axiosInstance from "@/utils/axiosInstance";
import { useSignUpContext } from "@/context/SignUpContext";

export default function SignUpPage() {
  const router = useRouter();
  const { setSignUpData } = useSignUpContext();
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
    birthyear: "",
    gender: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "birthyear" ? parseInt(value, 10) : value, 
    }));
  };

  const handleSignUp = async () => {
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    const signUpRequest = {
      fullname: formData.fullname,
      email: formData.email,
      password: formData.password,
      yearOfBirth: +formData.birthyear,
    };

    try {
      setIsLoading(true);
      setErrorMessage(""); // Clear previous errors
      // Call the sign-up API
      await axiosInstance.post("/user/signup", signUpRequest, { withCredentials: true });
      setSignUpData(signUpRequest);
      router.push(`/verify`);
    } catch (error: any) {
      setErrorMessage(error?.response?.data?.message || "Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-dark-1 text-white">
      <Head>
        <title>Sign Up</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-10 text-center">
        <div className="bg-dark-2 rounded-2xl shadow-xl w-[600px] p-8">
          <div className="text-left font-bold mb-8">
            <span className="text-emerald-500">Meet</span>Ease
          </div>
          <div>
            <h2 className="text-3xl font-bold text-white mb-4">Sign Up</h2>
            <div className="border-2 w-10 border-white inline-block mb-4"></div>
            <p className="text-gray-400 my-4">Use your email account</p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center"
            >
              <div className="bg-dark-2 p-3 flex items-center mb-4 rounded border border-gray-500 w-80">
                <input
                  type="text"
                  name="fullname"
                  placeholder="Full Name"
                  value={formData.fullname}
                  onChange={handleInputChange}
                  className="bg-transparent outline-none text-sm flex-1 text-white"
                />
              </div>

              <div className="flex w-80 justify-between mb-4">
                <div className="bg-dark-2 p-3 flex items-center rounded border border-gray-500 w-[48%]">
                  <input
                    type="number"
                    name="birthyear"
                    placeholder="Birth Year"
                    value={formData.birthyear}
                    onChange={handleInputChange}
                    className="bg-transparent outline-none text-sm flex-1 text-white"
                  />
                </div>

                <div className="bg-dark-2 p-3 flex items-center rounded border border-gray-500 w-[48%]">
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className="bg-transparent outline-none text-sm flex-1 text-gray-500"
                  >
                    <option value="" disabled hidden>
                      Gender
                    </option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div className="bg-dark-2 p-3 flex items-center mb-4 rounded border border-gray-500 w-80">
                <FaRegEnvelope className="text-gray-400 mx-2" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email"
                  className="bg-transparent outline-none text-sm flex-1 text-white"
                />
              </div>

              <div className="bg-dark-2 p-3 flex items-center mb-4 rounded border border-gray-500 w-80">
                <MdLockOutline className="text-gray-400 mx-2" />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Password"
                  className="bg-transparent outline-none text-sm flex-1 text-white"
                />
              </div>

              <div className="bg-dark-2 p-3 flex items-center mb-4 rounded border border-gray-500 w-80">
                <MdLockOutline className="text-gray-400 mx-2" />
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Confirm Password"
                  className="bg-transparent outline-none text-sm flex-1 text-white"
                />
              </div>

              {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}

              <button
                onClick={handleSignUp}
                className="border-2 text-white rounded-full px-12 py-2 font-semibold hover:bg-dark-3 hover:text-white w-80"
                disabled={isLoading}
              >
                {isLoading ? "Signing Up..." : "Sign Up"}
              </button>
            </motion.div>

            <div className="mt-6">
              <p className="text-gray-400">
                Already have an account?{" "}
                <button
                  onClick={() => router.push("/login")}
                  className="text-white hover:underline"
                >
                  Login
                </button>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}