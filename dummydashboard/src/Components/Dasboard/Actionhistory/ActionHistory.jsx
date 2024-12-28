import React, { useState, useEffect } from "react";
import "./ActionHistory.css";
import Navbar from "../../Navbar/Navbar";
import Footer from "../../Footer/Footer";
import axios from "axios";
import { DOCUMENT_API_END_POINT } from "../../../../utils/constant";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";

const ActionHistory = () => {
  const [documents, setDocuments] = useState([]);

  const {user} = useSelector((store)=>store.auth);
  const dispatch = useDispatch();

  // Fetch all documents (simulate API call)
  useEffect(() => {
    // Replace with your API call
    const fetchDocuments = async () =>{
    try {
      if (!user) {
            toast.error("Please log in.");
            return; // Stop execution if user is not logged in
          }
      const res = await axios.get(`${DOCUMENT_API_END_POINT}/alldocuments`,{
        headers:{
          "Content-Type":"application/json"
        },
        withCredentials:true
      })
      if(res?.data?.success){
        setDocuments(res.data.documents);
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(res?.response?.data?.message);
    }
  }
  fetchDocuments();
   
  }, [user]);

  // Handle delete document by ID
  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`${DOCUMENT_API_END_POINT}/alldocuments/${id}`,{
        headers:{
          "Content-Type":"application/json"
        },
        withCredentials:true
      })
      if(res?.data?.success){
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <>
    <Navbar/>
    <div className="action-history-container">
      <h1>Action History</h1>

      {/* Documents Table */}
      <table className="documents-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Uploaded At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {documents.length > 0 ? (
            documents.map((doc) => (
              <tr key={doc._id}>
                <td>{doc._id}</td>
                <td>
                    <a href={doc.filePath} target="_blank" rel="noopener noreferrer">
                      View Document
                    </a>
                  </td>
                  <td>{new Date(doc.uploadedAt).toLocaleString()}</td>
                  <td>
                    <button onClick={() => handleDelete(doc._id)}>Delete</button>
                  </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No documents available.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
    <Footer/>
    </>
  );
};

export default ActionHistory;
