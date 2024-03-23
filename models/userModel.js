import { Schema,model } from "mongoose";

const userShema =new Schema({
    name :{type:String,required:true},
    email :{type:String ,required:true},
    password:{type:String ,required:true},
    avatar :{type:String},
    posts:{type:Number,default:0}
})

export default model("User",userShema)