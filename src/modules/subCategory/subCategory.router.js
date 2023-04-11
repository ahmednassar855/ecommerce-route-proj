import express from 'express'
import * as subCategory from './subCategory.controller.js'
import { validation } from './../../middleware/validatation.js';
import { createSubCategorySchema, getSubCategorySchema, updateSubCategorySchema } from './subCatgeory.validation.js';

const subCategoryRouter = express.Router({mergeParams : true})


subCategoryRouter.route('/')
.post(validation(createSubCategorySchema) ,subCategory.createdSubCategory)
.get(subCategory.getAllSubCategories)

subCategoryRouter.route('/:id')
.get(validation(getSubCategorySchema) ,subCategory.getSubCategory)
.delete(validation(getSubCategorySchema), subCategory.deleteSubCatgeory)
.put(validation(updateSubCategorySchema),subCategory.updateSubCatgeory)


export default subCategoryRouter