/* eslint-disable react/prop-types */
import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [workspace, setWorkspace] = useState({});
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [theme, setTheme] = useState("dark");
  const navigate = useNavigate();
  const [copiedLink, setCopiedLink] = useState("");

  useEffect(() => {
    const storedToken = localStorage.getItem("jwtToken");
    const storedUsername = localStorage.getItem("username");
    const storedEmail = localStorage.getItem("email");

    setToken(storedToken);
    setUsername(storedUsername);
    setEmail(storedEmail);

    const protectedRoutes = [ "/dashboard", "/settings"];
    if (!storedToken && protectedRoutes.includes(location.pathname)) {
      navigate("/login");
    }
  }, [navigate, location.pathname]);

  const login = (data) => {
    localStorage.setItem("jwtToken", data.token);
    localStorage.setItem("username", data.username);
    localStorage.setItem("email", data.email);
    setToken(data.token);
    setUsername(data.username);
    setEmail(data.email);
    setWorkspace(data.workspace);
    toast.success("Login Successful");
    setTimeout(() => {
      navigate("/dashboard");
    }, 1000);
  };

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const setCurrentWorkspace = (
    workspaceId,
    canEditThisWorkspace,
    ownerEmail
  ) => {
    setWorkspace({ workspaceId, canEdit: canEditThisWorkspace, ownerEmail });
  };

  const logout = () => {
    localStorage.removeItem("jwtToken");
    setToken(null);
    setTimeout(() => {
      navigate("/login");
    }, 500);
  };

  const setCopyLink = (link) => {
    setCopiedLink(link);
    setTimeout(() => {
      setCopiedLink("");
    }, 3000);
  };

  return (
    <AppContext.Provider
      value={{
        username,
        email,
        token,
        workspace,
        theme,
        login,
        logout,
        copiedLink,
        setCopyLink,
        setCurrentWorkspace,
        toggleTheme,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
