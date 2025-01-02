import styles from "./Input.module.css";

const Input = ({
  label = "Text",
  fieldType,
  placeholder = "Click here to edit",
  value,
  onChange,
  onDelete,
}) => {
  return (
    <div className={styles.container}>
      <label className={styles.label}>{label}</label>
      <div className={styles.inputWrapper}>
        {fieldType === "bubble" ? (
          <>
            <img
              src={`/images/${
                fieldType === "input" && label === "Text"
                  ? "text_input"
                  : label.charAt(0).toLowerCase() + label.slice(1)
              }.png`}
              alt="Icon"
              className={styles.inputIcon}
            />

            <input
              type="text"
              placeholder={placeholder}
              className={`${styles.input} ${
                fieldType === "bubble" && value === "" ? styles.error : ""
              }`}
              value={fieldType === "bubble" ? value : ""}
              onChange={onChange}
            />
          </>
        ) : (
          <>
            <span className={styles.hint}>
              {`Hint : User will input a ${label} on his form`}
            </span>
          </>
        )}

        <div className={styles.deleteIconWrapper}>
          <img
            src="/images/delete.png"
            alt="Delete"
            className={styles.deleteIcon}
            onClick={onDelete}
          />
        </div>
      </div>

      {fieldType === "bubble" && value === "" && (
        <span className={styles.errorMsge}>Required Field</span>
      )}
    </div>
  );
};

export default Input;
