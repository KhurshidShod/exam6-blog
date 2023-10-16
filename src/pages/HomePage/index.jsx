import { Link } from "react-router-dom";
import styles from "./HomePage.module.scss";
import { Fragment, useEffect, useState } from "react";
import PopularBlogCard from "../../components/popularblogcard";
import request from "../../server/request";
import CategoryCard from "../../components/categorycard";
import Slider from "react-slick";

const HomePage = () => {
  const [popularBlogs, setPopularBlogs] = useState(null);
  const [categories, setCategories] = useState(null);

  const getPopularPosts = async () => {
    await request
      .get("post/lastones")
      .then((res) => setPopularBlogs(res.data))
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
        breakpoint: 500,
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
              <h4>
                Posted on <b>startup</b>
              </h4>
              <h1>Step-by-step guide to choosing great font pairs</h1>
              <h5>
                By <span>James West</span> | May 23, 2022{" "}
              </h5>
              <p>
                Duis aute irure dolor in reprehenderit in voluptate velit esse
                cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                cupidatat non proident.
              </p>
              <Link to="/aboutus">
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
                    key={blog._id}
                    id={blog._id}
                    image={blog.photo.name}
                    title={blog.title}
                    poster={blog.user.username}
                    date={blog.createdAt}
                    desc={blog.description}
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
                    image={cat.photo.name}
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
