import { Formik, Form, Field } from "formik";
import { register as registerService } from "../../services/authService";
import styles from "./registerForm.module.css";
import Button from "../Button/Button";
import * as Yup from "yup";

const RegisterForm = () => {
  const RegisterSchema = Yup.object().shape({
    username: Yup.string()
      .min(3, "El nombre de usuario debe tener al menos 3 caracteres")
      .required("El nombre de usuario es obligatorio"),
    email: Yup.string()
      .email("Correo electrónico no válido")
      .required("El correo electrónico es obligatorio"),
    password: Yup.string()
      .min(6, "La contraseña debe tener al menos 6 caracteres")
      .required("La contraseña es obligatoria"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Las contraseñas no coinciden")
      .required("Confirma tu contraseña"),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm, setStatus }) => {
    try {
      await registerService(values.username, values.password, values.email);
      setStatus({ successMessage: "¡Registro exitoso! Se le enviará un correo de confirmación." });
      resetForm();
    } catch (error) {
      setStatus({ errorMessage: "Error en el registro. Verifique sus datos." });
    }
    setSubmitting(false);
  };

  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <Formik
          initialValues={{
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={RegisterSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors, status, submitCount }) => (
            <Form className={styles.form}>
              <h1 className={styles.title}>Registrarse</h1>

              {status?.successMessage && <p className={styles.successMessage}>{status.successMessage}</p>}
              {status?.errorMessage && <p className={styles.errorMessage}>{status.errorMessage}</p>}

              {submitCount > 0 && Object.keys(errors).length > 0 && (
                <div className={styles.errorContainer}>
                  <ul>
                    {Object.values(errors).map((error, index) => (
                      <li key={index} className={styles.errorMessage}>{error}</li>
                    ))}
                  </ul>
                </div>
              )}

              <Field type="text" name="username" placeholder="Usuario" className={styles.input} />
              <Field type="email" name="email" placeholder="Correo electrónico" className={styles.input} />
              <Field type="password" name="password" placeholder="Contraseña" className={styles.input} />
              <Field type="password" name="confirmPassword" placeholder="Confirmar contraseña" className={styles.input} />

              <Button type="submit" className={styles.button} disabled={isSubmitting}>Registrarse</Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default RegisterForm;