import styles from "./PostCard.module.scss";
import img from "../../assets/images/card.png";
import PropTypes from "prop-types";

const PostCard = ({ category, title, description, image }) => {
  return (
    <div className={styles.card}>
      <div className={styles.card__image}>
        <img src={image.includes("http") ? image : img} alt="" />
      </div>
      <div className={styles.card__content}>
        <h5>{category}</h5>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
    </div>
  );
};

PostCard.propTypes = {
  category: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
};

export default PostCard;
