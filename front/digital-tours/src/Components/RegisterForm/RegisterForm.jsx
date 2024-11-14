import { Formik, Form, Field } from "formik";
import { register as registerService } from "../../services/authService";
import styles from "./registerForm.module.css";
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
    const response = await registerService(values.username, values.password, values.email);
    if (response=== "User registered successfully"){
      setStatus({ successMessage: "¡Registro exitoso! Se le enviará un correo de confirmación." });
      setTimeout(() => {
        resetForm();
      }, 3000);
    }else{
      setStatus({ errorMessage: "Error en el registro. Verifique sus datos." });
    }
  setSubmitting(false);
  };

  return (
    <div className={styles.main}>
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
          {({ isSubmitting, errors, touched, status, submitCount }) => (
            <div className={styles.formWrapper}>
              {/* Mostrar el mensaje de éxito después de enviar el formulario y si es exitoso */}
              {submitCount > 0 && !isSubmitting && status?.successMessage && (
                <p className={styles.successMessage}>{status.successMessage}</p>
              )} 

              {/* Mostrar el mensaje de error después de enviar el formulario y si hay errores */}
              {submitCount > 0 && status?.errorMessage && !isSubmitting && (
                <p className={styles.errorMessage}>{status.errorMessage}</p>
              )}

              <Form className={styles.form}>
                <h1 className={styles.title}>Registrarse</h1>

                {/* Mostrar los errores solo después de intentar enviar el formulario */}
                {submitCount > 0 && Object.keys(errors).length > 0 && (
                  <div className={styles.errorContainer}>
                    <ul>
                      {Object.keys(errors).map((field) => (
                        <li key={field} className={styles.errorMessage}>
                          {errors[field]}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Campos del formulario */}
                <Field
                  type="text"
                  name="username"
                  placeholder="Usuario"
                  className={`${styles.input} ${touched.username && errors.username ? styles.inputError : ""}`}
                />
                <Field
                  type="email"
                  name="email"
                  placeholder="Correo electrónico"
                  className={`${styles.input} ${touched.email && errors.email ? styles.inputError : ""}`}
                />
                <Field
                  type="password"
                  name="password"
                  placeholder="Contraseña"
                  className={`${styles.input} ${touched.password && errors.password ? styles.inputError : ""}`}
                />
                <Field
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirmar contraseña"
                  className={`${styles.input} ${touched.confirmPassword && errors.confirmPassword ? styles.inputError : ""}`}
                />

              <button type="submit" className={styles.button} disabled={isSubmitting}>
                Registrarse
              </button>
              </Form>
            </div>
          )}
      </Formik>

    </div>
  );
};

export default RegisterForm;