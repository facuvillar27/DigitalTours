import { Link } from "react-router-dom";
import styles from "./navbar.module.css";
import logo from "../../assets/Logo_digitaltours-black.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useAuth } from "../../services/authContext";

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const [color, setColor] = useState(false);
  const changeColor = () => {
    window.scrollY > 50 ? setColor(true) : setColor(false);
  };
  window.addEventListener("scroll", changeColor);

  return (
    <nav className={color ? styles.scrolled : styles.navbar}>
      <Link to="/" className={styles.nav_logo}>
        <img src={logo} alt="logo digital tours" className={styles.logo} />
      </Link>
      {isAuthenticated ? (
        <FontAwesomeIcon icon={faRightFromBracket} className={styles.logout} onClick={logout}/>
      ) : (
        <>
        <ul>
        <li>
          <Link to="/login" className={styles.nav_link}>
            Iniciar sesión
          </Link>
        </li>
        <li>
          <Link to="/register" className={styles.nav_link}>
            Crear cuenta
          </Link>
        </li>
      </ul>
        </>
      )}
      <FontAwesomeIcon className={styles.hamburger} icon={faBars} />
    </nav>
  );
};

export default Navbar;
