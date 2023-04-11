import mongoose from "mongoose";

const brandSchema = mongoose.Schema({
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
    logo : String
} , { timestamps : true })

brandSchema.post('init' ,(doc) => {
    doc.logo= process.env.BASE_URL+"/brand/"+doc.logo
})

export const brandModel = mongoose.model('brand' , brandSchema)