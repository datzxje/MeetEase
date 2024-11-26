"use client";

import { useRouter } from "next/navigation";
import Head from "next/head";
import { FaRegEnvelope } from "react-icons/fa";
import { MdLockOutline } from "react-icons/md";
import { motion } from "framer-motion";

export default function SignUpPage() {
  const router = useRouter();

  const handleSignUp = () => {
    router.push("/verify");
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
                  className="bg-transparent outline-none text-sm flex-1 text-white"
                />
              </div>

              <div className="flex w-80 justify-between mb-4">
                <div className="bg-dark-2 p-3 flex items-center rounded border border-gray-500 w-[48%]">
                  <input
                    type="number"
                    name="birthyear"
                    placeholder="Birth Year"
                    className="bg-transparent outline-none text-sm flex-1 text-white"
                  />
                </div>

                <div className="bg-dark-2 p-3 flex items-center rounded border border-gray-500 w-[48%]">
                  <select
                    name="gender"
                    className="bg-transparent outline-none text-sm flex-1 text-gray-500"
                    defaultValue=""
                  >
                    <option value="" disabled hidden>
                      Gender
                    </option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
              </div>

              <div className="bg-dark-2 p-3 flex items-center mb-4 rounded border border-gray-500 w-80">
                <FaRegEnvelope className="text-gray-400 mx-2" />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="bg-transparent outline-none text-sm flex-1 text-white"
                />
              </div>

              <div className="bg-dark-2 p-3 flex items-center mb-4 rounded border border-gray-500 w-80">
                <MdLockOutline className="text-gray-400 mx-2" />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="bg-transparent outline-none text-sm flex-1 text-white"
                />
              </div>

              <div className="bg-dark-2 p-3 flex items-center mb-4 rounded border border-gray-500 w-80">
                <MdLockOutline className="text-gray-400 mx-2" />
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  className="bg-transparent outline-none text-sm flex-1 text-white"
                />
              </div>

              <button
                onClick={handleSignUp}
                className="border-2 text-white rounded-full px-12 py-2 font-semibold hover:bg-dark-3 hover:text-white w-80"
              >
                Sign Up
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
