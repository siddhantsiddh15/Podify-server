import { error } from "console";
import { RequestHandler } from "express";
import * as yup from 'yup';

export const validate = (schema : yup.ObjectSchema<any>) : RequestHandler => {
    return async (req, res, next) => {
        // check body exists
        if(!req.body || Object.keys(req.body).length === 0){
            return res.status(400).json({error : 'Empty body is not accepted'})
        }

        try {
            // add validation to the body
            await schema.validate(req.body, {abortEarly : false}) // abortEarly : false will report all the errors
            return next()
        }catch(err : any){
            if(err instanceof yup.ValidationError){
                return res.status(400).json({errors: err.errors})
            }
            return res.status(500).json({error})
        }

        // in case of unknown errors this will be default 
    }
}