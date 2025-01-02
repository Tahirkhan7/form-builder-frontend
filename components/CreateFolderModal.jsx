import { useState } from "react";
import { useModal } from "../modal/ModalContext";
import { createFolder } from "../services/folder";
import styles from "./CreateFolderModal.module.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateFolderModal = ({ email }) => {
  const { closeModal } = useModal();

  const [formData, setFormData] = useState({
    email: email,
    folderName: "",
  });

  const [error, setError] = useState({
    email: false,
    folderName: false,
    folderCreateError: false,
  });

  const errorMessages = {
    folderName: {
      message: "Folder name is required!",
      isValid: formData.folderName.length > 0,
      onError: () => {
        setError((error) => ({ ...error, folderName: true }));
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
      const res = await createFolder(formData);

      if (res.status === 201) {
        toast.success(res.data.message);
        setTimeout(() => {
          closeModal();
        }, 1000);
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setError((prevError) => ({
          ...prevError,
          folderCreateError: error.response.data.message,
        }));
      } else {
        setError((prevError) => ({
          ...prevError,
          folderCreateError: "An unexpected error occurred!",
        }));
      }
    }
  }

  return (
    <>
      <div className={styles.overlay}>
        <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
          <p>Create New Folder</p>
          <form className={styles.inviteForm} onSubmit={handleSubmit}>
            {error.folderCreateError && (
              <span className={styles.errorMsge}>{error.folderCreateError}</span>
            )}
            <input type="hidden" name="email" value={email} />
            <div className={styles.field}>
              <input
                type="text"
                name="folderName"
                placeholder="Enter folder name"
                onChange={handleInputChange}
                className={`${error.folderName ? styles.error : ""}`}
              />
            </div>
            {error.folderName && (
              <span className={styles.errorMsge}>
                {errorMessages.folderName.message}
              </span>
            )}
            <div className={styles.buttons}>
              <button type="submit">Done</button>
              <button onClick={closeModal}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default CreateFolderModal;
