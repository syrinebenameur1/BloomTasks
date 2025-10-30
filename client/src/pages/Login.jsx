import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../api/api";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const { login } = useContext(AuthContext);
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await api.post("/auth/login", form);
      login(res.data.user, res.data.token);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100 relative overflow-hidden">
      {/* Floral Background Elements */}
      <div className="absolute inset-0 opacity-10">
      <div className="absolute top-10 left-10 text-7xl">🌸</div>
  <div className="absolute top-5 right-32 text-5xl">🌺</div>
  <div className="absolute top-32 right-10 text-6xl">🌷</div>
  <div className="absolute bottom-32 left-20 text-5xl">💮</div>
  <div className="absolute bottom-10 right-20 text-7xl">🏵️</div>
  <div className="absolute bottom-20 left-1/4 text-4xl">🌹</div>
  <div className="absolute top-1/3 right-1/3 text-6xl">🌼</div>
  <div className="absolute top-2/3 left-1/3 text-5xl">🪷</div>
  <div className="absolute top-10 left-1/2 text-4xl">🌻</div>
  <div className="absolute bottom-40 right-1/4 text-6xl">🥀</div>


  
        
      </div>

      <div className="relative w-full max-w-md px-6">
        {/* Premium Card */}
        <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl shadow-pink-200/50 border border-white/20 p-8 space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-rose-500 rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-2xl text-white">🌸</span>
              </div>
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
              Welcome Back
            </h2>
            <p className="text-gray-600 text-sm">Sign in to your account</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-rose-50 border border-rose-200 rounded-xl p-4">
              <p className="text-rose-600 text-sm text-center">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <input
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200"
                  value={form.password}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <button
  type="submit"
  disabled={loading}
  className="w-full bg-[#00b4d8] text-white py-3 rounded-xl font-semibold shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:bg-[#0099c3] transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:transform-none"
>
  {loading ? (
    <div className="flex items-center justify-center">
      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
      Signing in...
    </div>
  ) : (
    "Sign In"
  )}
</button>
          </form>

          {/* Footer */}
          <div className="text-center">
            <p className="text-gray-600 text-sm">
              Don't have an account?{" "}
              <Link to="/register" className="text-pink-600 font-semibold hover:text-rose-600 transition-colors">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}