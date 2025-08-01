
import styles from './pagination.module.css';

import React, { useState, useEffect } from "react";
import Image from "next/image";

interface PaginationProps<T> {
  data: T[];
  countOnePage: number;
  onPageChange: (pageData: T[]) => void;
}

export function Pagination<T>({ data, countOnePage, onPageChange }: PaginationProps<T>) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / countOnePage);

  useEffect(() => {
    const startIdx = (currentPage - 1) * countOnePage;
    const pageData = data.slice(startIdx, startIdx + countOnePage);
    onPageChange(pageData);
  }, [currentPage, data]);

  if (totalPages <= 1) return null;

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const renderPageNumbers = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage < 4) {
        pages.push(1, 2, 3, "...", totalPages-1, totalPages);
      } else if (currentPage >= totalPages - 3) {
        pages.push(1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
      }
    }

    return pages.map((p, index) =>
      p === "..." ? (
        <span key={index} style={{ margin: "0 5px" }}>
          ...
        </span>
      ) : (
        <button
          key={index}
          onClick={() => goToPage(Number(p))}
          className={currentPage === p ? styles.buttonPageActive : ""}
        >
          {p}
        </button>
      )
    );
  };

  return (
    <div className={styles.container}>
      <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1} className={styles.buttonImg}>
        <Image src={'/images/navIcons/chevron-left.svg'} alt="Влево" width={24} height={24}/>
      </button>
      {renderPageNumbers()}
      <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages} className={styles.buttonImg}>
        <Image src={'/images/navIcons/chevron-right.svg'} alt="Влево" width={24} height={24}/>
      </button>
    </div>
  );
}
