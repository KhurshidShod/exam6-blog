import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { onImageError } from "../../utils/ImageErrorHandle";
import request from "../../server/request";
import UserNotFound from "../../assets/images/userNotFound.webp";
import Img from "../../assets/images/noPostPhoto.png";

import styles from "./PostPage.module.scss";
import { expendedMonths } from "../../utils/mothes";

const PostPage = () => {
  const postId = useParams().id;
  const [post, setPost] = useState(null);
  const getPost = useCallback(async () => {
    await request
      .get(`post/${postId}`)
      .then((res) => {
        setPost(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, [postId]);

  useEffect(() => {
    getPost();
  }, [getPost]);
  return (
    <section className={styles.post}>
      <div className="container">
        <div className={styles.post__wrapper}>
          <div className={styles.post__wrapper_img}>
            <img
              onError={(e) => onImageError(e, Img)}
              src={`https://ap-blog-backend.up.railway.app/upload/${post?.photo._id}.jpg`}
              alt=""
            />
          </div>
          <div className={styles.post__wrapper_content}>
            <div className={styles.post__wrapper_content_user}>
              <img
                onError={(e) => onImageError(e, UserNotFound)}
                src={`https://ap-blog-backend.up.railway.app/api/v1/upload/${post?.user.photo}`}
                alt=""
              />
              <div>
                <h4>{post?.user.username}</h4>
                <p>
                  Posted on {new Date(post?.createdAt).getDate()}
                  {new Date(post?.createdAt).getDate().toString()[1] === "1"
                    ? "st"
                    : new Date(post?.createdAt).getDate().toString()[1] === "1"
                    ? "nd"
                    : new Date(post?.createdAt).getDate().toString()[1] === "3"
                    ? "rd"
                    : "th"}{" "}
                  {expendedMonths[new Date(post?.createdAt).getMonth()]}{" "}
                  {new Date(post?.createdAt).getFullYear()}
                </p>
              </div>
            </div>
            <div className={styles.post__wrapper_content_text}>
              <h1>{post?.title}</h1>
              <h3>
                {post?.category.name} (
                {post?.tags.map((tag) => (
                  <span key={tag}>#{tag}</span>
                ))}
                )
              </h3>
              <p>{post?.description}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PostPage;
