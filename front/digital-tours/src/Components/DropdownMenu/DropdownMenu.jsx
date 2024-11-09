import styles from "./dropdownMenu.module.css";
import { useState, useEffect, useRef } from "react";
import ProfileImage from "../ProfileImage/ProfileImage";
import { useAuth } from "../../services/authContext";
import { getUserInfo } from "../../services/authService";
import { getUserRol } from "../../services/authService";
import { useNavigate } from "react-router-dom";

const DropdownMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const { logout } = useAuth();
  const menuRef = useRef(null);
  const [color, setColor] = useState(false);
  const navigate = useNavigate();
  const changeColor = () => {
    window.scrollY > 10 ? setColor(true) : setColor(false);
  };
  window.addEventListener("scroll", changeColor);

  
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  const handleAdminRedirect = () => {
    navigate('/admin');
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  useEffect(() => {
    const info = getUserInfo();
    setUserInfo(info);
  }, []); 

  if (!userInfo) {
    return null; // Puedes renderizar un loading spinner aquí si lo deseas
  }

  return (
    <div className={styles.container}>
      <p className={color ? styles.scrolled : styles.username}>
        {userInfo.user.charAt(0).toUpperCase() + userInfo.user.slice(1).toLowerCase()}
      </p>
      <div className={styles.dropdown} ref={menuRef}>
        <button className={styles.dropdownIcon} onClick={toggleMenu}>
          <ProfileImage name={userInfo.user} />
        </button>
        {isOpen && (
          <div className={styles.dropdownContent}>
            {getUserRol() === "ROLE_ADMIN" && (
              <a onClick={handleAdminRedirect} className={styles.dropdownItem}>
                Panel de Administración
              </a>
            )}
            <a href="#opcion2" className={styles.dropdownItem}>
              Perfil
            </a>
            <a onClick={logout} className={styles.dropdownItem}>
              Cerrar sesión
            </a>
          </div>
        )}
      </div>
    </div>
  );
}  

export default DropdownMenu;