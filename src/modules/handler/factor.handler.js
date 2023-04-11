import { catchAsyncHandler } from "../../middleware/catchAsyncHandler.js"
import { AppError } from "../../utils/AppError.js"

export const deleteOne = (model) => {
    return catchAsyncHandler( async (req, res,next) => {
        const { id } = req.params
        let result = await model.findByIdAndDelete(id)
        !result && next( new AppError(`Document not found ` , 404) )
        result &&  res.status(200).json({ message: "success", result })
    })
}

export const getAllDocuments = ( model ) => {
    return catchAsyncHandler( async (req, res,next) => {
        let result = await model.find({})
        res.status(200).json({ message: "success", result })
    })
}

export const getOneDocument = ( model ) => {
    return catchAsyncHandler(async (req, res,next) => {
        const { id } = req.params
        let result = await model.findById(id)
        !result && next( new AppError(`Document not found ` , 404) )
        result && res.status(200).json({ message: "success", result })
    })
}