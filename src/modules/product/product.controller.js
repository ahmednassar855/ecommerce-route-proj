import slugify from "slugify"
import { productModel } from "../../../databases/models/product.model.js";
import { catchAsyncHandler } from "../../middleware/catchAsyncHandler.js"
import { AppError } from '../../utils/AppError.js';
import * as factory from "../handler/factor.handler.js";
import { ApiFeatures } from "../../utils/ApiFeatures.js";


const createProduct = catchAsyncHandler(async (req, res, next) => {
    req.body.slug = slugify(req.body.title)
    let result = new productModel(req.body)
    await result.save()
    res.status(201).json({ message: "success", result })
})

const getAllProducts = catchAsyncHandler(async (req, res, next) => {    
    let apiFeature =  new ApiFeatures(productModel.find() ,req.query)
    .paginate().fields().filter().sort().search()

    let result = await apiFeature.mongooseQuery
    res.status(200).json({ message: "success", page : apiFeature.page, result })
})

const getProduct = factory.getOneDocument(productModel)

const updateProduct = catchAsyncHandler(async (req, res, next) => {
    const { id } = req.params
    if (req.body.slug) req.body.slug = slugify(req.body.name)  // 3amlna if oncditino 3ashan low ben3eml update le ay 7aga fe db for exmapmple ben3mle updat ll price only 

    let result = await productModel.findByIdAndUpdate(id, req.body, { new: true })
    !result && next(new AppError(`Product not found `, 404))
    result && res.status(200).json({ message: "success", result })
})

const deleteProduct = factory.deleteOne(productModel)

export {
    createProduct,
    deleteProduct,
    getAllProducts,
    updateProduct,
    getProduct
}