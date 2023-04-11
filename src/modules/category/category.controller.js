import { categoryModel } from "../../../databases/models/catgeory.model.js"
import slugify from "slugify"
import { catchAsyncHandler } from "../../middleware/catchAsyncHandler.js"
import { AppError } from './../../utils/AppError.js';
import * as factory from "../handler/factor.handler.js";
import { ApiFeatures } from "../../utils/ApiFeatures.js";



const createdCategory = catchAsyncHandler (async (req, res ,next) => {
    req.body.slug = slugify(req.body.name)
    req.body.image = req.file.filename 
    let result = new categoryModel(req.body)
    await result.save()
    res.status(200).json({ message: "success", result })
})

const getAllCategories = catchAsyncHandler(async (req, res, next) => {
    let apiFeature =  new ApiFeatures(categoryModel.find() ,req.query)
    .paginate().fields().filter().sort().search()

    let result = await apiFeature.mongooseQuery
    res.status(200).json({ message: "success", page : apiFeature.page, result })
})

const getCategory = factory.getOneDocument(categoryModel)

const updateCatgeory = catchAsyncHandler(async (req, res,next) => {
    const { id } = req.params
    req.body.slug = slugify(req.body.name)
    req.body.image = req.file.filename 
    let result = await categoryModel.findByIdAndUpdate(id, req.body , { new : true })
    !result && next( new AppError(`category not found ` , 404) )
    result &&  res.status(200).json({ message: "success", result })
})

const deleteCatgeory = factory.deleteOne(categoryModel)

export {
    createdCategory,
    deleteCatgeory,
    getAllCategories,
    updateCatgeory,
    getCategory
}