import { useEffect, useState } from "react";
import styles from "../styles/admin.module.css";
import { Link } from "react-router-dom";
import Button from "../Components/Button/Button";

const Admin = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (isMobile) {
    return (
      <div className={styles.mobileWarning}>
        <p>Este panel no está disponible en dispositivos móviles.</p>
      </div>
    );
  }

  return (
    <div className={styles.main}>
      <h1 className={styles.title}>Panel de administración</h1>
      <div className={styles.container}>
        <div className={styles.card}>
          <Link to="/admin/tours"><Button>Tours</Button></Link>
          <Link to="/admin/usuarios"><Button>Usuarios</Button></Link>
          <Link to="/admin/tours"><Button>Tours</Button></Link>
          <Link to="/admin/tours"><Button>Tours</Button></Link>
          <Link to="/admin/tours"><Button>Tours</Button></Link>
        </div>
      </div>
    </div>
  );
};

export default Admin;
