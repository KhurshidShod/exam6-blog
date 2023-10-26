import { Fragment, useCallback, useEffect, useState } from "react";
import styles from "./PostsPage.module.scss";
import request from "../../server/request";
import PostCard from "../../components/postcard";
import Pagination from "../../components/pagination";
import AllPostsCardLoading from "../../components/loaders/allpostscardloader";
const PostsPage = () => {
  const [categories, setCategories] = useState(null);
  const [page, setPage] = useState(1);
  const [posts, setPosts] = useState(null);
  const [pagination, setPagination] = useState(null);
  const [search, setSearch] = useState("");
  const [catId, setCatId] = useState("all");
  const [loading, setLoading] = useState(false);
  const LIMIT = 5;

  const getCategories = () => {
    request
      .get("category")
      .then((res) => {
        setCategories(res.data.data);
      })
      .catch((err) => console.log(err));
  };

  const getData = useCallback(() => {
    setLoading(true);
    request
      .get("post", {
        params:
          catId === "all"
            ? { page, search, limit: LIMIT }
            : { page, search, limit: LIMIT, category: catId },
      })
      .then((res) => {
        setPosts(res.data.data);
        setPagination(res.data.pagination);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [page, search, catId]);
  useEffect(() => {
    getCategories();
    getData();
  }, [getData]);
  return (
    <section className={styles.allposts}>
      <div className="container">
        <div className={styles.allposts__wrapper}>
          <div className={styles.allposts__wrapper_controls}>
            <input
              onChange={(e) => {
                setPage(1);
                setSearch(e.target.value);
              }}
              type="text"
              placeholder="Searching..."
              name=""
              id=""
            />
            <select
              name=""
              id=""
              onChange={(e) => {
                setPage(1);
                setCatId(e.target.value);
              }}
            >
              <option value="all">All</option>
              {categories?.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
          <h1 className={styles.allposts__wrapper_header}>All posts</h1>
          <div className={styles.allposts__wrapper_cards}>
            {loading ? (
              <Fragment>
                <AllPostsCardLoading />
                <AllPostsCardLoading />
                <AllPostsCardLoading />
                <AllPostsCardLoading />
                <AllPostsCardLoading />
                <AllPostsCardLoading />
              </Fragment>
            ) : (
              <Fragment>
                {posts?.map((post) => (
                  <PostCard
                    key={post._id}
                    category={post.category.name}
                    title={post.title}
                    description={post.description}
                    image={post.photo._id}
                    id={post._id}
                  />
                ))}
              </Fragment>
            )}
          </div>
          {posts?.length ? (
            <Pagination
              total={pagination && pagination.total}
              setPage={setPage}
              page={page}
              limit={LIMIT}
              top={0}
            />
          ) : null}
        </div>
      </div>
    </section>
  );
};

export default PostsPage;
