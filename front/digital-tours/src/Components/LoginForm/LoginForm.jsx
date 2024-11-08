import { useState } from "react";
import { useAuth } from "../../services/authContext";
import { login as loginService } from "../../services/authService";
import { useNavigate } from "react-router-dom";
import styles from "./loginForm.module.css";
import Button from "../Button/Button";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Llamamos al servicio de login y obtenemos el token
      const token = await loginService(username, password);

      // Llamamos al login del contexto para guardar el estado de autenticación y el token
      login(token); // Pasa el token al contexto

      setSuccessMessage("¡Inicio de sesión exitoso!");
      setErrorMessage(""); // Limpiar el mensaje de error en caso de éxito

      // Redireccionar después de 2 segundos
      setTimeout(() => navigate("/"), 2000);
    } catch (error) {
      console.error("Error en inicio de sesión:", error);
      setErrorMessage("Usuario o contraseña incorrectos"); // Establecer mensaje de error
    }
  };

  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <h1 className={styles.title}>Iniciar sesión</h1>
          
          {successMessage && <p className={styles.successMessage}>{successMessage}</p>}
          {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}

          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Usuario"
            className={styles.input}
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Contraseña"
            className={styles.input}
          />
          <Button type="submit" className={styles.button}>Iniciar sesión</Button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;