import styles from "./Pagination.module.scss";

const Pagination = ({ total, setPage, page, limit, top }) => {
  const goToTop = () => {
    window.scrollTo({top, behavior: 'smooth'})
  };
  return (
    <div className={styles.pagination}>
      <ul>
        <li
          className={`${page === 1 ? styles.disabled : null}`}
          onClick={() => {
            if (page > 1) {
              setPage(page - 1);
              goToTop()
            }
          }}
        >
          {"< Prev"}
        </li>
        {Array(Math.ceil(total / limit))
          .fill(0)
          .map((el, idx) => (
            <li
              key={idx}
              onClick={() => {
                setPage(idx + 1)
                goToTop()
            }}
              className={`${page === idx + 1 ? styles.active : null}`}
            >
              <p>{idx + 1}</p>
            </li>
          ))}
        <li
          className={`${
            page === Math.ceil(total / 4) ? styles.disabled : null
          }`}
          onClick={() => {
            if (page < Math.ceil(total / 4)) {
              setPage(page + 1);
              goToTop()
            }
          }}
        >
          {"Next >"}
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
