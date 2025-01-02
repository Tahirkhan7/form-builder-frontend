import styles from "./Register.module.css";
import { useState } from "react";
import { register } from "../../services/auth";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState({
    username: false,
    email: false,
    password: false,
    confirmPassword: false,
    registerError: false,
  });

  const errorMessages = {
    username: {
      message: "Username is required",
      isValid: formData.username.length > 0,
      onError: () => {
        setError((error) => ({ ...error, username: true }));
      },
    },
    email: {
      message: "Email is required and should be a valid!",
      isValid: formData.email.length > 0,
      onError: () => {
        setError((error) => ({ ...error, email: true }));
      },
    },
    password: {
      message: "Password is required and must be at least 8 characters long!",
      isValid: formData.password.length >= 8 && formData.password.length > 0,
      onError: () => {
        setError((error) => ({ ...error, password: true }));
      },
    },
    confirmPassword: {
      message: "Passwords do not match",
      isValid:  formData.confirmPassword === formData.password,
      onError: () => {
        setError((error) => ({ ...error, confirmPassword: true }));
      },
    },
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setError((prevError) => ({ ...prevError, [name]: false }));
  };

  const validateForm = () => {
    let valid = true;
    Object.keys(errorMessages).forEach((field) => {
      if (!errorMessages[field].isValid) {
        errorMessages[field].onError();
        valid = false;
      }
    });
    return valid;
  };

  async function handleSubmit(event) {
    event.preventDefault();
    if (!validateForm()) return;

    try {
      console.log(formData);
      const res = await register(formData);
      if (res.status === 201) {
        toast.success(res.data.message);
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setError((prevError) => ({
          ...prevError,
          registerError: error.response.data.message,
        }));
      } else {
        setError((prevError) => ({
          ...prevError,
          registerError: "An unexpected error occurred!",
        }));
      }
    }
  }
  return (
    <>
      <div className={styles.container}>
        <div className={styles.backButton}>
          <span>
            <Link to="/login">
              {" "}
              <img src="/images/arrow_back.png" alt="Back" />
            </Link>
          </span>
        </div>
        <div className={styles.formContainer}>
          <img src="/images/login1.png" alt="Triangle" />
          <form onSubmit={handleSubmit}>
            {error.registerError && (
              <span className={styles.errorMsge}>{error.registerError}</span>
            )}
            <label htmlFor="username" className={` ${error.username ? styles.error : ""}`}>Username</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter a username"
              className={` ${error.username ? styles.error : ""}`}
              onChange={handleInputChange}
            />
            {error.username && (
              <span className={styles.errorMsge}>
                {errorMessages.username.message}
              </span>
            )}
            <label htmlFor="email" className={` ${error.email ? styles.error : ""}`}>Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              className={` ${error.email ? styles.error : ""}`}
              onChange={handleInputChange}
            />
            {error.email && (
              <span className={styles.errorMsge}>
                {errorMessages.email.message}
              </span>
            )}
            <label htmlFor="password" className={` ${error.password ? styles.error : ""}`}>Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="********"
              className={` ${error.password ? styles.error : ""}`}
              onChange={handleInputChange}
            />
            {error.password && (
              <span className={styles.errorMsge}>
                {errorMessages.password.message}
              </span>
            )}
            <label
              htmlFor="confirmPassword"
              className={` ${error.confirmPassword ? styles.error : ""}`}
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="********"
              className={` ${error.confirmPassword ? styles.error : ""}`}
              onChange={handleInputChange}
            />
            {error.confirmPassword && (
              <span className={styles.errorMsge}>
                {errorMessages.confirmPassword.message}
              </span>
            )}
            <button type="submit" className={styles.loginButton}>
              Sign Up
            </button>
            <div className={styles.or}>OR</div>
            <button type="button" className={styles.googleButton}>
              <img src="/images/google.png" alt="Google Logo" />
              Sign Up with Google
            </button>
            <div className={styles.footerText}>
              Already have an account? <Link to="/login"> Login </Link>
            </div>
          </form>
          <img src="/images/login2.png" alt="Eclipse" />
        </div>
        <img
          className={styles.footerImage}
          src="/images/login3.png"
          alt="Eclipse"
        />
      </div>
      <ToastContainer />
    </>
  );
}
