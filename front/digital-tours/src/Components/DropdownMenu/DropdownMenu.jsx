import styles from "./dropdownMenu.module.css";
import { useState } from "react";
import ProfileImage from "../ProfileImage/ProfileImage";
import { useAuth } from "../../services/authContext";
import { useEffect } from "react";
import { useRef } from "react";

const DropdownMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {logout } = useAuth();
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className={styles.dropdown} ref={menuRef}>
      <button className={styles.dropdownIcon} onClick={toggleMenu}>
         {<ProfileImage name="John Doe"/>}
      </button>
      {isOpen && (
        <div className={styles.dropdownContent}>
          <a href="#opcion2" className={styles.dropdownItem}>Perfil</a>
          <a onClick={logout} className={styles.dropdownItem}>Cerrar sesión</a>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
