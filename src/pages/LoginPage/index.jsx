import { useFormik } from "formik";
import styles from "./LoginPage.module.scss";
import loginSchema from "../../schema/loginSchema";
import request from "../../server/request";
import { toast } from "react-toastify";
import { useContext, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { AuthContext } from "../../context/isAuthContext";

const LoginPage = () => {
  const [isAuth, setIsAuth] = useContext(AuthContext);
  const [btnLoading, setBtnLoading] = useState(false);

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      setBtnLoading(true);
      request
        .post("auth/login", {
          username: values.username,
          password: values.password,
        })
        .then((res) => {
          setIsAuth(true);
          Cookies.set("token", res.data.token);
          navigate("/");
        })
        .catch((err) => toast.error(`${err.response.data}`))
        .finally(() => setBtnLoading(false));
      formik.resetForm();
    },
  });

  return (
    <section className={styles.login}>
      <div className="container">
        <div className={styles.login__wrapper}>
          <h1>Login</h1>
          <form onSubmit={formik.handleSubmit} action="">
            <div>
              <input
                autoComplete="off"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.username}
                type="text"
                name="username"
                id="username"
                placeholder="Username"
              />
              <span>
                {formik.touched.username && formik.errors.username
                  ? `${formik.errors.username}`
                  : null}
              </span>
            </div>
            <div>
              <input
                autoComplete="off"
                type="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                name="password"
                id="password"
                placeholder="Password"
              />
              <span>
                {formik.touched.password && formik.errors.password
                  ? `${formik.errors.password}`
                  : null}
              </span>
            </div>
            <button disabled={btnLoading} type="submit">
              Login {btnLoading ? <AiOutlineLoading3Quarters /> : null}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
