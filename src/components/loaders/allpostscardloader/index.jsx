import styles from "./AllPostsCardLoading.module.scss";

const AllPostsCardLoading = () => {
  return (
    <div className={styles.card}>
      <span className={styles.card__img}></span>
      <div className={styles.card__content}>
        <span className={styles.card__content_first}></span>
        <span className={styles.card__content_second}></span>
        <span className={styles.card__content_third}></span>
      </div>
    </div>
  );
};

export default AllPostsCardLoading;
