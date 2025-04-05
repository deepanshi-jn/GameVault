
import { useSearchParams } from "react-router-dom";
import "./Pagination.css";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Change page function
  const changePage = (page) => {
    if (page < 1 || page > totalPages) return;

    searchParams.set("page", page);
    setSearchParams(searchParams);
    onPageChange(page);

    // Smooth scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Generate page numbers based on the design
  const renderPageNumbers = () => {
    if (totalPages <= 1) return null; // Hide pagination if only one page

    const pageNumbers = [];
    const visiblePageCount = 5; // Show 5 page numbers at most

    // Previous Button
    pageNumbers.push(
      <li key="prev" className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
        <button className="page-link" onClick={() => changePage(currentPage - 1)}>
          &lt;
        </button>
      </li>
    );

    // Page numbers (1, 2, 3, 4, 5)
    for (let i = 1; i <= Math.min(visiblePageCount, totalPages); i++) {
      pageNumbers.push(
        <li key={i} className={`page-item ${i === currentPage ? "active" : ""}`}>
          <button className="page-link" onClick={() => changePage(i)}>
            {i}
          </button>
        </li>
      );
    }

    // Ellipsis
    if (totalPages > visiblePageCount) {
      pageNumbers.push(
        <li key="ellipsis" className="page-item disabled">
          <span className="page-link ellipsis">...</span>
        </li>
      );
    }

    // Last page number (10)
    if (totalPages > visiblePageCount) {
      pageNumbers.push(
        <li key={totalPages} className={`page-item ${totalPages === currentPage ? "active" : ""}`}>
          <button className="page-link" onClick={() => changePage(totalPages)}>
            {totalPages}
          </button>
        </li>
      );
    }

    // Next Button
    pageNumbers.push(
      <li key="next" className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
        <button className="page-link prev-next" onClick={() => changePage(currentPage + 1)}>
          &gt;
        </button>
      </li>
    );

    return pageNumbers;
  };

  return (
    <nav className="pagination-container">
      <ul className="pagination">{renderPageNumbers()}</ul>
    </nav>
  );
};

export default Pagination;