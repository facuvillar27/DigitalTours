import styles from "../Pagination/Pagination.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";


const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const maxPagesToShow = 5;
    const startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);
    const pageNumbers = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  
    return (
      <div className={styles.pagination}>
        <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        {startPage > 1 && <span>...</span>}
        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => onPageChange(number)}
            className={currentPage === number ? styles.active : ''}
          >
            {number}
          </button>
        ))}
        {endPage < totalPages && <span>...</span>}
        <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>
        <FontAwesomeIcon icon={faArrowRight} />
        </button>
      </div>
    );
  };

export default Pagination;
