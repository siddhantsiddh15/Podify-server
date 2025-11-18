import * as yup from 'yup';

export const signInValidationSchema =  yup.object().shape({
    email : yup.string()
    .email()
    .required("Email is required"),

    password : yup.string().required("Password is required")
})