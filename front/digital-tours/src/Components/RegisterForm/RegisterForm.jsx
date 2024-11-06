import { useState } from "react";
import { useAuth } from "../../services/authContext";
import { register } from "../../services/authService";
import styles from "./registerForm.module.css";
import Button from "../Button/Button";

const RegisterForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { setIsAuthenticated } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      console.error("Las contraseñas no coinciden");
      return;
    }

    try {
      await register(username, email, password);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Error en el registro:", error);
    }
  };

  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <h1 className={styles.title}>Registrarse</h1>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Usuario"
            className={styles.input}
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Correo electrónico"
            className={styles.input}
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Contraseña"
            className={styles.input}
          />
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirmar contraseña"
            className={styles.input}
          />
          <Button type="submit" className={styles.button}>Registrarse</Button>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;