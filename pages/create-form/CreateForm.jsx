import { useState } from "react";
import { useParams } from 'react-router-dom';
import FormButtons from "../../components/FormButtons";
import HeaderDashboard from "../../components/HeaderDashboard";
import styles from "./CreateForm.module.css";

export default function CreateForm() {
  const { folderId } = useParams();
  const [formName, setFormName] = useState("");
  const [isSave, setIsSave] = useState(false);

  const handleSave = () => {
    setIsSave(true);
  };

  const resetSave = () => {
    setIsSave(false);
  };

  const isCreating = folderId ? folderId: !folderId;

  return (
    <>
      <HeaderDashboard formName={formName} isCreating={isCreating} setFormName={setFormName} onSave={handleSave} />
      <div className={styles.containerCreateForm}>
        <FormButtons formName={formName} isSave={isSave} resetSave={resetSave} folderId={folderId ? folderId : null} />
      </div>
    </>
  );
}
