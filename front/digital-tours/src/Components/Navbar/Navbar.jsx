import { Link } from "react-router-dom";
import styles from "./navbar.module.css";
import logo from "../../assets/logo.svg";

const Navbar = () => {
  return (
    <nav>
      <Link to="/" className={styles.nav_logo}>
        <img src={logo} alt="logo digital tours" />
      </Link>
      <ul>
        <li>
          <Link to="/login" className={styles.nav_link}>
            Iniciar sesión
          </Link>
        </li>
        <li>
          <Link to="/signUp" className={styles.nav_link}>
            Crear cuenta
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
