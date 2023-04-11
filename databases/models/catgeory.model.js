import mongoose from "mongoose";

const categorySchema = mongoose.Schema({
    name : {
        type :String,
        unique : [true , "The name must be unique"],
        trim :true,
        required : [true , "The name is required"],
        minLength : [2 , 'too short category name'],
        maxLength : [20 , 'too long category name']
    },
    slug : {
        type : String,
        lowercase : true,
        required : true
    },
    image : String,
} , { timestamps : true })

categorySchema.post('init' ,(doc) => {
    doc.image=process.env.BASE_URL+"/category/"+doc.image
})
export const categoryModel = mongoose.model('category' , categorySchema)