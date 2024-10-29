import { useParams } from "react-router-dom";
import styles from "../styles/productDetails.module.css";
import data from "../assets/data.json";

const ProductDetails = () => {
  const { id } = useParams();
  const item = data.tours.find((tour) => tour.id.toString() === id);

  if (!item) {
    return <p>Producto no encontrado</p>;
  }

  console.log(item);

  return (
    <div className={styles.detail}>
      <img src={item.image} alt={item.nombre} className={styles.image} />
      <h2>{item.nombre}</h2>
      <p>{item.descripcion}</p>
      <h3>{item.precio}</h3>
    </div>
  );
};

export default ProductDetails;
