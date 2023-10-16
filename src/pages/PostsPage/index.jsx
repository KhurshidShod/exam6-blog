import { useCallback, useEffect, useState } from "react";
import styles from "./PostsPage.module.scss";
import request from "../../server/request";
import PostCard from "../../components/postcard";
const PostsPage = () => {
  const [categories, setCategories] = useState(null);
  const [page, setPage] = useState(1);
  const [posts, setPosts] = useState(null);
  const [pagination, setPagination] = useState(null);
  const [search, setSearch] = useState("");
  const LIMIT = 5;

  const getCategories = () => {
    request
      .get("category")
      .then((res) => {
        setCategories(res.data.data)
        console.log(res.data.paginationfopa)
      })
      .catch((err) => console.log(err));
  };

  const getData = useCallback(() => {
    request
      .get("post", { params: { page, search, limit: LIMIT } })
      .then((res) => console.log(res.data.data))
      .catch((err) => console.log(err));
      
  }, [page, search]);
  useEffect(() => {
    getCategories();
    getData()
  }, [getData]);
  return (
    <section className={styles.allposts}>
      <div className="container">
        <div className={styles.allposts__wrapper}>
          <div className={styles.allposts__wrapper_controls}>
            <input type="text" placeholder="Searching..." name="" id="" />
            <select name="" id="">
              {categories?.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
          <h1>All posts</h1>
          <div className={styles.allposts__wrapper_cards}>
            {/* {posts?.map(post => <PostCard total: setPage, page, limit />)} */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PostsPage;
