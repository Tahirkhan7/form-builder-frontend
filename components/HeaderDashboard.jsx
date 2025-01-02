import { Link } from "react-router-dom";
import styles from "./HeaderDashboard.module.css";
import { useModal } from "../modal/ModalContext";
import { useContext, useEffect, useState } from "react";
import InviteModal from "./InviteModal";
import { AppContext } from "../context/AppContext";
import { getAllMyWorkspaces } from "../services/workspace";

export default function HeaderDashboard({
  formName,
  isCreating,
  setFormName,
  onSave,
}) {
  const { activeModal, openModal } = useModal();
  const { email, setCurrentWorkspace, theme, toggleTheme } =
    useContext(AppContext);
  const [workspaces, setWorkspaces] = useState([]);

  useEffect(() => {
    if (theme === "dark") {
      document.body.classList.add("dark-theme");
    } else {
      document.body.classList.remove("dark-theme");
    }
  }, [theme]);

  useEffect(() => {
    const fetchForms = async () => {
      try {
        if (email) {
          const res = await getAllMyWorkspaces(email);
          if (res.status === 200) {
            const mainWorkspace = res.data.workspaces.filter(
              (workspace) => workspace.ownerEmail === email
            );
            setWorkspaces(res.data.workspaces);
            setCurrentWorkspace(
              mainWorkspace[0].id,
              mainWorkspace[0].canEdit,
              mainWorkspace[0].ownerEmail
            );
          }
        }
      } catch (error) {
        console.error("Failed to fetch user details:", error);
      }
    };

    fetchForms();
  }, [email]);

  const handleShareButtonClick = () => {
    openModal("inviteModal");
  };

  const handleWorkspaceChange = (event) => {
    const selectedWorkspaceId = event.target.value;
    const selectedCanEdit =
      event.target.options[event.target.selectedIndex].dataset.canedit;
    const selectedOwnerEmail =
      event.target.options[event.target.selectedIndex].dataset.owneremail;
    setCurrentWorkspace(
      selectedWorkspaceId,
      selectedCanEdit,
      selectedOwnerEmail
    );
  };

  return (
    <>
      <header className={styles.headerNavMain}>
        <div className={styles.container}>
          <div className={styles.navHeader}>
            <ul className={styles.navListItems}>
              {isCreating ? (
                <li>
                  <input
                    type="text"
                    placeholder="Enter Form Name"
                    className={styles.formName}
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                  />
                </li>
              ) : (
                <li></li>
              )}
              {isCreating ? (
                <li className={styles.navEditLinks}>
                  <a href="#.">Flow</a>
                  <a href="#.">Response</a>
                </li>
              ) : (
                <li>
                  <select
                    name="workspace"
                    id="workspace"
                    className={styles.workspace}
                    onChange={handleWorkspaceChange}
                  >
                    {workspaces.map((workspace) => (
                      <option
                        key={workspace.id}
                        value={workspace.id}
                        data-canEdit={workspace.canEdit}
                        data-ownerEmail={workspace.ownerEmail}
                        selected={workspace.ownerEmail === email}
                      >
                        {workspace.workspaceName}
                      </option>
                    ))}
                  </select>
                </li>
              )}
              <li className={styles.rightBtns}>
                <span className={styles.theme}>
                  <p>Light</p>
                  <label className={styles.themeSwitch}>
                    <input
                      type="checkbox"
                      onChange={toggleTheme}
                      checked={theme === "dark"}
                    />
                    <span className={`${styles.slider} ${styles.round}`}></span>
                  </label>
                  <p>Dark</p>
                </span>

                <button
                  className={styles.shareBtn}
                  onClick={handleShareButtonClick}
                >
                  Share
                </button>
                {isCreating && (
                  <>
                    <button className={styles.saveBtn} onClick={onSave}>
                      Save
                    </button>
                    <Link to="/dashboard">
                      <p className={styles.cancelButton}> X</p>
                    </Link>
                  </>
                )}
              </li>
            </ul>
          </div>
        </div>
        <hr
          style={{
            backgroundColor: "rgba(255, 255, 255, .12)",
            height: "2px",
            border: "none",
          }}
        />
      </header>
      {activeModal === "inviteModal" && <InviteModal />}
    </>
  );
}
