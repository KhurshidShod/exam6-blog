import { useCallback, useEffect, useState } from "react";
import request from "../../server/request";
import Cookies from "js-cookie";
import styles from "./MyPostsPage.module.scss";
import PostCard from "../../components/postcard";

const MyPostsPage = () => {
  const [myPosts, setMyPosts] = useState(null);
  const [page, setPage] = useState(null);
  const [categories, setCategories] = useState(null);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [catId, setCatId] = useState("all");

  const LIMIT = 5;
  const getCategories = () => {
    request
      .get("category")
      .then((res) => {
        setCategories(res.data.data);
      })
      .catch((err) => console.log(err));
  };
  const getPosts = useCallback(async () => {
    request
      .get("post/user", {
        params: {
          page,
          limit: LIMIT,
          search,
        },
        headers: {
          Authorization: "Bearer " + Cookies.get("token"),
        },
      })
      .then((res) => setMyPosts(res.data.data))
      .catch((err) => console.log(err));
  }, [page, search]);
  useEffect(() => {
    getPosts();
    getCategories();
  }, [getPosts]);
  return (
    <section className={styles.about}>
      <div className="container">
        <div className={styles.about__wrapper}>
          <div className={styles.about__wrapper_header}>
            <h1>My posts</h1>
            <select name="" id="" onChange={(e) => setCatId(e.target.value)}>
              <option value="all">All</option>
              {categories?.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.about__wrapper_controls}>
            <input
              type="text"
              placeholder="Search"
              onChange={(e) => setSearch(e.target.value)}
            />
            <select name="" id="" onChange={(e) => setCatId(e.target.value)}>
              <option value="all">All</option>
              {categories?.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.about__wrapper_cards}>
            {myPosts?.length === 0 ? (
              <p>No posts yet</p>
            ) : (
              myPosts?.map((post) => (
                <PostCard
                  key={post._id}
                  category={post?.category.name}
                  title={post?.title}
                  description={post?.description}
                  image={post?.image._id}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyPostsPage;
