import { Fragment, useCallback, useEffect, useState } from "react";
import request from "../../server/request";
import Cookies from "js-cookie";
import styles from "./MyPostsPage.module.scss";
import PostCard from "../../components/postcard";
import { CloseOutlined } from "@ant-design/icons";
import { useForm } from "react-hook-form";
import AllPostsCardLoading from "../../components/loaders/allpostscardloader";

const MyPostsPage = () => {
  const [myPosts, setMyPosts] = useState(null);
  const [page, setPage] = useState(null);
  const [categories, setCategories] = useState(null);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      postData: {
        title: "",
        description: "",
        tags: "",
        category: "",
        photo: "",
      },
    },
  });

  const onSubmit = async (data) => {
    const file = new FormData();
    file.append("file", data.postData.photo[0]);
    await request
      .post("upload", file, {
        headers: { Authorization: "Bearer " + Cookies.get("token") },
      })
      .then((res) => {
        console.log(res.data)
        data.postData.photo = res.data._id;
      })
      .catch((err) => console.log(err));
    await request
      .post(
        "post",
        {
          title: data.postData.title,
          description: data.postData.description,
          tags: data.postData.tags.split(" "),
          photo: {
            _id: data.postData.photo,
          },
          category: data.postData.category,
        },
        {
          headers: {
            Authorization: "Bearer " + Cookies.get("token"),
          },
        }
      )
      .then((res) => console.log(res));
    setModalOpen(false);
    getPosts();
  };

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
    setLoading(true);
    await request
      .get("post/user", {
        params:
          category === "all"
            ? {
                search,
              }
            : {
                search,
                category,
              },
        headers: {
          Authorization: "Bearer " + Cookies.get("token"),
        },
      })
      .then((res) => setMyPosts(res.data.data))
      .catch((err) => console.log(err));
    setLoading(false);
  }, [page, search, category]);
  useEffect(() => {
    getPosts();
    getCategories();
  }, [getPosts]);
  return (
    <section className={styles.myposts}>
      {modalOpen ? (
        <div className={styles.post__newpost}>
          <form action="" onSubmit={handleSubmit(onSubmit)}>
            <CloseOutlined
              onClick={() => setModalOpen(false)}
              className={styles.closeModal}
            />
            <input
              {...register("postData.title")}
              type="text"
              placeholder="Title"
            />
            <input
              {...register("postData.description")}
              type="text"
              placeholder="Description"
            />
            <input
              {...register("postData.tags")}
              type="text"
              placeholder="Tags"
            />
            <select
              name=""
              id=""
              {...register("postData.category")}
            >
              {categories?.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
            <input
              type="file"
              placeholder="Photo"
              {...register("postData.photo")}
            />
            <button type="submit">Add post</button>
          </form>
        </div>
      ) : null}
      <div className="container">
        <div className={styles.myposts__wrapper}>
          <div className={styles.myposts__wrapper_header}>
            <h1>My posts</h1>
            <button onClick={() => setModalOpen(true)}>Add post</button>
          </div>
          <div className={styles.myposts__wrapper_controls}>
            <input
              type="text"
              placeholder="Search"
              onChange={(e) => setSearch(e.target.value)}
            />
            <select name="" id="" onChange={(e) => setCategory(e.target.value)}>
              <option value="all">All</option>
              {categories?.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.myposts__wrapper_cards}>
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
                {myPosts?.length === 0 ? (
                  <p>No posts yet</p>
                ) : (
                  myPosts?.map((post) => (
                    <PostCard
                      key={post._id}
                      category={post?.category.name}
                      title={post?.title}
                      description={post?.description}
                      image={post?.photo._id}
                      id={post._id}
                    />
                  ))
                )}
              </Fragment>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyPostsPage;
