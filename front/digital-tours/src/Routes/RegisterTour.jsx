import styles from "../styles/registerTour.module.css";

import RegisterTourForm from "../Components/RegisterTourForm/RegisterTourForm";
const RegisterTour = () => {
    return (
        <div className={styles.main}>
            <h1 className={styles.cta_text}>Registrar un tour</h1>
            <RegisterTourForm />
        </div>
    );
};
  
  export default RegisterTour;
  