import mongoose from "mongoose";

const subCategorySchema = mongoose.Schema({
    name : {
        type :String,
        unique : [true , "The name must be unique"],
        trim :true,
        required :  [true , "The name is required"],
        minLength : [2 , 'too short subcategory name']
    },
    slug : {
        type : String,
        lowercase : true,
        required : true
    },
    category : {
        type : mongoose.Types.ObjectId,
        ref : "category"
    }

} , { timestamps : true })

export const subCategoryModel = mongoose.model('subCategory' , subCategorySchema)