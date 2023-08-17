import React from 'react';

const PaginationList = ({ currentPage, totalPages, handlePageChange }) => {
    const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

    return (
        <div className='pagination'>
            <div className='page-numbers'>
                {pageNumbers.map((pageNumber) => (
                    <button
                        key={pageNumber}
                        className={`pagination-btn ${pageNumber === currentPage ? 'active' : ''}`}
                        onClick={() => handlePageChange(pageNumber)}
                    >
                        {pageNumber}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default PaginationList;