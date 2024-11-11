import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../styles/users.module.css";
import CardUser from "../Components/CardUser/CardUser";
import axios from "axios";

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const response = await axios.get("https://api.example.com/users"); 
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    
    loadUsers();
  }, []);

  const deleteUser = async (id) => {
    try {
      await axios.delete(`https://api.example.com/users/${id}`); 
      const updatedUsers = users.filter((user) => user.id !== id);
      setUsers(updatedUsers);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const editUser = async (updatedUser) => {
    try {
      await axios.put(`https://api.example.com/users/${updatedUser.id}`, updatedUser); 
      const updatedUsers = users.map((user) =>
        user.id === updatedUser.id ? updatedUser : user
      );
      setUsers(updatedUsers);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <div className={styles.main}>
      <div className={styles.dashboard}>
        <div className={styles.reg_btn}>
          <Link to="/registerUser" className={styles.cat_link}>
            <p className={styles.registerUser_btn}>Registrar Usuario</p>
          </Link>
        </div>
        <div className={styles.home_body}>
          <div className={styles.titleContainer}>
            <h1 className={styles.cta_text}>Usuarios</h1>
            {users.length === 0 && <p className={styles.noUsersText}>No hay usuarios registrados.</p>}
          </div>
          {users.length > 0 && 
            users.map((item) => (
              <CardUser
                key={item.id} 
                item={item} 
                onDelete={deleteUser} 
                onEdit={editUser}
              />
            ))
          }
        </div>
      </div>
    </div>
  );  
};

export default Users;