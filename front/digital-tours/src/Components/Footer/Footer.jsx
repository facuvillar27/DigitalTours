import { Link } from "react-router-dom";
import logo from "../../assets/Logo_digitaltours-white.svg";
import styles from "./footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.container}>
      <div className={styles.license}>
        <div className={styles.copyright}>
          <Link to="/" className={styles.nav_logo}>
            <img src={logo} alt="logo digital tours" className={styles.logo} />
          </Link>
          <span>Copyright © {new Date().getFullYear()} Digital Tours </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
