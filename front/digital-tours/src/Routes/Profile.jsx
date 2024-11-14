import React, { useEffect, useState } from "react";
import ProfileImage from "../Components/ProfileImage/ProfileImage"
import styles from "../styles/profile.module.css"
import { getIdFromToken, getUserById } from "../services/authService";
import Spinner from "../Components/Spinner/Spinner";

const Profile = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {

        const token = localStorage.getItem("token");
        const userId = getIdFromToken(token);

        if (userId) {
          const user = await getUserById(userId);
          setUserData(user); 
        }
      } catch (error) {
        console.error("Error al obtener datos del usuario:", error);
      }
    };

    fetchUserData();
  }, []);

  if (!userData) {
    return <div className={styles.container}><Spinner /></div>; 
  }

  return (
    <div className={styles.container}>
      <div className={styles.profile}>
        <div className={styles.profileImage}>
            <ProfileImage name={userData.username} className={styles.customProfileImage} />
        </div>
        <div className={styles.profileInfo}>
          <h5 className={styles.profileTitle}>Perfil</h5>
          <p className={styles.profileText}>Rol: {userData.role}</p>
          <p className={styles.profileText}>Nombre de usuario: {userData.username}</p>
          <p className={styles.profileText}>Mail: {userData.email}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile