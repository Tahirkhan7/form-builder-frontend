import { useContext, useState } from "react";
import { useModal } from "../modal/ModalContext";
import styles from "./InviteModal.module.css";
import { AppContext } from "../context/AppContext";
import { userExists } from "../services/auth";
import { addUserToWorkspace } from "../services/workspace";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const InviteModal = () => {
  const { closeModal } = useModal();
  const { email, workspace } = useContext(AppContext);
  const [formData, setFormData] = useState({
    ownerEmail: email,
    email: "",
    canEdit: "1",
  });
  const [error, setError] = useState({
    ownerEmail: false,
    email: false,
    canEdit: false,
    error: false,
  });

  const errorMessages = {
    ownerEmail: {
      message: "User Invite Email is required!",
      isValid: formData.ownerEmail.length > 0,
      onError: () => {
        setError((error) => ({ ...error, ownerEmail: true }));
      },
    },
    email: {
      message: "Email is required",
      isValid: formData.email.length > 0,
      onError: () => {
        setError((error) => ({ ...error, email: true }));
      },
    },
    canEdit: {
      message: "User Access(Edit/View) is required!",
      isValid: formData.canEdit.length > 0,
      onError: () => {
        setError((error) => ({ ...error, canEdit: true }));
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

  async function handleInvite(event) {
    event.preventDefault();
    if (!validateForm()) return;

    try {
      const res = await userExists(formData.email);

      if (res.status === 200) {
        try {
          const result = await addUserToWorkspace(formData);
          if (result.status === 200) {
            toast.success(result.data.message);
            setTimeout(() => {
              closeModal();
            }, 1000);
          } else {
            toast.error(result.data.message);
            setTimeout(() => {
              closeModal();
            }, 1000);
          }
        } catch (err) {
          if (err.response && err.response.status === 400) {
            setError((prevError) => ({
              ...prevError,
              error: err.response.data.message,
            }));
          } else {
            setError((prevError) => ({
              ...prevError,
              error: "An unexpected error occurred!",
            }));
          }
        }
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setError((prevError) => ({
          ...prevError,
          error: error.response.data.message,
        }));
      } else {
        setError((prevError) => ({
          ...prevError,
          error: "An unexpected error occurred!",
        }));
      }
    }
  }
  const handleCopyInviteLink = async () => {
    const linkToShare = `http://localhost:5173/dashboard?invite=${workspace.workspaceId}&access=${formData.canEdit}`;
    try {
      await navigator.clipboard.writeText(linkToShare);
      toast.success("Link copied")
    } catch (error) {
      console.error("Failed to copy: ", error);
    }
  };

  return (
    <>
      <div className={styles.overlay}>
        <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
          <p onClick={closeModal}>x</p>
          <form className={styles.inviteForm}>
            {error.error && (
              <span className={styles.errorMsge}>{error.error}</span>
            )}
            <div className={styles.control}>
              <span className={styles.headings}>Invite by Email</span>
              <select
                name="canEdit"
                className={styles.accessType}
                value={formData.canEdit}
                onChange={handleInputChange}
              >
                <option value="1">Edit</option>
                <option value="0">View</option>
              </select>
            </div>
            {error.canEdit && (
              <span className={styles.errorMsge}>
                {errorMessages.canEdit.message}
              </span>
            )}
            <div className={styles.field}>
              <input
                type="email"
                name="email"
                placeholder="Enter email id"
                value={formData.email}
                onChange={handleInputChange}
                className={` ${error.email ? styles.error : ""}`}
              />
            </div>
            {error.email && (
              <span className={styles.errorMsge}>
                {errorMessages.email.message}
              </span>
            )}
            <button
              type="button"
              className={styles.inviteButton}
              onClick={handleInvite}
            >
              Send Invite
            </button>
          </form>

          <span className={styles.headings}> Invite by link</span>
          <button className={styles.inviteButton} onClick={handleCopyInviteLink}>Copy link</button>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default InviteModal;
