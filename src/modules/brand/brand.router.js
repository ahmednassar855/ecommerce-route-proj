import express from 'express'
import * as brand from './brand.controller.js'
import { validation } from '../../middleware/validatation.js'
import { createBrandSchema, getBrandSchema, updateBrandSchema } from './brand.validation.js'
import { uploadSingleFile } from '../../middleware/fileUpload.js'

const brandRouter = express.Router()

brandRouter.route('/')
.post(uploadSingleFile('logo' , 'brand') ,validation(createBrandSchema) ,brand.createBrand)
.get(brand.getAllBrands)
brandRouter.route('/:id')
.get(validation(getBrandSchema) ,brand.getBrand)
.delete(validation(getBrandSchema),brand.deleteBrand)
.put(uploadSingleFile('logo' , 'brand') ,validation(updateBrandSchema),brand.updateBrand)


export default brandRouter