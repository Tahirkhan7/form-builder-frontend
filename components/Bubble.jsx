import styles from "./Bubble.module.css";

export default function Bubble() {
  return (
    <>
      <div className={styles.folderContainer}>
        <button
          className={isSelected ? styles.active : styles.folderButton}
          onClick={handleFolderClick}
        >
          {folder?.folderName}{" "}
          <img
            src="/images/delete.png"
            alt=""
            onClick={handleDeleteFolderClick}
          />
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
