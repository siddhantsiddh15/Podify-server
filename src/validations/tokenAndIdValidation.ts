import * as yup from 'yup';
import mongoose from 'mongoose';

export const tokenAndIdValidation = yup.object().shape({
    token: yup
    .string()
    .trim()
    .required('Invalid token'),

    userId: yup
    .string()
    .transform(function (value) {
        // Validate : must be string and valid objectId
        if(typeof value === 'string' && mongoose.Types.ObjectId.isValid(value)){
            return value;
        }
        return ''
    })
    .required('Invalid User ID')
})
