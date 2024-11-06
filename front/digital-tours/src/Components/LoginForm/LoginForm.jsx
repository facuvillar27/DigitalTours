import { useState } from "react";
import { useAuth } from "../../services/authContext";
import { login } from "../../services/authService";
import styles from "./loginForm.module.css";
import Button from "../Button/Button";


const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setIsAuthenticated } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(username, password);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Error en inicio de sesión:", error);
    }
  };

  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <form onSubmit={handleSubmit} className={styles.form}>
        <h1 className={styles.title}>Iniciar sesión</h1>
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