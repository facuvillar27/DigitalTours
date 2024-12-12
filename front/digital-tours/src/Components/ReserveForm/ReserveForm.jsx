import { Formik, Form, Field } from "formik";
import { useNavigate } from "react-router-dom";
import styles from "./reserveForm.module.css";
import * as Yup from "yup";

const ReserveForm = ({ date, id, productId, availableQuota }) => {
  const navigate = useNavigate();

  const ReserveSchema = Yup.object().shape({
    numberOfPeople: Yup.number()
      .min(1, "La cantidad de personas debe ser al menos 1")
      .required("La cantidad de personas es obligatoria")
      .integer("La cantidad de personas debe ser un número entero")
      .positive("La cantidad de personas debe ser positiva")
      .max(availableQuota, "La cantidad de personas supera el cupo disponible"),
  });

  const handleSubmit = async (
    values,
    { setSubmitting }
  ) => {
    navigate(`/products/${productId}/reserve-confirmation`, {
      state: {
        numberOfPeople: values.numberOfPeople,
        date,
        tourId: id,
        productId,
        successMessage: "",
      },
    });
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
            {submitCount > 0 && !isSubmitting && status?.successMessage && (
              <p className={styles.successMessage}>{status.successMessage}</p>
            )}
            {submitCount > 0 && status?.errorMessage && !isSubmitting && (
              <p className={styles.errorMessage}>{status.errorMessage}</p>
            )}
            <Form className={styles.form}>
              <h3 className={styles.title}>Reserva para el tour</h3>
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
              <p className={styles.info}>
                Fecha seleccionada: {date.toLocaleDateString()}
              </p>
              <p className={styles.info}>
                Cupo disponible: {availableQuota} personas
              </p>
              <div className={styles.confirm_button}>
                <Field
                  type="number"
                  name="numberOfPeople"
                  placeholder="Cantidad de personas"
                  className={`${styles.input} ${
                    touched.numberOfPeople && errors.numberOfPeople
                      ? styles.inputError
                      : ""
                  }`}
                />
                <button
                  type="submit"
                  className={styles.button}
                  disabled={isSubmitting}
                >
                  Reservar
                </button>
              </div>
            </Form>
          </div>
        )}
      </Formik>
    </div>
  );
};

export default ReserveForm;
