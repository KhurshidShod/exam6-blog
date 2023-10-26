import styles from './PopularPostLoading.module.scss'

const PopularPostCardLoader = () => {
  return (
    <div className={styles.card}>
        <div className={styles.card__img}></div>
        <span className={styles.card__first}></span>
        <span className={styles.card__second}></span>
        <span className={styles.card__third}></span>
    </div>
  )
}

export default PopularPostCardLoader