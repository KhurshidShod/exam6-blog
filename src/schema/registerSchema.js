import * as yup from 'yup'
const registerSchema = yup.object().shape({
    first_name: yup.string().required("Firstname is required!"),
    last_name: yup.string().required("Lastname is required!"),
    username: yup.string().required("Username is required!"),
    password: yup.string().required("Password is required!").min(5, "Password should be 8 at least!")
})

export default registerSchema;