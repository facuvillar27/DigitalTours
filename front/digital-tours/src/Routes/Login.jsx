import styles from "../styles/login.module.css"
import LoginForm from "../Components/LoginForm/LoginForm";
const Login = () => {
    return (
        <div className={styles.main}>
            <h1 className={styles.cta_text}>Iniciar sesión</h1>
            <LoginForm />
        </div>
    );
}

export default Login;