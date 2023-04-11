import slugify from "slugify"
import { catchAsyncHandler } from "../../middleware/catchAsyncHandler.js"
import { subCategoryModel } from './../../../databases/models/subCategory.model.js';
import { AppError } from './../../utils/AppError.js';
import * as factory from "../handler/factor.handler.js";
import { ApiFeatures } from "../../utils/ApiFeatures.js";


const createdSubCategory = catchAsyncHandler (async (req, res ,next) => {
    req.body.slug = slugify(req.body.name)
    let result = new subCategoryModel(req.body)
    await result.save()
    res.status(200).json({ message: "success", result })
})

const getAllSubCategories = catchAsyncHandler( async (req, res,next) => {
    let filter = {}
    if (req.params.categoryId){
        filter = { category : req.params.categoryId }
    }
    // let result = await subCategoryModel.find(filter)
    // res.status(200).json({ message: "success", result })

    let apiFeature =  new ApiFeatures(subCategoryModel.find(filter) ,req.query)
    .paginate().fields().filter().sort().search()
    let result = await apiFeature.mongooseQuery
    res.status(200).json({ message: "success", page : apiFeature.page, result })
})

const getSubCategory = factory.getOneDocument(subCategoryModel)

const updateSubCatgeory = catchAsyncHandler(async (req, res,next) => {
    const { id } = req.params
    req.body.slug = slugify(req.body.name)
    let result = await subCategoryModel.findByIdAndUpdate(id, req.body , { new : true })
    !result && next( new AppError(`Subcategory not found ` , 404) )
    result &&  res.status(200).json({ message: "success", result })
})

const deleteSubCatgeory = factory.deleteOne(subCategoryModel)

export {
    createdSubCategory,
    deleteSubCatgeory,
    getAllSubCategories,
    updateSubCatgeory,
    getSubCategory
}