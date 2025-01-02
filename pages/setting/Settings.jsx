import styles from "./Settings.module.css";

const Settings = () => {
  return (
    <div className={styles.formContainer}>
      <h2>Settings</h2>
      <form className={styles.form}>
        <div className={styles.inputGroup}>
          <img
            src="/images/profile.png"
            alt="User Icon"
            className={styles.icon}
          />
          <input
            type="text"
            placeholder="Name"
            className={styles.input}
          />
        </div>

        <div className={styles.inputGroup}>
          <img
            src="/images/lock.png"
            alt="Lock Icon"
            className={styles.icon}
          />
          <input
            type="email"
            placeholder="Update Email"
            className={styles.input}
          />
          <img
            src="/images/eye.png"
            alt="Eye Icon"
            className={styles.iconRight}
          />
        </div>

        <div className={styles.inputGroup}>
          <img
            src="/images/lock.png"
            alt="Lock Icon"
            className={styles.icon}
          />
          <input
            type="password"
            placeholder="Old Password"
            className={styles.input}
          />
          <img
            src="/images/eye.png"
            alt="Eye Icon"
            className={styles.iconRight}
          />
        </div>

        <div className={styles.inputGroup}>
          <img
            src="/images/lock.png"
            alt="Lock Icon"
            className={styles.icon}
          />
          <input
            type="password"
            placeholder="New Password"
            className={styles.input}
          />
          <img
            src="/images/eye.png"
            alt="Eye Icon"
            className={styles.iconRight}
          />
        </div>

        <button type="submit" className={styles.updateButton}>
          Update
        </button>
      </form>
    </div>
  );
};

export default Settings;
