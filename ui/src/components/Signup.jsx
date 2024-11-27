import React, { useState, useEffect } from "react";
import { Mail, Lock, ArrowRight, Eye, EyeOff, User } from "lucide-react";
import { Link } from "react-router-dom";
import "../styles/Signup.css";

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const [isEmailTouched, setIsEmailTouched] = useState(false);
  const [isPasswordTouched, setIsPasswordTouched] = useState(false);
  const [isUsernameTouched, setIsUsernameTouched] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validateEmail = (email) => {
    if (!email) return true;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    if (!password) return true;
    return password.length >= 8;
  };

  const validateUsername = (username) => {
    if (!username) return true;
    return username.length >= 3;
  };

  const getInputFieldClass = (value, isTouched, validateFn) => {
    if (!isTouched || !value) return "";
    return !validateFn(value) ? "invalid" : "";
  };

  useEffect(() => {
    const isValid =
      email &&
      password &&
      username &&
      validateEmail(email) &&
      validatePassword(password) &&
      validateUsername(username);
    setIsFormValid(isValid);
  }, [email, password, username]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      console.log("Form submitted:", { email, password, username });
    }
  };

  return (
    <div className="signup-container">
      <form onSubmit={handleSubmit}>
        <div className="heading">
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "28px",
              marginBottom: "12px",
              color: "white",
              fontWeight: "600",
            }}
          >
            Create an account!
          </p>
          <span
            style={{
              color: "#6b6b6b",
              textAlign: "center",
              fontFamily: "Inter, sans-serif",
            }}
          >
            Sign up to explore the world of AI
          </span>
        </div>
        <div className="input-container">
          <div className="label">Username</div>
          <div
            className={`input-field ${getInputFieldClass(
              username,
              isUsernameTouched,
              validateUsername
            )}`}
          >
            <User size={22} style={{ color: "#6b6b6b" }} />
            <input
              type="text"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onBlur={() => setIsUsernameTouched(true)}
              placeholder="Enter your username"
              required
            />
          </div>
        </div>
        <div className="input-container">
          <div className="label">Email</div>
          <div
            className={`input-field ${getInputFieldClass(
              email,
              isEmailTouched,
              validateEmail
            )}`}
          >
            <Mail size={22} style={{ color: "#6b6b6b" }} />
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => setIsEmailTouched(true)}
              placeholder="Enter your email"
              required
            />
          </div>
        </div>
        <div className="input-container">
          <div className="label">Password</div>
          <div
            className={`input-field ${getInputFieldClass(
              password,
              isPasswordTouched,
              validatePassword
            )}`}
          >
            <Lock size={22} style={{ color: "#6b6b6b" }} />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={() => setIsPasswordTouched(true)}
              placeholder="Enter your password"
              required
            />
            <div
              onClick={togglePasswordVisibility}
              style={{ cursor: "pointer" }}
            >
              {showPassword ? (
                <EyeOff size={22} style={{ color: "#6b6b6b" }} />
              ) : (
                <Eye size={22} style={{ color: "#6b6b6b" }} />
              )}
            </div>
          </div>
        </div>
        <button
          type="submit"
          disabled={!isFormValid}
          style={{
            opacity: isFormValid ? 1 : 0.5,
            cursor: isFormValid ? "pointer" : "not-allowed",
          }}
        >
          Sign up
          <ArrowRight size={22} style={{ color: "#6b6b6b" }} />
        </button>
        <div
          style={{
            marginTop: "24px",
            color: "#6b6b6b",
            fontFamily: "Inter",
          }}
        >
          Already have an account?{" "}
          <Link
            to="/login"
            style={{
              color: "#d4d4d4",
              fontFamily: "Inter",
              fontSize: "16px",
              padding: "2px 4px",
              borderRadius: "6px",
              textDecoration: "none",
              backgroundColor: "#2f2f2f",
            }}
          >
            Login
          </Link>
        </div>
      </form>
    </div>
  );
}