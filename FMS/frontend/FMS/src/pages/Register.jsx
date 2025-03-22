import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/AxiosInstance";
import "bootstrap/dist/css/bootstrap.min.css";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [passportNumber, setPassportNumber] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (
      !firstName ||
      !lastName ||
      !emailId ||
      !passportNumber ||
      !userName ||
      !password
    ) {
      setError("All fields are required.");
      setLoading(false);
      return;
    }

    try {
      const registrationData = {
        firstName,
        lastName,
        emailId,
        passportNumber,
        userName,
        password,
      };
      const response = await registerUser(registrationData);

      if (response.status === 201 || response.status === 200) {
        navigate("/");
      } else {
        setError("Registration failed. Please try again.");
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "An error occurred. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div
        className="card p-4 shadow-lg"
        style={{ maxWidth: "500px", width: "100%" }}
      >
        <h2 className="text-center text-primary fw-bold">Register</h2>

        {error && <div className="alert alert-danger text-center">{error}</div>}

        <form onSubmit={handleRegister}>
          <div className="mb-3">
            <label className="form-label">First Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter your first name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Last Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter your last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Passport Number</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter your passport number"
              value={passportNumber}
              onChange={(e) => setPassportNumber(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter your username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-success w-100"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
