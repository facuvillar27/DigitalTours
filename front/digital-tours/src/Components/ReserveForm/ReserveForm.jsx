import { Formik, Form, Field } from "formik";
import { useNavigate } from "react-router-dom";
import { reserve as reserveTour } from "../../services/tourService";
import styles from "./reserveForm.module.css";
import * as Yup from "yup";

const ReserveForm = ({ date, id, productId }) => {
    const navigate = useNavigate();

  const ReserveSchema = Yup.object().shape({
    numberOfPeople: Yup.number()
      .min(1, "La cantidad de personas debe ser al menos 1")
      .required("La cantidad de personas es obligatoria")
      .integer("La cantidad de personas debe ser un número entero")
      .positive("La cantidad de personas debe ser positiva"),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm, setStatus }) => {

    const response = await reserveTour(values.numberOfPeople, id);
    if (response.message === "Reserva exitosa") {
        setStatus({ successMessage: "¡Reserva exitosa! Gracias por reservar." });
        navigate(`/products/${productId}/reserve-confirmation`, {
            state: { 
                numberOfPeople: values.numberOfPeople,
                date,
                tourId: id,
                productId,
                confirmationCode: response.confirmationNumber,
                successMessage: "¡Reserva exitosa! Gracias por reservar."
            }
        });
        setTimeout(() => {
        resetForm();
        }, 3000);
    } else {
      setStatus({ errorMessage: "Error en la reserva. Intenta nuevamente." });
    }
    setSubmitting(false);
  };

  return (
    <div className={styles.main}>
      <Formik
        initialValues={{
          numberOfPeople: 1,
        }}
        validationSchema={ReserveSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, errors, touched, status, submitCount }) => (
          <div className={styles.formWrapper}>
            {/* Mostrar mensaje de éxito si la reserva es exitosa */}
            {submitCount > 0 && !isSubmitting && status?.successMessage && (
              <p className={styles.successMessage}>{status.successMessage}</p>
            )}

            {/* Mostrar mensaje de error si ocurre un problema */}
            {submitCount > 0 && status?.errorMessage && !isSubmitting && (
              <p className={styles.errorMessage}>{status.errorMessage}</p>
            )}

            <Form className={styles.form}>
              <h1 className={styles.title}>Reserva para el tour</h1>

              {/* Mostrar errores solo después de intentar enviar el formulario */}
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

              {/* Información sobre el tour */}
              <p className={styles.info}>Fecha seleccionada: {date.toLocaleDateString()}</p>

              {/* Campo para la cantidad de personas */}
              <Field
                type="number"
                name="numberOfPeople"
                placeholder="Cantidad de personas"
                className={`${styles.input} ${
                  touched.numberOfPeople && errors.numberOfPeople ? styles.inputError : ""
                }`}
              />

              <button type="submit" className={styles.button} disabled={isSubmitting}>
                Confirmar reserva
              </button>
            </Form>
          </div>
        )}
      </Formik>
    </div>
  );
};

export default ReserveForm;
