import styles from "./CategoryCard.module.scss";
import Img from "../../assets/images/defaultCatImg.svg";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { onImageError } from "../../utils/ImageErrorHandle";

const CategoryCard = ({ id, image, name, desc }) => {

  return (
    <Link to={`/${id}`} className={styles.card}>
      <img
        onError={(e) => onImageError(e, Img)}
        src={`https://ap-blog-backend.up.railway.app/upload/${image}.jpg` && Img}
        alt="Server error"
      />
      <h1>{name}</h1>
      <p>{desc}</p>
    </Link>
  );
};

CategoryCard.propTypes = {
  image: PropTypes.string,
  name: PropTypes.string,
  desc: PropTypes.string,
};

export default CategoryCard;
