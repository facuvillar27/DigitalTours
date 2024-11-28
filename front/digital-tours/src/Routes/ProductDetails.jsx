import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import styles from "../styles/productDetails.module.css";
import Spinner from "../Components/Spinner/Spinner";
import AvailabilityCalendar from "../Components/AvailabilityCalendar/AvailabilityCalendar";

const ProductDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProductDetails = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/digitaltours/api/v1/products/${id}`
      );
      setProduct(response.data.data);
    } catch (error) {
      console.error("Error al obtener el producto:", error);
    }
  };

  const fetchProductImages = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/digitaltours/api/v1/images"
      );
      const productImages = response.data.data
        .filter((image) => image.idProducto === Number(id))
        .map((image) => ({
          original: image.urlImagen,
          thumbnail: image.urlImagen,
        }));
      setImages(productImages);
    } catch (error) {
      console.error("Error al obtener las imágenes:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductDetails();
    fetchProductImages();
  }, [id]);

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <Spinner />
      </div>
    );
  }

  if (!product) {
    return <p>Producto no encontrado</p>;
  }

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
            className={styles.gallery_box}
          />
        </div>
        <div className={styles.detail_info}>
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <h3>{product.price} USD</h3>
        </div>
        <AvailabilityCalendar productId={id} />
      </div>
    </div>
  );
};

export default ProductDetails;
