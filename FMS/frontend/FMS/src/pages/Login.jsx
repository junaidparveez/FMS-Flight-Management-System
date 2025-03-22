import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/AxiosInstance";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!username || !password) {
      setError("Username and password are required.");
      setLoading(false);
      return;
    }

    try {
      const response = await loginUser(username, password);
      if (response.status === 200) {
        navigate("/home");
      } else {
        setError("Invalid username or password");
      }
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.message || "Invalid username or password");
      } else {
        setError("An error occurred. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card shadow p-4" style={{ width: "22rem" }}>
      <h2 className="text-center mb-4">Login</h2>

      {error && <div className="alert alert-danger text-center">{error}</div>}

      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username or Email:
          </label>
          <input
            type="text"
            className="form-control"
            id="username"
            placeholder="Enter your username or email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password:
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
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

      <button
        className="btn btn-link w-100 mt-3"
        onClick={() => navigate("/register")}
      >
        Register
      </button>
    </div>
  );
};

export default Login;
