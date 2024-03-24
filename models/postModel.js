import { Schema,model } from "mongoose";

const postShema =new Schema({
    title :{type:String,required:true},
    category :{type:String ,required:true},
    description:{type:String ,required:true},
    thumbnail :{type:String,require:true},
    creator :{type:Schema.Types.ObjectId,ref:"User"},
},{timestamps:true})

export default model("Post",postShema); 