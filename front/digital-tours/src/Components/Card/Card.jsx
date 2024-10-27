import styles from "./card.module.css";
import cardImg from "../../assets/RioDeJaneiro.png";

const Card = () => {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <img src={cardImg} alt="" className={styles.card_img} />
        <p className={styles.product_type}>categoria/tipo</p>
        <h3 className={styles.product_name}>
          RIO DE jANEIRO: 6 PARADAS EN LUGARES DESTACADOS CON ALMUERZO
        </h3>
        <p className={styles.product_description}>
          Disfruta de un tour en Río de Janeiro, admira Cristo Redentor y el Pan
          de Azúcar. Explora la ciudad visitando el Estadio...
        </p>
        <h3 className={styles.product_price}>Desde $$$$</h3>
      </div>
    </div>
  );
};

export default Card;
