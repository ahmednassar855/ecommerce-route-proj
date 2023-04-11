import slugify from "slugify"
import { catchAsyncHandler } from "../../middleware/catchAsyncHandler.js"
import { AppError } from '../../utils/AppError.js';
import { brandModel } from './../../../databases/models/brand.model.js';
import * as factory from "../handler/factor.handler.js";
import { ApiFeatures } from "../../utils/ApiFeatures.js";


const createBrand = catchAsyncHandler (async (req, res ,next) => {
    req.body.slug = slugify(req.body.name)
    req.body.logo = req.file.filename 
    let result = new brandModel(req.body)
    await result.save()
    res.status(200).json({ message: "success", result })
})

const getAllBrands = catchAsyncHandler(async (req, res, next) => {
    let apiFeature =  new ApiFeatures(brandModel.find() ,req.query)
    .paginate().fields().filter().sort().search()

    let result = await apiFeature.mongooseQuery
    res.status(200).json({ message: "success", page : apiFeature.page, result })
})

const getBrand = factory.getOneDocument(brandModel)

const updateBrand = catchAsyncHandler(async (req, res,next) => {
    const { id } = req.params
    req.body.slug = slugify(req.body.name)
    req.body.logo = req.file.filename 
    let result = await brandModel.findByIdAndUpdate(id, req.body, { new : true })
    !result && next( new AppError(`Brand not found ` , 404) )
    result &&  res.status(200).json({ message: "success", result })

})

const deleteBrand = factory.deleteOne(brandModel)

export {
    createBrand,
    deleteBrand,
    getAllBrands,
    updateBrand,
    getBrand
}