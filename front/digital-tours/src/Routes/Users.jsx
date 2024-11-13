import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../styles/users.module.css";
import CardUser from "../Components/CardUser/CardUser";
import Spinner from "../Components/Spinner/Spinner";
import { getUsers, deleteUser, updateUser, getUserRoleById } from "../services/userService";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const usersList = await getUsers();
        setUsers(usersList);
      } catch (error) {
        console.error("Error loading users:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUsers();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      const updatedUsers = users.filter((user) => user.id !== id);
      setUsers(updatedUsers);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleEdit = async (updatedUser) => {
    try {
      await updateUser(updatedUser);
      const updatedUsers = users.map((user) =>
        user.id === updatedUser.id ? updatedUser : user
      );
      setUsers(updatedUsers);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleGetRole = async (id) => {
    try {
      const role = await getUserRoleById(id);
      console.log("Rol del usuario:", role);
    } catch (error) {
      console.error("Error fetching user role:", error);
    }
  };

  return (
    <div className={styles.main}>
      <div className={styles.reg_btn}>
        <Link to="/registerUser" className={styles.cat_link}>
          <p className={styles.registerUser_btn}>Registrar Usuario</p>
        </Link>
      </div>
      <div className={styles.home_body}>
        {isLoading ? (
          <Spinner />
        ) : users.length > 0 ? (
          users.map((item) => (
            <CardUser
              key={item.id}
              item={item}
              onDelete={handleDelete}
              onEdit={handleEdit}
              onGetRole={() => handleGetRole(item.id)}
            />
          ))
        ) : (
          <p className={styles.noUsersText}>No hay usuarios registrados.</p>
        )}
      </div>
    </div>
  );
};

export default Users;