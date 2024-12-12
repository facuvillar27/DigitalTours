import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../styles/users.module.css";
import CardUser from "../Components/CardUser/CardUser";
import Spinner from "../Components/Spinner/Spinner";
import { getUsers, deleteUser, updateUser } from "../services/userService";
import { id } from "react-day-picker/locale";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false); 
  const [showDeleteModal, setShowDeleteModal] = useState(false); 
  const [userToEdit, setUserToEdit] = useState(null); 
  const [userToDelete, setUserToDelete] = useState(null); 

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

  // Eliminar un usuario
  const handleDelete = async () => {
    try {
      await deleteUser(userToDelete.id);
      const updatedUsers = users.filter((user) => user.id !== userToDelete.id);
      setUsers(updatedUsers);
      setShowDeleteModal(false);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleOpenEditModal = (user) => {
    setUserToEdit(user);
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setUserToEdit(null);
  };

  const handleEdit = async (updatedUser) => {
    try {
      await updateUser(updatedUser);
      const updatedUsers = users.map((user) =>
        user.id === updatedUser.id ? updatedUser : user
      );
      setUsers(updatedUsers);
      setShowEditModal(false);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleOpenDeleteModal = (user) => {
    setUserToDelete(user);
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setUserToDelete(null);
  };

  return (
    <div className={styles.main}>
      {isLoading ? (
        <div className={styles.container}>
          <Spinner />
        </div>
      ) : (
        <>
          <div className={styles.reg_btn}>
            <Link to="/registerUser" className={styles.cat_link}>
              <p className={styles.registerUser_btn}>Registrar Usuario</p>
            </Link>
          </div>

          <div className={styles.home_body}>
            {users.length > 0 ? (
              users.map((item) => (
                <CardUser
                  key={item.id}
                  item={item}
                  onDelete={handleOpenDeleteModal} 
                  onEdit={handleOpenEditModal}
                />
              ))
            ) : (
              <p className={styles.noUsersText}>No hay usuarios registrados.</p>
            )}
          </div>

          {showEditModal && userToEdit && (
            <div className={styles.modal}>
              <div className={styles.modalContent}>
                <h2>Editar Usuario</h2>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    let id_role = e.target.role.value === "ADMIN" ? 1 : 2;       
                    const updatedUser = {
                      ...userToEdit,
                      username: e.target.username.value,
                      email: e.target.email.value,
                      role: {
                        id: id_role,
                        name: e.target.role.value
                      },
                    };
                    handleEdit(updatedUser);
                  }}
                >
                  <div>
                    <label htmlFor="username">Nombre de Usuario:</label>
                    <input
                      type="text"
                      id="username"
                      name="username"
                      defaultValue={userToEdit.username}
                    />
                  </div>
                  <div>
                    <label htmlFor="email">Correo Electrónico:</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      defaultValue={userToEdit.email}
                    />
                  </div>
                  <div>
                    <label htmlFor="role">Rol:</label>
                    <select name="role" defaultValue={userToEdit.role.name}>
                      <option value="USER">Usuario</option>
                      <option value="ADMIN">Administrador</option>
                    </select>
                  </div>
                  <div className={styles.modalButtons}>
                    <button type="submit">Guardar</button>
                    <button type="button" onClick={handleCloseEditModal}>Cancelar</button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {showDeleteModal && (
            <div className={styles.modal}>
              <div className={styles.modalContent}>
                <h4>¿Estás seguro de que deseas eliminar este usuario?</h4>
                <div className={styles.modalActions}>
                  <button onClick={handleDelete} className={styles.confirmButton}>
                    Sí, eliminar
                  </button>
                  <button onClick={handleCloseDeleteModal} className={styles.cancelButton}>
                    Cancelar
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Users;