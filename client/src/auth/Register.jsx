import React, { useEffect } from "react";
import { InputField } from "../Component/inputFields";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";
import { toastMessage } from "../utils/toasMessage";
import * as Yup from "yup";
import Lottie from "lottie-react";
import signupLottie from "../assets/Lottie/Animation - 1712376968552.json";

const RegisterSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(4, "Minimum 4 characters required.")
    .required("First name is required."),
  lastName: Yup.string().min(1, "Minimum 4 characters required."),
  email: Yup.string()
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Invalid email format"
    )
    .required("Email is required"),
  password: Yup.string()
    .matches(
      /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must be at least 8 characters long and include at least one uppercase letter, one number, and one special character."
    )
    .required("Password is required"),
});

const Register = () => {
  const navigate = useNavigate();
  const { handleChange, handleSubmit, errors, touched, values, resetForm } =
    useFormik({
      initialValues: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      },
      validationSchema: RegisterSchema,
      onSubmit: (values) => {
        handleRegister(values);
      },
    });

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      navigate("/home-page");
    }
  }, [navigate]);

  const handleRegister = async (data) => {
    const { firstName, lastName, email, password } = data;
    let wholeData = {
      name: `${firstName} ${lastName}`,
      email,
      password,
    };

    try {
      const response = await axios.post(
        "http://localhost:8000/api/register",
        wholeData
      );
      const { message, status } = response?.data;
      if (status === 1) {
        toastMessage("success", message);
        resetForm();
        navigate("/signin");
      } else if (status === 0) {
        toastMessage("error", message);
      }
    } catch (error) {
      console.log(error);
      toastMessage("error", error);
    }
  };
  return (
    <div className="min-h-[91vh] flex items-center justify-center bg-gray-300">
      <div className="bg-white p-8 rounded-md shadow-md w-[60%]">
        <h2 className="text-2xl font-sm mb-6 text-start border-b pb-2">
          Create a New Account
        </h2>
        <div className="flex items-center">
          <Lottie animationData={signupLottie} loop={true} />

          <div className=" w-full  mb-5">
            <div className="w-[100%] border-b mb-5">
              <div className="mb-4">
                <InputField
                  htmlFor="firstName"
                  label="First Name"
                  type="text"
                  placeholder="Please Enter Your First name"
                  name="firstName"
                  required="true"
                  value={values.firstName}
                  onChange={handleChange("firstName")}
                  error={errors.firstName && touched.firstName}
                  errText={
                    errors.firstName && touched.firstName
                      ? errors.firstName
                      : ""
                  }
                />
              </div>
              <div className="mb-4">
                <InputField
                  htmlFor="lastName"
                  label="Last Name"
                  type="text"
                  placeholder="Please Enter Your Last name"
                  name="lastName"
                  value={values.lastName}
                  onChange={handleChange("lastName")}
                  error={errors.lastName && touched.lastName}
                  errText={
                    errors.lastName && touched.lastName ? errors.lastName : ""
                  }
                />
              </div>
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
                  errText={
                    errors.password && touched.password ? errors.password : ""
                  }
                />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="text-black border hover:bg-blue-500 hover:text-white px-7 py-2 rounded"
                onClick={handleSubmit}
              >
                Register
              </button>
              <Link to="/signin" className="text-blue-500 text-[14px]">
                Back to Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
