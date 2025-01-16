'use client';

import Head from "next/head";
import { FaRegEnvelope, FaGithub } from "react-icons/fa";
import { MdLockOutline } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useState } from "react";
import axiosInstance from "@/utils/axiosInstance"; 
import { useAuthContext } from "@/context/AuthContext";

export default function LoginPage() {
  const router = useRouter();

  // State để lưu thông tin email và password
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false); 
  const [error, setError] = useState<string | null>(null);
  const { setAuthData } = useAuthContext(); 

  const handleSignIn = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.post("/auth/login", { email, password });

      setAuthData(response.data.accessToken, response.data.user);

      console.log(response)

      router.push("/home");
    } catch (err) {
      setError("Invalid email or password"); 
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-dark-1 text-white">
      <Head>
        <title>Login</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-10 text-center">
        <div className="bg-dark-2 rounded-2xl shadow-xl w-[600px] p-8">
          <div className="text-left font-bold mb-8">
            <span className="text-emerald-500">Meet</span>Ease
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">Sign In</h2>
          <div className="border-2 w-10 border-white inline-block mb-4"></div>
          <div className="flex justify-center gap-4 my-4">
            <a href="#" className="border-2 border-gray-500 rounded-full p-3 hover:border-white">
              <FcGoogle className="text-lg" />
            </a>
            <a href="#" className="border-2 border-gray-500 rounded-full p-3 hover:border-white">
              <FaGithub className="text-lg" />
            </a>
          </div>
          <p className="text-gray-400 my-4">or use your email account</p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center"
          >
            <div className="bg-dark-2 p-3 flex items-center mb-4 rounded border border-gray-500">
              <FaRegEnvelope className="text-gray-400 mx-2" />
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="bg-transparent outline-none text-sm flex-1 text-white"
                value={email}
                onChange={(e) => setEmail(e.target.value)} 
              />
            </div>

            <div className="bg-dark-2 p-3 flex items-center mb-4 rounded border border-gray-500">
              <MdLockOutline className="text-gray-400 mx-2" />
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="bg-transparent outline-none text-sm flex-1 text-white"
                value={password}
                onChange={(e) => setPassword(e.target.value)} 
              />
            </div>

            <div className="flex justify-between w-64 mb-6">
              <label className="flex items-center text-xs">
                <input type="checkbox" name="remember" className="mr-2" />
                Remember me
              </label>
              <a href="#" className="text-xs text-white hover:underline">
                Forgot Password?
              </a>
            </div>

            {/* Hiển thị lỗi nếu có */}
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

            <button
              onClick={handleSignIn}
              className="border-2 text-white rounded-full px-12 py-2 font-semibold hover:bg-dark-3 hover:text-white"
              disabled={loading} // Vô hiệu hóa nút khi đang tải
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </motion.div>

          <div className="mt-6">
            <p className="text-gray-400">
              Don't have an account?{" "}
              <button
                onClick={() => router.push("/signup")}
                className="text-white font-semibold hover:underline"
              >
                Sign Up
              </button>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}