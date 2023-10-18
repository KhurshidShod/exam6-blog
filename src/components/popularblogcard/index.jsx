import styles from "./PopularBlogCard.module.scss";
import Img from "../../assets/images/noPostPhoto.png";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { months } from "../../utils/mothes";
import { onImageError } from "../../utils/ImageErrorHandle";

const PopularBlogCard = ({ id, image, title, poster, date, desc }) => {
  const navigate = useNavigate();

  return (
    <div className={styles.card} onClick={() => navigate(`/post/${id}`)}>
      <div className={styles.card__image}>
        <img
          onError={(e) => onImageError(e, Img)}
          src={`https://ap-blog-backend.up.railway.app/upload/${image}.jpg`}
          alt=""
        />
      </div>
      <div className={styles.card__content}>
        <h5>
          By <span>{poster}</span> |{" "}
          {`${months[new Date(date).getMonth()]} ${new Date(
            date
          ).getDate()},${new Date(date).getFullYear()}`}
        </h5>
        <h4>{title}</h4>
        <p>{desc}</p>
      </div>
    </div>
  );
};

PopularBlogCard.propTypes = {
  id: PropTypes.string,
  image: PropTypes.string,
  title: PropTypes.string,
  poster: PropTypes.string,
  date: PropTypes.string,
  desc: PropTypes.string,
};

export default PopularBlogCard;
