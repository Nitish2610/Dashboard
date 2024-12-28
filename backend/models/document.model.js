import mongoose from "mongoose";
const documentSchema = new mongoose.Schema({
    filePath:{
        type:String,
        required:true
    },
    uploadedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    uploadedAt:{
        type: Date, 
        default:Date.now 
    }
},{timestamps:true})

export const Document = mongoose.model('Document',documentSchema);