import React, { useState, useEffect } from "react";
import { Mail, Lock, ArrowRight, Eye, EyeOff } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faGithub } from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";
import "../styles/auth.css";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const [isEmailTouched, setIsEmailTouched] = useState(false);
  const [isPasswordTouched, setIsPasswordTouched] = useState(false);

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

  const getInputFieldClass = (value, isTouched, validateFn) => {
    if (!isTouched || !value) return "";
    return !validateFn(value) ? "invalid" : "";
  };

  useEffect(() => {
    const isValid =
      email && password && validateEmail(email) && validatePassword(password);
    setIsFormValid(isValid);
  }, [email, password]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      console.log("Form submitted:", { email, password });
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <div className="heading">
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "28px",
              marginBottom: "8px",
              color: "white",
              fontWeight: "600",
              textAlign: "center"
            }}
          >
            Welcome back explorer!
          </p>
          <span
            style={{
              color: "#6b6b6b",
              textAlign: "center",
              fontFamily: "Inter, sans-serif",
            }}
          >
            Login to enter the world of AI
          </span>
        </div>
        <div className="social-login">
          <button type="button" className="google-button">
            <FontAwesomeIcon icon={faGoogle} size="lg" />
            Google
          </button>
          <button type="button" className="github-button">
            <FontAwesomeIcon icon={faGithub} size="lg" />
            Github
          </button>
        </div>
        <div style={{ 
          width: "95%",
          display: "flex",
          alignItems: "center",
          gap: "10px",
          margin: "20px 0"
        }}>
          <hr style={{ 
            flex: 1,
            border: "none",
            borderTop: "1.5px solid #6b6b6b"
          }} />
          <span style={{ 
            color: "#6b6b6b", 
            fontFamily: "Inter, sans-serif",
            fontSize: "14px",
            whiteSpace: "nowrap",
            padding: "0 10px"
          }}>
            OR CONTINUE WITH
          </span>
          <hr style={{ 
            flex: 1,
            border: "none",
            borderTop: "1.5px solid #6b6b6b"
          }}/>
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
              placeholder="name@example.com"
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
              placeholder=""
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
          Login
          <ArrowRight size={22} style={{ color: "#6b6b6b" }} />
        </button>
        <div
          style={{
            marginTop: "24px",
            color: "#6b6b6b",
            fontFamily: "Inter",
          }}
        >
          Don't have an account?{" "}
          <Link
            to="/signup"
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
            Sign up
          </Link>
        </div>
      </form>
    </div>
  );
}
