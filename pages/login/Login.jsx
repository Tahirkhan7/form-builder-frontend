import { useState, useContext } from "react";
import { AppContext } from "../../context/AppContext";
import styles from "./Login.module.css";
import { loginUser } from "../../services/auth";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const { login } = useContext(AppContext);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState({
    email: false,
    password: false,
    loginError: false,
  });

  const errorMessages = {
    email: {
      message: "Email is required",
      isValid: formData.email.length > 0,
      onError: () => {
        setError((error) => ({ ...error, email: true }));
      },
    },
    password: {
      message: "Password is required",
      isValid: formData.password.length > 0,
      onError: () => {
        setError((error) => ({ ...error, password: true }));
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
      const res = await loginUser(formData);

      if (res.status === 200) {
        const data = {
          username: res.data.username,
          email: res.data.email,
          boardId: res.data.boardId,
          token: res.data.token,
          workspace: res.data.workspace
        };
        login(data);
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setError((prevError) => ({
          ...prevError,
          loginError: error.response.data.message,
        }));
      } else {
        setError((prevError) => ({
          ...prevError,
          loginError: "An unexpected error occurred!",
        }));
      }
    }
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.backButton}>
          <span>
            <Link to="/register">
              {" "}
              <img src="/images/arrow_back.png" alt="Back" />
            </Link>
          </span>
        </div>
        <div className={styles.formContainer}>
          <img src="/images/login1.png" alt="Triangle" />
          <form onSubmit={handleSubmit}>
          {error.loginError && (
                <span className={styles.errorMsge}>{error.loginError}</span>
              )}
            <label htmlFor="email" className={` ${error.email ? styles.error : ""}`}>Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              onChange={handleInputChange}
              className={` ${error.email ? styles.error : ""}`}
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
              onChange={handleInputChange}
              className={` ${error.password ? styles.error : ""}`}
            />
            {error.password && (
              <span className={styles.errorMsge}>
                {errorMessages.password.message}
              </span>
            )}
            <button type="submit" className={styles.loginButton}>
              Log In
            </button>
            <div className={styles.or}>OR</div>
            <button type="button" className={styles.googleButton}>
              <img src="/images/google.png" alt="Google Logo" />
              Sign In with Google
            </button>
            <div className={styles.footerText}>
              Don’t have an account? <Link to="/register"> Register now </Link>
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
