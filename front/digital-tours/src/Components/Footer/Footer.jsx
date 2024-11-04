import { Link } from "react-router-dom";
import logo from "../../assets/Logo_digitaltours-white.svg";
import styles from "./footer.module.css";

const Footer = () => {
  return (
    <footer>
      <div className={styles.footer_content}>
        <div className={styles.footer_left}>
          <Link to="/" >
            <img src={logo} alt="logo digital tours" className={styles.logo} />
          </Link>
        </div>
        <div className={styles.footer_right}>
          <span className={styles.copyright}>Copyright © {new Date().getFullYear()} Digital Tours </span>
        </div>
      </div>
    </footer >
  );
};

export default Footer;
