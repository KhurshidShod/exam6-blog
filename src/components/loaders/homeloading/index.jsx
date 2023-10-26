import styles from "./HomeLoader.module.scss";

const HomeLoader = () => {
  return (
    <section>
      <div className="container">
        <div className={styles.home_loader__wrapper}>
          <span className={styles.first}></span>
          <span className={styles.second}></span>
          <span className={styles.second}></span>
          <span className={styles.first}></span>
          <span className={styles.third}></span>
          <span className={styles.third}></span>
        </div>
      </div>
    </section>
  );
};

export default HomeLoader;
