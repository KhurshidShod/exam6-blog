import styles from "./PostCardLoading.module.scss";

const PostComponentLoading = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapper_img}></div>
      <div className={styles.wrapper_content}>
      <div className={styles.wrapper_content_user}>
        <span className={styles.wrapper_content_user_img}></span>
        <div className={styles.wrapper_content_user_info}>
            <span className={styles.wrapper_content_user_info_first}></span>
            <span className={styles.wrapper_content_user_info_second}></span>
        </div>
      </div>
      <span className={styles.wrapper_content_tag}></span>
      <span className={styles.wrapper_content_desc}></span>
      </div>
    </div>
  );
};

export default PostComponentLoading;
