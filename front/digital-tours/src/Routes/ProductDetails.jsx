import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import styles from "../styles/productDetails.module.css";
import Spinner from "../Components/Spinner/Spinner";
import AvailabilityCalendar from "../Components/AvailabilityCalendar/AvailabilityCalendar";
import { getIdFromToken } from "../services/authService";
import { FacebookShareButton, TwitterShareButton,WhatsappShareButton, TelegramShareButton, FacebookIcon, TwitterIcon, WhatsappIcon, TelegramIcon   } from "next-share";



const ProductDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [featuresList, setFeaturesList] = useState([]);
  const [userId, setUserId] = useState(null);

  const fetchProductDetails = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://34.229.166.90:8080/digitaltours/api/v1/products/${id}`
      );
      const productData = response.data.data;
      setProduct(productData);
      const images = response.data.data.imageUrls.map((url) => ({
        original: url,
        thumbnail: url,
      }));
      setImages(images);
    } catch (error) {
      console.error("Error al obtener el producto:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userIdFromToken = getIdFromToken(token);
    setUserId(userIdFromToken);
  }, []);
  
  useEffect(() => {
    const fetchFeatures = async () => {
      try {
        const response = await fetch(
          "http://34.229.166.90:8080/digitaltours/api/v1/features"
        );
        const data = await response.json();

        const filteredFeatures = data.data.filter(
          (feature) =>
            product && product.features.some((f) => f.id === feature.id)
        );

        setFeaturesList(filteredFeatures);
      } catch (error) {
        console.error("Error al cargar las características:", error);
      }
    };
    fetchFeatures();
  }, [product]);

  useEffect(() => {
    fetchProductDetails();
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
            showThumbnails={true}
            showFullscreenButton={true}
            showPlayButton={false}
            className={styles.gallery_box}
          />
        </div>
        <div className={styles.detail_info}>
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <div className={styles.product_characteristics}>
            {featuresList.map((feature) => {
              const hasFeature = product.features.some(
                (f) => f.id === feature.id
              );
              return (
                <div key={feature.id} className={styles.feature}>
                  <img
                    src={feature.urlImg}
                    alt={feature.name}
                    className={styles.featureImage}
                  />
                  <p className={styles.featureName}>{feature.name}</p>
                </div>
              );
            })}
          </div>
          <h3>{product.price} USD</h3>
          <div className={styles.share_social_networks}>
            <FacebookShareButton url={`http://digital-tours-frontend.s3-website-us-east-1.amazonaws.com/products/${id}`} quote={product.description}>
              <FacebookIcon size={32} round />
            </FacebookShareButton>
            <TwitterShareButton url={`http://digital-tours-frontend.s3-website-us-east-1.amazonaws.com/products/${id}`} title={product.description}>
              <TwitterIcon size={32} round />
            </TwitterShareButton>
            <WhatsappShareButton url={`http://digital-tours-frontend.s3-website-us-east-1.amazonaws.com/products/${id}`} title={product.description}>
              <WhatsappIcon size={32} round />
            </WhatsappShareButton>
            <TelegramShareButton url={`http://digital-tours-frontend.s3-website-us-east-1.amazonaws.com/products/${id}`} title={product.description}>
              <TelegramIcon size={32} round/>
            </TelegramShareButton>
          </div>
        </div>
        {userId ? (
          <AvailabilityCalendar productId={id} />
        ) : (
          <div className={styles.loginPrompt}>
            <p className={styles.loginMessage}>
              Inicia sesión o registrese para reservar este tour
            </p>
            <button
              className={styles.loginButton}
              onClick={() => navigate("/login")}
            >
              Ir a Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
