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

  const handleLogout = () => {
    logout(); 
    navigate("/"); 
  };

  const handleFav = () => {
    navigate("/mis-favoritos"); 
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  const handleAdminRedirect = () => {
    navigate('/admin');
  };

  const handleProfile = () => {
    navigate('/profile');
  };

  const handleReserve = () => {
    navigate('/reserves');
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
    return null;
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
            {getUserRol().name === "ADMIN" && (
              <a onClick={handleAdminRedirect} className={styles.dropdownItem}>
                Panel de Administración
              </a>
            )}
            <a onClick={handleReserve} className={styles.dropdownItem}>
              Reservas
            </a>
            <a onClick={handleFav} className={styles.dropdownItem}>
              Favoritos
            </a>
            <a onClick={handleProfile} className={styles.dropdownItem}>
              Perfil
            </a>
            <a onClick={handleLogout} className={styles.dropdownItem}>
              Cerrar sesión
            </a>
          </div>
        )}
      </div>
    </div>
  );
}  

export default DropdownMenu;