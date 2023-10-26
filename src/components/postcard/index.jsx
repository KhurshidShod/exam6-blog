import styles from "./PostCard.module.scss";
import img from "../../assets/images/noPostPhoto.png";
import PropTypes from "prop-types";
import { onImageError } from "../../utils/ImageErrorHandle";
import { useNavigate } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";


const PostCard = ({ id, category, title, description, image }) => {
  const navigate = useNavigate()
  return (
    <div onClick={() => navigate(`/post/${id}`)} className={styles.card}>
      <div className={styles.card__image}>
        <LazyLoadImage effect="blur" onError={(e) => onImageError(e, img)} src={`https://ap-blog-backend.up.railway.app/upload/${image}.jpg`} alt="" />
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
  id: PropTypes.string,
  category: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
};

export default PostCard;
