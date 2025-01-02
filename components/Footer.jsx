import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <>
      <footer>
        <div className={styles.footerTop}>
          <div className={styles.container}>
            <div className={styles.footerRow}>
              <div className={`${styles.footerCol} ${styles.footerLogoCol}`}>
                <div className={styles.footerLogo}>
                  <img src="/images/logo.png" className={styles.logo} />
                  <h2>FormBot</h2>
                </div>
                <p className={styles.footerText}>Made with ❤️ by @tahir</p>
              </div>
              <div className={`${styles.footerCol2} ${styles.footerLinksCol}`}>
                <h5 className={styles.footerHeading}>Product</h5>
                <ul className={styles.footerLinks}>
                  <li>
                    <div className={styles.link}>
                      <a href="#">Status</a>
                      <img src="/images/link.png" alt="Link" />
                    </div>
                  </li>
                  <li>
                    <div className={styles.link}>
                      <a href="#">Documentation</a>
                      <img src="/images/link.png" alt="Link" />
                    </div>
                  </li>
                  <li>
                    <div className={styles.link}>
                      <a href="#">Roadmap</a>
                      <img src="/images/link.png" alt="Link" />
                    </div>
                  </li>
                  <li>
                    <div className={styles.link}>
                      <a href="#">Pricing</a>
                      <img src="/images/link.png" alt="Link" />
                    </div>
                  </li>
                </ul>
              </div>
              <div className={`${styles.footerCol2} ${styles.footerLinksCol}`}>
                <h5 className={styles.footerHeading}>Community</h5>
                <ul className={styles.footerLinks}>
                  <li>
                  <div className={styles.link}>
                      <a href="#">Discord</a>
                      <img src="/images/link.png" alt="Link" />
                    </div>
                  </li>
                  <li>
                    <a href="#">GitHub repository</a>
                  </li>
                  <li>
                  <div className={styles.link}>
                      <a href="#">Twitter</a>
                      <img src="/images/link.png" alt="Link" />
                    </div>
                  </li>
                  <li>
                  <div className={styles.link}>
                      <a href="#">Linkedin</a>
                      <img src="/images/link.png" alt="Link" />
                    </div>
                  </li>
                  <li>
                    <a href="#">OSS Friends</a>
                  </li>
                </ul>
              </div>
              <div className={`${styles.footerCol2} ${styles.footerLinksCol}`}>
                <h5 className={styles.footerHeading}>Company</h5>
                <ul className={styles.footerLinks}>
                  <li>
                    <a href="#">About</a>
                  </li>
                  <li>
                    <a href="#">Contact</a>
                  </li>
                  <li>
                    <a href="#">Terms of Service</a>
                  </li>
                  <li>
                    <a href="#">Privacy Policy</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
