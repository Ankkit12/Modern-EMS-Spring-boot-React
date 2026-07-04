import React from 'react';
import '../styles/Pagination.css';

export default function Pagination({ page, size, total, onChange }) {
  const totalPages = Math.max(1, Math.ceil(total / size));

  return (
    <div className="pagination">
      <button disabled={page<=0} onClick={() => onChange(page-1)}>Previous</button>
      <span>Page {page+1} of {totalPages}</span>
      <button disabled={page>=totalPages-1} onClick={() => onChange(page+1)}>Next</button>
    </div>
  );
}
