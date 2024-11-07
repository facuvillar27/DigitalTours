import styles from "../styles/login.module.css"
import LoginForm from "../Components/LoginForm/LoginForm";
const Login = () => {
    return (
        <div className={styles.main}>
            <LoginForm />
        </div>
    );
}

export default Login;