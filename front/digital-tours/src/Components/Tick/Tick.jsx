import { useEffect, useState } from "react";
import styles from './tick.module.css';

const Tick = () => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  return (
    <div className={`${styles.svgContainer} ${animate ? styles.animate : ""}`}>    
      <svg className={styles.ftGreenTick} xmlns="http://www.w3.org/2000/svg" height="100" width="100" viewBox="0 0 48 48" aria-hidden="true">
        <circle className={styles.circle} fill="#5bb543" cx="24" cy="24" r="22"/>
        <path className={styles.tick} fill="none" stroke="#FFF" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" d="M14 27l5.917 4.917L34 17"/>
      </svg>
    </div>
  );
};

export default Tick;