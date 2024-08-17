"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

function LoginPage() {
  const [user, setUser] = useState({
    email: "",
    password: "",
 });

  const [buttonDisabled, setButtonDisabled] = useState(false);

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log("login success: ", response.data.message);
      toast.success('Successfully toasted!')
      router.push("/profile"); //here home router is same only postfix route change
    } catch (error: any) {
      console.log("login failed");
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0
    ){
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-3 py-2">
      <h1 className="text-4xl font-semibold">
        {loading ? "Processing" : "Login"}
      </h1>
       
       <div className="flex flex-col">
        <label htmlFor="email">Email</label>
        <input
          className="text-black p-2 rounded-lg"
          type="email"
          id="email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder="email"
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="password">Password</label>
        <input
          className="text-black p-2 rounded-lg"
          type="text"
          id="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder="password"
        />
      </div>
      <button
        className={`p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none ${buttonDisabled ? "cursor-not-allowed" : "cursor-pointer"} focus:border-gray-600`}
        onClick={onLogin}
        
      >
        {buttonDisabled ? "No Login" : "Login"}
      </button>
      <Link href="/signup">Visit signup page</Link>
    </div>
  );
}

export default LoginPage;
