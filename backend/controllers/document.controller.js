import { Document } from "../models/document.model.js";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

export const uploadDocument = async(req,res) =>{
    try {
        if(!req.file) {
            return res.status(400).json({
                message:"No file uploaded",
                success:false
            })
        }
        const file = req.file;
        const fileUri = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

        const document = new Document({
            filePath: cloudResponse.secure_url, 
            uploadedBy: req.id, 
          });
          await document.save();
          return res.status(201).json
          ({ 
            success: true,
             message: 'Document uploaded successfully', 
             document 
        });  
    } catch (error) {
        console.log(error);
    }
}

export const getAllDocuments = async (req,res) =>{
 try {
    const userId = req.id;
    // Use find() to search by uploadedBy field instead of _id
    const documents = await Document.find({ uploadedBy: userId });

    // Return a success response with the documents
    return res.status(200).json({
      success: true,
      message: "Documents retrieved successfully",
      documents,
    });

  }  catch (error) {
        console.log(error);
    }
}

export const getDocumentById = async (req, res) => {
    try {
      const { id } = req.params;
      const document = await Document.findById(id).populate('uploadedBy', 'name email');
      if (!document) {
        return res.status(404).json({
             success: false,
              message: 'Document not found'
             });
      }
      res.status(200).json({ success: true, document });
    } catch (error) {
      console.log(error);
    }
  };

  export const deleteDocument = async (req, res) => {
    try {
      const { id } = req.params;
      const document = await Document.findById(id);
      if (!document) {
        return res.status(404).json({ 
            success: false,
             message: 'Document not found' 
            });
      }
          // Extract the public ID from the Cloudinary file URL
    const fileUrl = document.filePath; // URL stored in filePath
    const publicId = fileUrl.split('/').pop().split('.')[0]; // Extract public ID from URL

    // Delete the file from Cloudinary
    await cloudinary.uploader.destroy(publicId);

    // Remove the document entry from the database
    await document.deleteOne();

        res.status(200).json({ 
            success: true,
             message: 'Document deleted successfully'
             });
    } catch (error) {
      console.log(error);
    }
  };