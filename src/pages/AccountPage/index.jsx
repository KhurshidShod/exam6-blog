import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import request from "../../server/request";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";
import registerSchema from "../../schema/registerSchema";

import styles from "./AccountPage.module.scss";

const AccountPage = () => {
  const [readOnly, setReadOnly] = useState(true);
  const [btnLoading, setBtnLoading] = useState(false);

  const DynamicButton = ({ type, onclick, className }) => {
    return (
      <button type={type} onClick={() => onclick()} className={className}>
        {readOnly ? "Edit" : "Save"}
      </button>
    );
  };

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
      })
      .catch((err) => console.log(err));
  }, [setValue]);

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
            'Authorization': "Bearer" + Cookies.get("token"),
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
        .finally(setBtnLoading(true));
    }
  };
  return (
    <section className={styles.account}>
      <div className="container">
        <div className={styles.account__wrapper}>
          <h1>Account</h1>
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
              className={`${readOnly ? styles.btnReadOnly : null}`}
              type={readOnly ? null : "submit"}
              onClick={() => setReadOnly(!readOnly)}
            >
              {readOnly ? "Edit" : "Save"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AccountPage;
