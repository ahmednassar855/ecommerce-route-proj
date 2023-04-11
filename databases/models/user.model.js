import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name : {
        type : String,
        trim : true,
        required: [ true , 'user name is required' ],
        minLength : [1 , 'too short name']
    },
    email : {
        type : String,
        trim : true,
        required: [ true , 'user name is required' ],
        minLength : [1 , 'too short name'],
        unique : [ true , 'email must be unique']
    },
    password : {
        type : String,
        required : true,
        minLength : [ 6 , 'minLenght 6 characters' ]
    },
    phone : {
        type : String,
        required: [ true , 'phonre number is required' ],
    },
    profilePic : String,
    role : {
        type : String,
        enum : ['user' , 'admin' , 'seller'],
        default : 'user'
    },
    isActive : {
        type : Boolean,
        default : false
    },
    verified : {
        type : Boolean,
        default :false
    }

} , { timestamps : true })

export const userModel = mongoose.model('user' , userSchema)