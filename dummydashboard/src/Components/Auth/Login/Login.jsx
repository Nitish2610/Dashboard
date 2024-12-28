import React, { useState,useEffect } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../Navbar/Navbar.jsx";
import Footer from "../../Footer/Footer.jsx";
import { USER_API_END_POINT } from "../../../../utils/constant.js";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "sonner";
import { setLoading, setUser } from "../../redux/authSlice.js";
import {Loader} from 'lucide-react';

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "user",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, user } = useSelector((store) => store.auth);

  const ChangeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res?.data?.success) {
        dispatch(setUser(res.data.user));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      console.log("API ERROR",error.response.data.message);
      toast.error(error.response?.data?.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, []);

  return (
    <>
      <Navbar />
      <div className="login-container">
        <div className="login-box">
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
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
              <div className="role-div">
                <div className="input-group-role">
                  <label htmlFor="username">User</label>
                  <input
                    type="radio"
                    name="role"
                    value="user"
                    checked={input.role === "user"}
                    onChange={ChangeEventHandler}
                    className="radio-btn"
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
                    className="radio-btn"
                  />
                </div>
              </div>
              <div className="forgot-password">
                <Link to="/forgot-password">Forgot Password?</Link>
              </div>
            </div>
            {loading ? (
              <button className="login-btn">
                <Loader/>Please wait
              </button>
            ) : (
              <button type="submit" className="login-btn">
                Login
              </button>
            )}
          </form>
          <p className="signup-link">
            Don't have an account? <Link to="/signup">Sign up</Link>
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
