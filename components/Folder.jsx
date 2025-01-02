import { useContext, useEffect, useRef } from "react";
import { useModal } from "../modal/ModalContext";
import styles from "./Folder.module.css";
import DeleteFolderModal from "./DeleteFolderModal";
import { AppContext } from "../context/AppContext";

export default function Folder({ folder, isSelected, onSelect }) {
  const {workspace} = useContext(AppContext)
  const { activeModal, openModal } = useModal();
  const modalRef = useRef(null);

  const handleFolderClick = () => {
    onSelect(folder._id);
  };

  const handleDeleteFolderClick = () => {
    openModal("deleteFolder");
  };


  return (
    <>
      <div className={styles.folderContainer}>
        <button
          className={isSelected ? styles.active : styles.folderButton}
          onClick={handleFolderClick}
        >
          {folder?.folderName}{" "}
          {workspace.canEdit === true && <img
            src="/images/delete.png"
            alt=""
            onClick={handleDeleteFolderClick}
          />}
        </button>
      </div>
      {activeModal === "deleteFolder" && (
        <div className={styles.modal} ref={modalRef}>
          <DeleteFolderModal folder={folder} />
        </div>
      )}
    </>
  );
}
