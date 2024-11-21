import { Link } from "react-router-dom";
import styles from "./navbar.module.css";
import logo from "../../assets/Logo_digitaltours-black.svg";
import logo_white from "../../assets/Logo_digitaltours-white.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import DropdownMenu from "../DropdownMenu/DropdownMenu";
import { useAuth } from "../../services/authContext";

const Navbar = () => {
  const { isAuthenticated } = useAuth();
  const [color, setColor] = useState(false);
  const changeColor = () => {
    window.scrollY > 10 ? setColor(true) : setColor(false);
  };
  window.addEventListener("scroll", changeColor);

  window.addEventListener('scroll', function() {
    const image = document.getElementById('logo');
    
    if (window.scrollY > 10) {
      image.src = logo_white;
    } else {
      image.src = logo; 
    }
  });

  return (
    <nav className={color ? styles.scrolled : styles.navbar}>
      <Link to="/" className={styles.nav_logo}>
        <img src={logo} alt="logo digital tours" className={styles.logo} id="logo" />
      </Link>
      {isAuthenticated ? (
        <DropdownMenu />   
      ) : (
        <>
        <ul>
        <li>
          <Link to="/login" className={styles.nav_link}>
            Iniciar sesión
          </Link>
        </li>
        <li>
          <Link to="/registerUser" className={styles.nav_link}>
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