// src/features/auth/pages/LoginPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../common/context/AuthContext";
import { useNotification } from "../../../common/components/NotificationProvider";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/login.css";

const LoginPage = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const { addNotification } = useNotification();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userName || !password) {
      addNotification("Username and password are required.");
      return;
    }
    setLoading(true);
    try {
      // Assuming login returns user or throws on failure
      await login({ userName, password });
      navigate("/"); // or "/home" as per routes
    } catch (err) {
      // Extract message if provided by API, else generic
      const msg =
        err.response?.data?.message ||
        err.message ||
        "Invalid username or password";
      addNotification(msg);
    } finally {
      setLoading(false);
    }
  };

  //   return (
  //     <div className="flex items-center justify-center min-h-screen bg-gray-100">
  //       <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
  //         <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>

  //         <form onSubmit={handleSubmit} className="space-y-4">
  //           <div className="mb-3">
  //             <label htmlFor="username" className="form-label">
  //               Username or Email:
  //             </label>
  //             <input
  //               type="text"
  //               className="form-control"
  //               id="username"
  //               placeholder="Enter your username or email"
  //               value={userName}
  //               onChange={(e) => setUserName(e.target.value)}
  //               required
  //             />
  //           </div>

  //           <div className="mb-3">
  //             <label htmlFor="password" className="form-label">
  //               Password:
  //             </label>
  //             <input
  //               type="password"
  //               className="form-control"
  //               id="password"
  //               placeholder="Enter your password"
  //               value={password}
  //               onChange={(e) => setPassword(e.target.value)}
  //               required
  //             />
  //           </div>

  //           <button
  //             type="submit"
  //             className="btn btn-primary w-100"
  //             disabled={loading}
  //           >
  //             {loading ? "Logging in..." : "Login"}
  //           </button>
  //         </form>

  //         <div className="mt-4 text-center">
  //           <button
  //             className="btn btn-link w-100 mt-3"
  //             onClick={() => navigate("/register")}
  //           >
  //             Don’t have an account? Register
  //           </button>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // };

  // export default LoginPage;
  return (
    // Use Bootstrap flex utilities to center
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div
        className="card shadow rounded-3 p-4"
        style={{ maxWidth: "400px", width: "100%" }}
      >
        <h2 className="card-title text-center mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username:
            </label>
            <input
              type="text"
              id="username"
              className="form-control"
              placeholder="Enter your username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password:
            </label>
            <input
              type="password"
              id="password"
              className="form-control"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <div className="text-center mt-3">
          <button
            className="btn btn-link"
            onClick={() => navigate("/register")}
          >
            Don’t have an account? Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
