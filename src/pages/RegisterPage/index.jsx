import { useContext, useState } from "react";
import { useFormik } from "formik";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { AuthContext } from "../../context/isAuthContext";
import { toast } from "react-toastify";
import registerSchema from "../../schema/registerSchema";
import request from "../../server/request";
import styles from "./RegisterPage.module.scss";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {

  const navigate = useNavigate()

  const [isAuth, setIsAuth] = useContext(AuthContext);
  const [confirmPassError, setConfirmPassError] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: registerSchema,
    onSubmit: (values) => {
      if (formik.values.confirmPassword === formik.values.password) {
        setBtnLoading(true);
        request
          .post("auth/register", {
            first_name: values.first_name,
            last_name: values.last_name,
            username: values.username,
            password: values.password,
          })
          .then((res) => {
            Cookies.set("token", res.data.token);
            setIsAuth(true);
            toast.success("Registered successfully!");
            navigate("/")
          })
          .catch((err) => toast.error(err.response.data))
          .finally(setBtnLoading(false));
        formik.resetForm();
      } else {
        setConfirmPassError("This should be same with password!");
      }
    },
  });

  return (
    <section className={styles.register}>
      <div className="container">
        <div className={styles.register__wrapper}>
          <h1>Register</h1>
          <form action="" onSubmit={formik.handleSubmit}>
            <div>
              <input
                autoComplete="off"
                type="text"
                name="first_name"
                id="firstname"
                placeholder="Firstname"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.first_name}
              />
              <span>
                {formik.touched.first_name && formik.errors.first_name
                  ? `${formik.errors.first_name}`
                  : null}
              </span>
            </div>
            <div>
              <input
                autoComplete="off"
                type="text"
                name="last_name"
                id="lastname"
                placeholder="Lastname"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.last_name}
              />
              <span>
                {formik.touched.last_name && formik.errors.last_name
                  ? `${formik.errors.last_name}`
                  : null}
              </span>
            </div>
            <div>
              <input
                autoComplete="off"
                type="text"
                name="username"
                id="username"
                placeholder="Username"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.username}
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
                name="password"
                id="password"
                placeholder="Password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
              <span>
                {formik.touched.password && formik.errors.password
                  ? `${formik.errors.password}`
                  : null}
              </span>
            </div>
            <div>
              <input
                type="password"
                autoComplete="off"
                name="confirmPassword"
                placeholder="Confirm password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.confirmPassword}
              />
              <span>
                {confirmPassError.length > 0 ? `${confirmPassError}` : null}
              </span>
            </div>
            <button type="submit">
              Register {btnLoading ? <AiOutlineLoading3Quarters /> : null}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default RegisterPage;
