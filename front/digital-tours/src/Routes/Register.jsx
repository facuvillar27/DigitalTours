import styles from "../styles/register.module.css"
import RegisterForm from "../Components/RegisterForm/RegisterForm";
const Register = () => {
    return (
        <div className={styles.main}>
            <RegisterForm />
        </div>
    );
}

export default Register;