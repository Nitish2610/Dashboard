import express from 'express';
import { uploadDocument, getAllDocuments, getDocumentById, deleteDocument } from '../controllers/document.controller.js';
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { singleUpload } from "../middlewares/multer.js";
const router = express.Router();

// Routes
router.post('/upload',isAuthenticated,singleUpload,uploadDocument);
router.get('/alldocuments',isAuthenticated,getAllDocuments);
router.get('/alldocuments/:id',isAuthenticated,getDocumentById);
router.delete('/alldocuments/:id',isAuthenticated,singleUpload,deleteDocument);

export default router;
