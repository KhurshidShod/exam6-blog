import styles from "./PopularBlogCard.module.scss";
import Img from "../../assets/images/card.png";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const PopularBlogCard = ({ id, image, title, poster, date, desc }) => {
    const navigate = useNavigate()
  const moths = [
    "Jan",
    "Feb",
    "Mar",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
    "Jan",
  ];
  return (
    <div className={styles.card} onClick={() => navigate(`/post/${id}`)}>
      <div className={styles.card__image}>
        <img src={image.includes("http") ? image : Img} alt="" />
      </div>
      <div className={styles.card__content}>
        <h5>
          By <span>{poster}</span> |{" "}
          {`${moths[new Date(date).getMonth()]} ${new Date(
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
