import { useParams, useNavigate } from "react-router-dom";
import styles from "../styles/productDetails.module.css";
import data from "../assets/data.json";

const ProductDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const item = data.tours.find((tour) => tour.id.toString() === id);

  if (!item) {
    return <p>Producto no encontrado</p>;
  }

  console.log(item);

  return (
    <div className={styles.detail}>
      <div className={styles.detail_box}>
        <button onClick={() => navigate(-1)} className={styles.backButton}>
          Volver
        </button>
        <div className={styles.detail_info}>
          <h2>{item.nombre}</h2>
          <img src={item.image} alt={item.nombre} className={styles.image} />
          <p>{item.descripcion}</p>
          <h3>{item.precio}</h3>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
