import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    title : {
        type :String,
        unique : [true , "The name must be unique"],
        trim :true,
        required : [true , "The name is required"],
        minLength : [2 , 'too short category name']
    },
    slug : {
        type : String,
        lowercase : true,
        required : true
    },
    price : {
        type : Number,
        required : [true , 'produce price is required'],
        min :0
    },
    priceAfterDiscount :{
        type : Number,
        min :0
    },
    ratingAvg : {
        type : Number,
        min : [1 , 'rating average must be greater than 0'],
        max : [5 , 'rating average must be less than 5']
    },
    ratingCount : {
        type : Number,
        default : 0,
        min : 0
    },
    description : {
        type : String,
        minLength : [5 , 'too short product descritpion'],
        maxLength : [800 , 'too long product descritpion'],
        required : [true , 'product description is required'],
        trim : true
    },
    quantity : {
        type : Number,
        default : 0,
        min : 0,
        required : [true , 'product quantity is required']
    },
    sold : {
        type: Number,
        default : 0,
        min : 0
    },

    imgCover : String,
    images : [String],
    category : {
        type : mongoose.Types.ObjectId,
        ref : 'category',
        required : [true , 'product category is required']
    },
    subCategory : {
        type : mongoose.Types.ObjectId,
        ref : 'subCategory',
        required : [true , 'product subCategory is required']
    },
    brand : {
        type : mongoose.Types.ObjectId,
        ref : 'brand',
        required : [true , 'product brand is required']
    }


} , { timestamps : true })

export const productModel = mongoose.model('product' , productSchema)