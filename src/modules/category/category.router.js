import express from 'express'
import * as category from './category.controller.js'
import subCategoryRouter from '../subCategory/subCategory.router.js'
import { validation } from '../../middleware/validatation.js'
import { createCategorySchema, getCategorySchema, updateCategorySchema } from './catgeory.validation.js'
import { uploadSingleFile } from '../../middleware/fileUpload.js'

const categoryRouter = express.Router()



categoryRouter.use('/:categoryId/subcategories' , subCategoryRouter)

categoryRouter.route('/')
.post(uploadSingleFile('image' , 'category'),validation(createCategorySchema),category.createdCategory)
.get(category.getAllCategories)



categoryRouter.route('/:id')
.get(validation(getCategorySchema),category.getCategory)
.delete(validation(getCategorySchema),category.deleteCatgeory)
.put(uploadSingleFile('image' , 'category'),validation(updateCategorySchema),category.updateCatgeory)
// categoryRouter.post('/', createdCategory)
// categoryRouter.get('/', getAllCategories)
// categoryRouter.delete('/', deleteCatgeory)



export default categoryRouter