import { useParams } from "react-router-dom";
import styles from "./CategoryPage.module.scss";
import { useCallback, useEffect, useState } from "react";
import request from "../../server/request";
import PostCard from "../../components/postcard";
import Pagination from "../../components/pagination";
const CategoryPage = () => {
  const categoryName = useParams().categoryName;

  const [category, setCategory] = useState(null);
  const [posts, setPosts] = useState(null);
  const [pagination, setPagination] = useState(null);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const LIMIT = 4;

  const getPosts = useCallback(async () => {
    await request
      .get("post", {
        params: { category: categoryName, search, limit: LIMIT, page },
      })
      .then((res) => {
        console.log(res.data);
        setPosts(res.data.data);
        setPagination(res.data.pagination);
      })
      .catch((err) => console.log(err));
  }, [categoryName, search, page]);

  const getCategory = useCallback(async () => {
    await request
      .get(`category/${categoryName}`)
      .then((res) => setCategory(res.data))
      .catch((err) => console.log(err));
  }, [categoryName]);

  useEffect(() => {
    getCategory();
    getPosts();
  }, [getCategory, getPosts]);

  return (
    <section className={styles.category}>
      <div className={styles.category__header}>
        <h1>{category?.name}</h1>
        <p>{category?.description}</p>
      </div>
      <div className="container">
        <div className={styles.category__wrapper}>
          <input
            type="text"
            name=""
            id=""
            placeholder="Searching..."
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className={styles.category__wrapper_cards}>
            {posts?.map((post) => (
              <PostCard
                key={post._id}
                title={post.title}
                description={post.description}
                image={post.photo._id}
              />
            ))}
          </div>
          <Pagination
            setPage={setPage}
            page={page}
            total={pagination && pagination.total}
            limit={LIMIT}
            top={350}
          />
        </div>
      </div>
    </section>
  );
};

export default CategoryPage;
