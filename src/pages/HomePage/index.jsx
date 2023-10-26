import { Link } from "react-router-dom";
import styles from "./HomePage.module.scss";
import { Fragment, useEffect, useState } from "react";
import PopularBlogCard from "../../components/popularblogcard";
import request from "../../server/request";
import CategoryCard from "../../components/categorycard";
import Slider from "react-slick";
import { months } from "../../utils/mothes";
import img from "../../assets/images/homehero.png";
import { onImageError } from "../../utils/ImageErrorHandle";
import HomeLoader from "../../components/loaders/homeloading";
import PopularPostCardLoader from "../../components/loaders/loadingpopularpost";
import CategoryCardLoading from "../../components/loaders/categorycardloading";

const HomePage = () => {
  const [popularBlogs, setPopularBlogs] = useState(null);
  const [categories, setCategories] = useState(null);
  const [heroData, setHeroData] = useState(null);
  const [popularBlogsLoading, setPopularBlogsLoading] = useState(false);
  const [heroLoading, setHeroLoading] = useState(false);
  const [catLoading, setCatLoading] = useState(false);

  const getPopularPosts = async () => {
    setPopularBlogsLoading(true);
    await request
      .get("post/lastones")
      .then((res) => {
        setPopularBlogs(res.data);
      })
      .catch((err) => console.log(err));
    setPopularBlogsLoading(false);
  };
  const getHeroData = async () => {
    setHeroLoading(true);
    await request
      .get("post/lastone")
      .then((res) => {
        console.log(res.data);
        setHeroData(res.data);
      })
      .catch((err) => console.log(err));
    setHeroLoading(false);
  };
  const getCategories = async () => {
    setCatLoading(true);
    await request
      .get("category")
      .then((res) => setCategories(res.data.data))
      .catch((err) => console.log(err));
    setCatLoading(false);
  };
  useEffect(() => {
    getHeroData();
    getPopularPosts();
    getCategories();
  }, []);

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
                onError={(e) => onImageError(e, img)}
                src={`https://ap-blog-backend.up.railway.app/upload/${heroData?.photo}.jpg`}
                alt=""
              />
              {heroLoading ? (
                <HomeLoader />
              ) : (
                <Fragment>
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
                </Fragment>
              )}
            </div>
          </div>
        </div>
      </section>
      <section className={styles.popular_blogs}>
        <div className="container">
          <div className={styles.popular_blogs__wrapper}>
            <h1>Popular blogs</h1>
            <div className={styles.popular_blogs__wrapper_cards}>
              {popularBlogsLoading ? (
                <div className={styles.popular_blogs__wrapper_cards_loaders}>
                  <PopularPostCardLoader />
                  <PopularPostCardLoader />
                  <PopularPostCardLoader />
                  <PopularPostCardLoader />
                </div>
              ) : (
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
              )}
            </div>
          </div>
        </div>
      </section>
      <section className={styles.categories}>
        <div className="container">
          <div className={styles.categories__wrapper}>
            <h1>Choose A Category</h1>
            <div className={styles.categories__wrapper_cards}>
              {catLoading ? (
                <div className={styles.categories__wrapper_cards_loader}>
                  <CategoryCardLoading />
                  <CategoryCardLoading />
                  <CategoryCardLoading />
                  <CategoryCardLoading />
                </div>
              ) : (
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
              )}
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default HomePage;
