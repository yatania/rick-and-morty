import React from 'react';
import PropTypes from 'prop-types';

export const Pagination = ({ page, nextPage, prevPage }) => {
  const pageNumbers = [];
  let min = page;
  let max = page + 6;

  for (let i = min; i < max; i += 1) {
    pageNumbers.push(i);
  }

  return (
    <nav className="d-flex">
      <button
        type="button"
        onClick={() => prevPage()}
        className="button is-primary"
      >
        Previous
      </button>
      <ul className="pagination-list">
        {pageNumbers.map(pageNumber => (
          <li key={page}>
            <a href="!#" className="pagination-link">
              {pageNumber}
            </a>
          </li>
        ))}
      </ul>
      <button
        type="button"
        onClick={() => nextPage()}
        className="button is-primary"
      >
        Next
      </button>
    </nav>
  );
};

Pagination.propTypes = {
  page: PropTypes.number.isRequired,
};
