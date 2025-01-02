import { useContext, useRef, useEffect, useState } from "react";
import CreateFolderModal from "../../components/CreateFolderModal";
import Folder from "../../components/Folder";
import Form from "../../components/Form";
import { useModal } from "../../modal/ModalContext";
import { getAllFolders } from "../../services/folder";
import styles from "./Directory.module.css";
import { AppContext } from "../../context/AppContext";
import { Link } from "react-router-dom";

export default function Directory() {
  const { activeModal, openModal, closeModal } = useModal();
  const modalRef = useRef(null);
  const { email, workspace } = useContext(AppContext);
  const [folders, setFolders] = useState([]);
  const [selectedFolder, setSelectedFolder] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (email && workspace.ownerEmail) {
          const result = await getAllFolders(workspace.ownerEmail);
          if (result.status === 200) setFolders(result.data);
        }
      } catch (error) {
        console.error("Failed to fetch user details:", error);
      }
    };

    fetchData();
  }, [email, workspace.ownerEmail, workspace.canEdit]);

  const handleCreateFolderClick = () => {
    openModal("createFolder");
  };

  const handleFolderSelection = (folderId) => {
    setSelectedFolder(selectedFolder === folderId ? null : folderId);
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.createFolderButtonContainer}>
          <button
            className={styles.createFolderButton}
            onClick={handleCreateFolderClick}
          >
            <img src="/images/directory.png" alt="" /> Create a folder
          </button>
        </div>
        {folders.length > 0 ? (
          folders.map((folder) => (
            <Folder
              key={folder._id}
              folder={folder}
              isSelected={selectedFolder === folder._id}
              onSelect={handleFolderSelection}
            />
          ))
        ) : (
          <div></div>
        )}
      </div>
      <div className={styles.typebotsContainer}>
        <div className={styles.createFormContainer}>
          <Link
            to={`${
              selectedFolder ? "/create-form/" + selectedFolder : `/create-form`
            } `}
          >
            <button className={styles.createFormButton}>
              <img src="/images/plus.png" alt="" /> Create a typebot
            </button>
          </Link>
        </div>
        <Form selectedFolder={selectedFolder} />
        {activeModal === "createFolder" && (
          <div className={styles.modal} ref={modalRef}>
            <CreateFolderModal email={email} />
            <button onClick={closeModal}>Close Modal</button>
          </div>
        )}
      </div>
    </>
  );
}
