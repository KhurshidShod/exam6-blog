import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import request from "../../server/request";
import Cookies from "js-cookie";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import { Upload } from "antd";

import styles from "./AccountPage.module.scss";

const AccountPage = () => {
  const [readOnly, setReadOnly] = useState(true);
  const [btnLoading, setBtnLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      userData: {
        first_name: "",
        last_name: "",
        username: "",
        email: "",
        phoneNumber: "",
        address: "",
        birthday: "",
      },
      passwordData: {
        currentPassword: "",
        newPassword: "",
      },
    },
  });

  const getUser = useCallback(async () => {
    request
      .get("auth/me", {
        headers: {
          Authorization: "Bearer " + Cookies.get("token"),
        },
      })
      .then((res) => {
        setValue("userData", {
          first_name: res.data.first_name,
          last_name: res.data.last_name,
          username: res.data.username,
          phoneNumber: res.data.phoneNumber,
          address: res.data.address,
          email: res.data.email,
          birthday: res.data.birthday,
        });
        console.log(res.data.photo);
        setImageUrl(res?.data?.photo);
      })
      .catch((err) => console.log(err));
  }, [setValue]);

  const handleChange = async (file) => {
    const image = new FormData();
    image.append("file", file.file.originFileObj);
    request
      .post("upload", image, {
        headers: {
          Authorization: "Bearer " + Cookies.get("token"),
        },
      })
      .then((res) => {
        request
          .put(
            "auth/details",
            { photo: res.data._id },
            {
              headers: {
                Authorization: "Bearer " + Cookies.get("token"),
              },
            }
          )
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
    getUser();
  };

  useEffect(() => {
    getUser();
  }, [getUser]);

  const onSubmit = (data) => {
    if (readOnly) {
      console.log(data.passwordData);
      setBtnLoading(true);
      if (data.passwordData.newPassword !== "") {
        request.get("auth/password", data.passwordData, {
          headers: {
            Authorization: "Bearer" + Cookies.get("token"),
          },
        });
      }
      request
        .put("auth/details", data.userData, {
          headers: {
            Authorization: "Bearer " + Cookies.get("token"),
          },
        })
        .then((res) => {
          getUser();
          toast.success("Infos changed successfully!");
        })
        .catch((err) => console.log(err))
        .finally(() => setBtnLoading(false));
    }
  };
  return (
    <section className={styles.account}>
      <div className="container">
        <div className={styles.account__wrapper}>
          <h1>Account</h1>
          <Upload
            name="avatar"
            listType="picture-card"
            style={{
              width: "100%",
              height: "250px",
              backgroundColor: "red",
              borderRadius: "15px",
            }}
            className="avatar-uploader"
            showUploadList={false}
            action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
            onChange={handleChange}
          >
            {imageUrl ? (
              <img
                src={`https://ap-blog-backend.up.railway.app/upload/${imageUrl}.jpg`}
                alt="avatar"
                style={{
                  width: "250px",
                  height: "250px",
                  borderRadius: "15px",
                }}
              />
            ) : (
              <div
                style={{
                  width: "250px",
                  height: "250px",
                }}
              >
                {loading ? <LoadingOutlined /> : <PlusOutlined />}
                <div
                  style={{
                    marginTop: 8,
                  }}
                >
                  Upload
                </div>
              </div>
            )}
          </Upload>
          <form action="" onSubmit={handleSubmit(onSubmit)}>
            <input
              className={`${readOnly ? styles.inpReadOnly : null}`}
              readOnly={readOnly}
              type="text"
              {...register("userData.first_name")}
              placeholder="Firstname"
            />
            <input
              className={`${readOnly ? styles.inpReadOnly : null}`}
              readOnly={readOnly}
              type="text"
              {...register("userData.last_name")}
              placeholder="Lastname"
            />
            <input
              className={`${readOnly ? styles.inpReadOnly : null}`}
              readOnly={readOnly}
              type="text"
              {...register("userData.username")}
              placeholder="Username"
            />
            <input
              className={`${readOnly ? styles.inpReadOnly : null}`}
              readOnly={readOnly}
              type="tel"
              {...register("userData.phoneNumber")}
              placeholder="Phone number"
            />
            <input
              className={`${readOnly ? styles.inpReadOnly : null}`}
              readOnly={readOnly}
              type="email"
              {...register("userData.email")}
              placeholder="Email"
            />
            <input
              className={`${readOnly ? styles.inpReadOnly : null}`}
              readOnly={readOnly}
              type="text"
              {...register("userData.address")}
              placeholder="Address"
            />
            <input
              className={`${readOnly ? styles.inpReadOnly : null}`}
              readOnly={readOnly}
              type="date"
              {...register("userData.birthday")}
              placeholder="Birthday"
            />
            <input
              className={`${readOnly ? styles.inpReadOnly : null}`}
              readOnly={readOnly}
              type="text"
              {...register("passwordData.currentPassword")}
              placeholder="Password"
            />
            <input
              className={`${readOnly ? styles.inpReadOnly : null}`}
              readOnly={readOnly}
              type="text"
              {...register("passwordData.newPassword")}
              placeholder="New password"
            />
            <button
              className={`${(readOnly && !btnLoading) ? styles.btnReadOnly : btnLoading ? styles.btnLoading : null}`}
              type={(readOnly && btnLoading) ? null : "submit"}
              onClick={() => !btnLoading && setReadOnly(!readOnly)}
            >
              {(readOnly && !btnLoading) ? "Edit" : "Save"}
              {btnLoading ? (
                <div className="btn_loader">
                  <div className="bar1"></div>
                  <div className="bar2"></div>
                  <div className="bar3"></div>
                  <div className="bar4"></div>
                  <div className="bar5"></div>
                  <div className="bar6"></div>
                  <div className="bar7"></div>
                  <div className="bar8"></div>
                  <div className="bar9"></div>
                  <div className="bar10"></div>
                  <div className="bar11"></div>
                  <div className="bar12"></div>
                </div>
              ) : null}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AccountPage;
