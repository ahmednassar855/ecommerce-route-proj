import Joi from "joi";

export const createProductSchema = Joi.object({
    name : Joi.string().min(2).max(20).required(),
    price : Joi.number().min(0),
    priceAfterDiscount : Joi.number().min(0),
    ratingAvg : Joi.number().min(0).max(5),
    ratingCount: Joi.number().min(0),
    description :  Joi.string().min(2).max(800).required(),
    quantity: Joi.number().min(0),
    sold: Joi.number().min(0),

    category: Joi.string().hex().length(24).required(),
    subCategory: Joi.string().hex().length(24).required(),
    brand: Joi.string().hex().length(24).required()
})

export const getProductSchema = Joi.object({
    id : Joi.string().hex().length(24).required()
})

export const updateProductSchema = Joi.object({
    name : Joi.string().min(2).max(20),
    id : Joi.string().hex().length(24).required(),
    price : Joi.number().min(0),
    priceAfterDiscount : Joi.number().min(0),
    ratingAvg : Joi.number().min(0).max(5),
    ratingCount: Joi.number().min(0),
    description :  Joi.string().min(2).max(800),
    quantity: Joi.number().min(0),
    sold: Joi.number().min(0),
    category: Joi.string().hex().length(24),
    subCategory: Joi.string().hex().length(24),
    brand: Joi.string().hex().length(24)
})