import styles from "./Header.module.css";

export default function Header() {
  return (
    <>
      <header className={styles.headerNavMain}>
        <div className={styles.container}>
          <div className={styles.navHeader}>
            <div className={styles.logoSec}>
              <img src="/images/logo.png" alt="Logo" />
              <h2>FormBot</h2>
            </div>
            <div className={styles.navSec}>
              <ul className={styles.navListItems}>
                <li>
                    Sign in
                </li>
                <li>
                    Create a FormBot
                </li>
              </ul>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
