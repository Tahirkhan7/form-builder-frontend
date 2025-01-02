import { useContext, useEffect, useRef, useState } from "react";
import styles from "./Form.module.css";
import { AppContext } from "../context/AppContext";
import { getAllForms, getFormsByFolder } from "../services/form";
import { useModal } from "../modal/ModalContext";
import DeleteFormModal from "./DeleteFormModal";
import { Link } from "react-router-dom";

export default function FormButton({ selectedFolder }) {
  const { email, workspace } = useContext(AppContext);
  const [forms, setForms] = useState([]);
  const { activeModal, openModal } = useModal();
  const modalRef = useRef(null);

  useEffect(() => {
    const fetchForms = async () => {
      try {
        if (email && workspace.ownerEmail) {
          const res =
            selectedFolder === null
              ? await getAllForms(workspace.ownerEmail === email ? email : workspace.ownerEmail)
              : await getFormsByFolder(workspace.ownerEmail === email ? email : workspace.ownerEmail, selectedFolder);
          if (res.status === 200) {
            setForms(res.data);
          }
        }
      } catch (error) {
        console.error("Failed to fetch user details:", error);
      }
    };

    fetchForms();
  }, [email, workspace.ownerEmail, selectedFolder]);
  // console.log(workspace)

  const handleDeleteFolderClick = () => {
    openModal("deleteForm");
  };

  return (
    <>
      {forms.length > 0 &&
        forms.map((form) => (
          <div key={form._id} className={styles.formContainer}>
            
             <button className={styles.form}>
             { workspace.canEdit === true &&  <img
                src="/images/delete.png"
                alt="Delete"
                className={styles.deleteIcon}
                onClick={handleDeleteFolderClick}
              />}
              <Link to={`/responses/${form._id}`}>{form.formName}</Link>
            </button> 
            {activeModal === "deleteForm" && (
              <div className={styles.modal} ref={modalRef}>
                <DeleteFormModal form={form} />
              </div>
            )}
          
          </div>
        ))}
    </>
  );
}
