import express from 'express'
import * as product from './product.controller.js'
import { validation } from './../../middleware/validatation.js';
import { createProductSchema, getProductSchema, updateProductSchema } from './product.validation.js';

const productRouter = express.Router()

productRouter.route('/')
.post(validation(createProductSchema) ,product.createProduct)
.get(product.getAllProducts)

productRouter.route('/:id')
.get(validation(getProductSchema),product.getProduct)
.delete(validation(getProductSchema),product.deleteProduct)
.put(validation(updateProductSchema),product.updateProduct)


export default productRouter