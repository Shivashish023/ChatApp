import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAuthUser } from "../redux/userSlicer.js";
import { BASE_URL } from "../main.jsx";
import { HiOutlineMail, HiOutlineLockClosed } from "react-icons/hi";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        `${BASE_URL}/api/user/login`,
        user,
        { withCredentials: true }
      );
      if (response.data.success) {
        navigate("/home");
        dispatch(setAuthUser(response.data));
      }
    } catch (error) {
      const message = error?.response?.data?.message || error?.message || "Something went wrong";
      toast.error(message);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-shell">
      <div className="auth-card">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-chap-500 to-indigo-600 text-2xl font-bold text-white shadow-lg">
            C
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Welcome back</h1>
          <p className="mt-1 text-sm text-slate-500">Sign in to continue to CHAP</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-slate-700">
              Email
            </label>
            <div className="auth-input-group">
              <HiOutlineMail className="h-5 w-5 shrink-0 text-slate-400" />
              <input
                type="email"
                id="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                autoComplete="email"
                className="min-w-0 flex-1 bg-transparent text-slate-800 placeholder:text-slate-400 focus:outline-none"
                placeholder="you@example.com"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-slate-700">
              Password
            </label>
            <div className="auth-input-group">
              <HiOutlineLockClosed className="h-5 w-5 shrink-0 text-slate-400" />
              <input
                type="password"
                id="password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                className="min-w-0 flex-1 bg-transparent text-slate-800 placeholder:text-slate-400 focus:outline-none"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <button type="submit" disabled={loading} className="btn-primary mt-2">
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-500">
          Don&apos;t have an account?{" "}
          <Link to="/register" className="font-semibold text-chap-600 hover:text-chap-500 hover:underline">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
