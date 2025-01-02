import Footer from "../../components/Footer";
import Header from "../../components/Header";
import styles from "./Homepage.module.css";

export default function Homepage() {
  return (
    <>
      <Header />
      <section className={styles.container}>
        <div className={styles.heroSection}>
          <div className={styles.topSection}>
            <img src="/images/homepage1.png" alt="Chatbot Builder" />
            <div className={styles.texts}>
              <h1>Build advanced chatbots visually</h1>
              <p>
                Typebot gives you powerful blocks to create unique chat
                experiences. Embed them anywhere on your web/mobile apps and
                start collecting results like magic.
              </p>
              <button className={styles.ctaButton}>
                Create a FormBot for free
              </button>
            </div>
            <img src="/images/homepage2.png" alt="Chatbot Builder" />
          </div>
        </div>
        <div className={styles.imageSection}>
          <img src="/images/homepage3.png" alt="Chatbot Builder" />
        </div>
      </section>
      <Footer />
    </>
  );
}
