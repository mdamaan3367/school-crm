import React from 'react';

const Pagination = ({ page, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const pages = [];

  const start = Math.max(1, page - 2);
  const end = Math.min(totalPages, page + 2);

  for (let p = start; p <= end; p++) {
    pages.push(p);
  }

  return (
    <div className="pagination">
      <button
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
      >
        ‹
      </button>
      {pages.map((p) => (
        <button
          key={p}
          className={p === page ? 'active' : ''}
          onClick={() => onPageChange(p)}
        >
          {p}
        </button>
      ))}
      <button
        disabled={page === totalPages}
        onClick={() => onPageChange(page + 1)}
      >
        ›
      </button>
    </div>
  );
};

export default Pagination;
