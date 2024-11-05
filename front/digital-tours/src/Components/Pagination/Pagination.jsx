import React from 'react';
import styles from "../Pagination/Pagination.module.css";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const maxPagesToShow = 5;
    const startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);
    const pageNumbers = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  
    return (
      <div className={styles.pagination}>
        <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
          ⬅️
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
          ➡️
        </button>
      </div>
    );
  };

export default Pagination;
