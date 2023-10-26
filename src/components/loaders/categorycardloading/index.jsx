import styles from './CategoryCardLoading.module.scss'

const CategoryCardLoading = () => {
  return (
    <div className={styles.card}>
        <span className={styles.card__first}></span>
        <span className={styles.card__second}></span>
        <span className={styles.card__third}></span>
    </div>
  )
}

export default CategoryCardLoading;