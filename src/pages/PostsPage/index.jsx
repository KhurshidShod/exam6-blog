import { useCallback, useEffect, useState } from "react";
import styles from "./PostsPage.module.scss";
import request from "../../server/request";
import PostCard from "../../components/postcard";
import Pagination from "../../components/pagination";
const PostsPage = () => {
  const [categories, setCategories] = useState(null);
  const [page, setPage] = useState(1);
  const [posts, setPosts] = useState(null);
  const [pagination, setPagination] = useState(null);
  const [search, setSearch] = useState("");
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

  const getData = useCallback(() => {
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
      .catch((err) => console.log(err));
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
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              placeholder="Searching..."
              name=""
              id=""
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
          <h1 className={styles.allposts__wrapper_header}>All posts</h1>
          <div className={styles.allposts__wrapper_cards}>
            {posts?.map((post) => (
              <PostCard
                key={post._id}
                category={post.category.name}
                title={post.title}
                description={post.description}
                image={post.photo._id}
              />
            ))}
          </div>
          <Pagination
            total={pagination && pagination.total}
            setPage={setPage}
            page={page}
            limit={LIMIT}
            top={0}
          />
        </div>
      </div>
    </section>
  );
};

export default PostsPage;
