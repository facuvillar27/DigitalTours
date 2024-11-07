import { useState } from "react";
import { register as registerService } from "../../services/authService";
import styles from "./registerForm.module.css";
import Button from "../Button/Button";

const RegisterForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // Estado para el mensaje de error

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrorMessage("Las contraseñas no coinciden");
      return;
    }

    try {
      await registerService(username, password, email); // Llamada al servicio de registro
      setSuccessMessage("¡Registro exitoso! Se le enviará un correo de confirmación.");
      setErrorMessage("");

    } catch (error) {
      console.error("Error en el registro:", error);
      setErrorMessage("Error en el registro. Verifique sus datos"); // Establece el mensaje de error
    }
  };

  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <h1 className={styles.title}>Registrarse</h1>
          
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
