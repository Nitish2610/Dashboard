import React, { useState ,useEffect} from 'react';
import './Signup.css';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../../Navbar/Navbar.jsx';
import Footer from '../../Footer/Footer.jsx';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import {toast} from 'sonner';
import { setLoading } from '../../redux/authSlice.js';
import {USER_API_END_POINT} from "../../../../utils/constant.js";
import {Loader} from 'lucide-react';

const Signup = () => {
  const [input,setInput] = useState({
    fullname:"",
    email:"",
    password:"",
    role:"user",
    file:null
  })
  const navigate = useNavigate();
  const ChangeEventHandler = (e) =>{
     setInput({...input,[e.target.name]:e.target.value});
  }
  const ChangeFileHandler = (e) =>{
    setInput({...input,file:e.target.files?.[0]})
  }

  const {loading,user} = useSelector((store)=>store.auth);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname",input.fullname);
    formData.append("email",input.email);
    formData.append("password",input.password);
    formData.append("role",input.role);
    if(input.file){
      formData.append("file",input.file);
    }
    try {
      const res = await axios.post(`${USER_API_END_POINT}/register`,formData,{
        headers:{
          "Content-Type":"multipart/form-data"
        },
        withCredentials:true,
      })
      if (res?.data?.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      // console.log(error);
      // toast.error(error.response?.data?.message);
      console.error("API Error:", error.response?.data || error.message);
  toast.error(error.response?.data?.message || "Something went wrong");
    }finally {
      dispatch(setLoading(false));
    }
  };
  useEffect(()=>{
    if(user){
        navigate("/");
    }
},[])

  return (
    <>
    <Navbar/>
    <div className="signup-container">
      <div className="signup-box">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="fullname"
              name="fullname"
              value={input.fullname}
              onChange={ChangeEventHandler}
              required
              placeholder="Enter your username"
            />
          </div>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={input.email}
              onChange={ChangeEventHandler}
              required
              placeholder="Enter your email"
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={input.password}
              onChange={ChangeEventHandler}
              required
              placeholder="Enter your password"
            />
          </div>
          <div className='role-div'>
          <div className="input-group-role">
            <label htmlFor="username">User</label>
            <input
              type="radio"
              name="role"
              value="user"
              checked={input.role === "user"}
              onChange={ChangeEventHandler}
              className='radio-btn'
            />
          </div>
          <div className="input-group-role">
            <label htmlFor="username">Admin</label>
            <input
              type="radio"
              name="role"
              value="admin"
              checked={input.role === "admin"}
              onChange={ChangeEventHandler}
              className='radio-btn'
            />
          </div>
          </div>
          <div className="input-group">
            <label htmlFor="password">Profile</label>
            <input
              accept='image/*'
              type='file'
              onChange={ChangeFileHandler}
              required
              placeholder="Enter your password"
            />
          </div>
         {
          loading?( <button className="signup-btn">
            <Loader/>Please wait
          </button>):( <button type="submit" className="signup-btn">
            Sign Up
          </button>)
         }
        </form>
        <p className="login-link">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default Signup;
