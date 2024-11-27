import React, { useState, useEffect } from "react";
import { Mail, Lock, ArrowRight, Eye, EyeOff, User } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faGithub } from "@fortawesome/free-brands-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  updateProfile,
} from "firebase/auth";
import { auth } from "../config/firebaseConfig";
import "../styles/auth.css";

export default function Signup() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const [isEmailTouched, setIsEmailTouched] = useState(false);
  const [isPasswordTouched, setIsPasswordTouched] = useState(false);
  const [isUsernameTouched, setIsUsernameTouched] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

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

  const handleEmailSignup = async (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(userCredential.user, {
        displayName: username,
      });
      navigate("/chat");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      navigate("/chat");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleGithubSignup = async () => {
    try {
      const provider = new GithubAuthProvider();
      await signInWithPopup(auth, provider);
      navigate("/chat");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="signup-container">
      <form onSubmit={handleEmailSignup}>
        <div className="heading">
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "28px",
              marginBottom: "8px",
              color: "white",
              fontWeight: "600",
              textAlign: "center",
            }}
          >
            Create your account!
          </p>
          <span
            style={{
              color: "#6b6b6b",
              fontFamily: "Inter, sans-serif",
              textAlign: "center",
            }}
          >
            Sign up to explore the world of AI
          </span>
        </div>
        {error && <div className="error-message">{error}</div>}
        <div className="social-login">
          <button
            type="button"
            className="google-button"
            onClick={handleGoogleSignup}
          >
            <FontAwesomeIcon icon={faGoogle} size="lg" />
            Google
          </button>
          <button
            type="button"
            className="github-button"
            onClick={handleGithubSignup}
          >
            <FontAwesomeIcon icon={faGithub} size="lg" />
            Github
          </button>
        </div>
        <div
          style={{
            width: "95%",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            margin: "20px 0",
          }}
        >
          <hr
            style={{
              flex: 1,
              border: "none",
              borderTop: "1.5px solid #6b6b6b",
            }}
          />
          <span
            style={{
              color: "#6b6b6b",
              fontFamily: "Inter, sans-serif",
              fontSize: "14px",
              whiteSpace: "nowrap",
              padding: "0 10px",
            }}
          >
            OR CONTINUE WITH
          </span>
          <hr
            style={{
              flex: 1,
              border: "none",
              borderTop: "1.5px solid #6b6b6b",
            }}
          />
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
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onBlur={() => setIsUsernameTouched(true)}
              placeholder="John Doe"
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
        <button type="submit" disabled={!isFormValid}>
          Sign up
          <ArrowRight
            size={22}
            style={{ color: isFormValid ? "#171717" : "#6b6b6b" }}
          />
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
