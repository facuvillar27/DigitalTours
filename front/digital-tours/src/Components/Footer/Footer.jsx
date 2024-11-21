import { Link } from "react-router-dom";
import logo from "../../assets/Logo_digitaltours-white.svg";
import styles from "./footer.module.css";
import { FontAwesomeIcon as FontawesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
  return (
    <footer className={styles.container}>
        <div className={styles.copyright}>
          <Link to="/" className={styles.nav_logo}>
            <img src={logo} alt="logo digital tours" className={styles.logo} />
          </Link>
          <span>Copyright © {new Date().getFullYear()} Digital Tours </span>
            <div onClick={() => window.scrollTo(0, 0)} className={styles.arrowUp}><FontawesomeIcon icon={faArrowUp} /></div>
        </div>
    </footer>
  );
};

export default Footer;
