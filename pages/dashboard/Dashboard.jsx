import { useNavigate, useSearchParams } from "react-router-dom";
import HeaderDashboard from "../../components/HeaderDashboard";
import Directory from "../directory/Directory";
import styles from "./Dashboard.module.css";
import { addMemberByCopyLink } from "../../services/workspace";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Dashboard() {
  const { email, theme } = useContext(AppContext);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (email) {
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [email]);

  useEffect(() => {
    if (theme === "dark") {
      document.body.classList.add("dark-theme");
    } else {
      document.body.classList.remove("dark-theme");
    }
  }, [theme]);

  useEffect(() => {
    if (loading) return;

    if (searchParams.size > 0 && email) {
      const invite = searchParams.get("invite");
      const access = searchParams.get("access");

      if (invite && access) {
        const giveAccessToWorkspace = async () => {
          const data = {
            email,
            workspaceId: invite,
            canEdit: access,
          };

          try {
            const res = await addMemberByCopyLink(data);

            if (res.status === 200) {
              toast.success(res.data.message);
              setTimeout(() => {
                navigate("/dashboard");
              }, 1500);
            } else {
              toast.error(res.data.message);
              navigate("/dashboard");
            }
          } catch (error) {
            console.error("An error occurred: ", error);
          }
        };

        giveAccessToWorkspace();
      }
    } else if (!email) {
      navigate("/login");
    }
  }, [searchParams, email, navigate, loading]);

  return (
    <>
      <HeaderDashboard />
      <div className={styles.containerDirectory}>
        <Directory />
      </div>
      <ToastContainer />
    </>
  );
}
