import { Link } from "react-router-dom";
import styles from "./HomePage.module.scss";
import { Fragment, useEffect, useState } from "react";
import PopularBlogCard from "../../components/popularblogcard";
import request from "../../server/request";
import CategoryCard from "../../components/categorycard";
import Slider from "react-slick";
import { months } from "../../utils/mothes";
import img from "../../assets/images/homehero.png";

const HomePage = () => {
  const [popularBlogs, setPopularBlogs] = useState(null);
  const [categories, setCategories] = useState(null);
  const [heroData, setHeroData] = useState(null);
  const [loading, setLoading] = useState({
    popPosts: false,
    heroData: false,
    catData: false,
  });

  const getPopularPosts = async () => {
    await request
      .get("post/lastones")
      .then((res) => {
        setPopularBlogs(res.data);
      })
      .catch((err) => console.log(err));
  };
  const getHeroData = async () => {
    await request
      .get("post/lastone")
      .then((res) => {
        setHeroData(res.data);
      })
      .catch((err) => console.log(err));
  };
  const getCategories = async () => {
    await request
      .get("category")
      .then((res) => setCategories(res.data.data))
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getPopularPosts();
    getCategories();
    getHeroData();
  }, []);
  console.log(popularBlogs);

  const settings = {
    autoplay: true,
    autoplaySpeed: 2000,
    dots: false,
    draggable: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 850,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 575,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <Fragment>
      <section className={styles.home}>
        <div className={styles.home__overlay}>
          <div className="container">
            <div className={styles.home__wrapper}>
              <img
                src={
                  heroData?.photo?.name.includes("http")
                    ? heroData?.photo?.name
                    : img
                }
                alt=""
              />
              <h4>
                Posted on <b>{heroData?.category.name}</b>
              </h4>
              <h1>{heroData?.title}</h1>
              <h5>
                By <span>{heroData?.user.username}</span> |{" "}
                {months[new Date(heroData?.createdAt).getMonth()]}{" "}
                {new Date(heroData?.createdAt).getDate()},{" "}
                {new Date(heroData?.createdAt).getFullYear()}
              </h5>
              <p>{heroData?.description}</p>
              <Link to={`post/${heroData?._id}`}>
                <button>Read More</button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className={styles.popular_blogs}>
        <div className="container">
          <div className={styles.popular_blogs__wrapper}>
            <h1>Popular blogs</h1>
            <div className={styles.popular_blogs__wrapper_cards}>
              <Slider {...settings}>
                {popularBlogs?.map((blog) => (
                  <PopularBlogCard
                    key={blog?._id}
                    id={blog?._id}
                    image={blog?.photo?._id}
                    title={blog?.title}
                    poster={blog?.user.username}
                    date={blog?.createdAt}
                    desc={blog?.description}
                  />
                ))}
              </Slider>
            </div>
          </div>
        </div>
      </section>
      <section className={styles.categories}>
        <div className="container">
          <div className={styles.categories__wrapper}>
            <h1>Choose A Category</h1>
            <div className={styles.categories__wrapper_cards}>
              <Slider {...settings}>
                {categories?.map((cat) => (
                  <CategoryCard
                    key={cat._id}
                    id={cat._id}
                    image={cat.photo._id}
                    name={cat.name}
                    desc={cat.description}
                  />
                ))}
              </Slider>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default HomePage;
