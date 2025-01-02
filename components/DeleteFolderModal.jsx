import styles from "./DeleteFolderModal.module.css";
import { useContext } from "react";
import { useModal } from "../modal/ModalContext";
import { deleteFolder } from "../services/folder";
import { AppContext } from "../context/AppContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DeleteFolderModal = ({ folder }) => {
  const { email } = useContext(AppContext);
  const { closeModal } = useModal();

  const handleDeleteFolder = async () => {
    const id = folder._id;
    if (id) {
      const data = { id, email };
      const res = await deleteFolder(data);
      if (res.status === 200) {
        toast.success(res.data.message);
        setTimeout(() => closeModal(), 1000);
      }
    }
  };
  return (
    <>
      <div className={styles.overlay}>
        <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
          <h2>Are you sure you want to 
          delete this folder ?</h2>
          <div className={styles.inviteForm}>
            <div className={styles.buttons}>
              <button type="button" onClick={handleDeleteFolder}>Confirm</button>
              <button onClick={closeModal}>Cancel</button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default DeleteFolderModal;
