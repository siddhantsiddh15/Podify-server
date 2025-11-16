import * as yup from 'yup';
import mongoose from 'mongoose';

// Minimum length (8–12 chars recommended).

// At least one uppercase letter.

// At least one lowercase letter.

// At least one digit.

// At least one special character.

// No whitespace.
// const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

// At least one letter, one number, and one special character
import { strongPasswordRegex } from '#/utils/constants';

export const createUserSchema = yup.object({
    name: yup
    .string()
    .trim()
    .required("Name is missing")
    .min(3, "Name is too short")
    .max(50, "Name is too long"),

    // email validation
    email: yup
    .string()
    .trim()
    .email("Invalid email")
    .required("Email is missing"),

    // password validation
    password: yup
    .string()
    .trim()
    .required("Password is missing")
    .min(8, "Password is too short")
    .matches(strongPasswordRegex, "Password is too simple")
})


export const updatePasswordSchema = yup.object().shape({
    token: yup.
    string().
    trim().
    required('Invalid token'),

    userId: yup
    .string()
    .transform(function (value){
         // Validate : must be string and valid objectId
        if(typeof value === 'string' && mongoose.Types.ObjectId.isValid(value)){
            return value;
        }
        return ''
    })
    .required('Invalid User ID'),

    password: yup
        .string()
        .trim()
        .required("Password is missing")
        .min(8, "Password is too short")
        .matches(strongPasswordRegex, "Password is too simple")
})