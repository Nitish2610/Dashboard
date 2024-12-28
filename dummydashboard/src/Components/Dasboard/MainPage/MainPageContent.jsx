import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MainPageContent.css";
import axios from "axios";
import { DOCUMENT_API_END_POINT } from "../../../../utils/constant";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../redux/authSlice";
import { Loader } from "lucide-react";

const MainPageContent = () => {
  const [file, setFile] = useState();

  const { loading,user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  const onFileChange = (e) => {
    setFile(e.target.files?.[0]);
  };
  const submithandler = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error("Please log in to upload documents.");
      return; // Stop execution if user is not logged in
    }
    const formData = new FormData();
    if (file) {
      formData.append("file", file);
    }
    try {
      dispatch(setLoading(true));
      const res = await axios.post(
        `${DOCUMENT_API_END_POINT}/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      if (res?.data?.success) {
        toast.success(res.data.message);
        setFile(null); // Clear the file state
      document.querySelector(".file-input").value = "";
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message);
    } finally {
      dispatch(setLoading(false));
    }
  };
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate("/action-history");
  };
  return (
    <div className="dashboard-container">
      {/* Main Content */}
      <main className="dashboard-content">
        <h1 className="dashboard-title">Dashboard</h1>

        {/* Dashboard Grid */}
        <div className="dashboard-grid">
          {/* Upload Document */}
          <div className="dashboard-card">
            <h2>Upload Document</h2>
            <input type="file" className="file-input" onChange={onFileChange} />
            {loading ? (
              <button className="upload-btn"><Loader/>Please wait</button>
            ) : (
              <button className="upload-btn" onClick={submithandler}>
                Upload
              </button>
            )}
          </div>

          {/* Action History */}
          <div className="dashboard-card">
            <h2>Action History</h2>
            <button className="upload-btn" onClick={handleViewDetails}>
              View Details
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MainPageContent;
