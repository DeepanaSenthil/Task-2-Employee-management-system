import React, { useEffect } from 'react';
import { InputField } from '../Component/inputFields';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from "yup";
import axios from 'axios';
import { toastMessage } from '../utils/toasMessage';

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required"),
});

const Login = ({ setisLoggedin }) => {
  const navigate = useNavigate();
  const { handleChange, handleSubmit, errors, touched, values, resetForm } = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      handleLogin(values);
    }
  });

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      navigate("/home-page");
    }
  }, [navigate]);

  const handleLogin = async (datas) => {
    try {
      const response = await axios.post("http://localhost:8000/api/login", datas);
      const { message, status, data } = response?.data;
      if (status === 1) {
        toastMessage("success", message);
        resetForm();
        localStorage.setItem("accessToken", data?.accessToken);
        localStorage.setItem("role", data?.role);
        localStorage.setItem("userId", data?.id);
        setisLoggedin(true);
        navigate("/");
        window.location.reload();
      } else if (status === 0) {
        toastMessage("error", message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="min-h-[91vh] flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-md shadow-md w-[40%]">
        <h2 className="text-2xl font-sm mb-6 text-start border-b pb-2">Login</h2>
        <div className="flex items-center justify-between w-full border-b mb-5">
          <div className="w-[100%]">
            <div className="mb-4">
              <InputField
                htmlFor="emailAddress"
                label="Email Address"
                type="email"
                placeholder="Please Enter Your Email"
                name="email"
                required="true"
                value={values.email}
                onChange={handleChange("email")}
                error={errors.email && touched.email}
                errText={errors.email && touched.email ? errors.email : ""}
              />
            </div>
            <div className="mb-4">
              <InputField
                htmlFor="password"
                label="Password"
                type="password"
                placeholder="Please Enter Your Password"
                name="password"
                required="true"
                value={values.password}
                onChange={handleChange("password")}
                error={errors.password && touched.password}
                errText={errors.password && touched.password ? errors.password : ""}
              />
            </div>
          </div>
          {/* <div className="w-[50%] flex flex-col items-center">
            <button className="flex items-center px-4 py-2 border rounded w-[50%] justify-center">
              <FcGoogle className="w-5 h-5 mr-2" />
              Login with Google
            </button>
            <button className="flex items-center px-4 py-2 border rounded mt-3 w-[50%] justify-center">
              <FaFacebook className="w-5 h-5 mr-2" style={{ color: "#5262bc" }} />
              Login with Facebook
            </button>
          </div> */}
        </div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-5">
            <button type="submit" className="text-black border hover:bg-[#ff4b30] hover:text-white px-7 py-2 rounded" onClick={handleSubmit} >Login</button>
            <Link to="/" className="text-[#323232] text-[13px]">Create An Account</Link>
          </div>
          <Link className="text-blue-500 text-[14px]">Forgot Password?</Link>
        </div>
      </div>
    </div>
  )
}

export default Login