import { useParams, useNavigate } from "react-router-dom";
import styles from "../styles/productDetails.module.css";
import data from "../assets/data.json";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

const ProductDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const item = data.tours.find((tour) => tour.id.toString() === id);

  if (!item) {
    return <p>Producto no encontrado</p>;
  }

  const images = [
    {
      original:
        "https://images.unsplash.com/photo-1507125524815-d9d6dccda1dc?q=80&w=1982&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      thumbnail:
        "https://images.unsplash.com/photo-1507125524815-d9d6dccda1dc?q=80&w=1982&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      original:
        "https://images.unsplash.com/photo-1551312183-66bca7944e4e?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      thumbnail:
        "https://images.unsplash.com/photo-1551312183-66bca7944e4e?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      original:
        "https://images.unsplash.com/photo-1551312183-66bca7944e4e?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      thumbnail:
        "https://images.unsplash.com/photo-1551312183-66bca7944e4e?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      original:
        "https://images.unsplash.com/photo-1551312183-66bca7944e4e?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      thumbnail:
        "https://images.unsplash.com/photo-1551312183-66bca7944e4e?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

  return (
    <div className={styles.detail}>
      <div className={styles.detail_box}>
        <button onClick={() => navigate(-1)} className={styles.backButton}>
          Volver
        </button>
        <div className={styles.gallery_container}>
          <ImageGallery
            items={images}
            originalHeight={40}
            originalWidth={80}
            thumbnailPosition={"right"}
            className={styles.gallery_box}
          />
        </div>
        <div className={styles.detail_info}>
          <h2>{item.nombre}</h2>
          <p>{item.descripcion}</p>
          <h3>{item.precio}</h3>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
