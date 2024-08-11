import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toastMessage } from '../../utils/toasMessage';
import { InputField } from '../inputFields';
import { useFormik } from 'formik';
import * as Yup from "yup";


const createAdminSchema = Yup.object().shape({
  name: Yup.string()
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters long')
    .max(50, 'Name must be less than 50 characters'),
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
    .required("Password is required")
});

const Dashboard = ({ userId }) => {
  const [allEmployee, setallEmployee] = useState([]);
  const [user, setuser] = useState({});
  const [allUser, setallUser] = useState([]);

  const getUserById = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/getUser/${userId}`);
      const { status, data, message } = response?.data;
      if (status === 1) {
        setuser({ ...data });
      } else {
        toastMessage("error", message)
      }
    } catch (error) {
      console.log(error);
      toastMessage("error", error);
    }
  };

  const getAllEmployee = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/getAllEmployees");
      const { status, data, message } = response?.data;
      if (status === 1) {
        setallEmployee([...data]);
      } else {
        toastMessage("error", message)
      }
    } catch (error) {
      console.log(error);
      toastMessage("error", error);
    }
  };

  const getAllUser = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/getAllUsers");
      const { status, data, message } = response?.data;
      if (status === 1) {
        setallUser([...data]);
      } else {
        toastMessage("error", message)
      }
    } catch (error) {
      console.log(error);
      toastMessage("error", error);
    }
  };

  useEffect(() => {
    getAllEmployee();
    getUserById();
    getAllUser();
  }, []);

  const { handleChange, handleSubmit, errors, values, touched, resetForm } = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      role: "admin"
    },
    validationSchema: createAdminSchema,
    onSubmit: (values) => {
      handleCreateAdmin(values);
    }
  });
  const handleCreateAdmin = async (datas) => {
    try {
      const response = await axios.post("http://localhost:8000/api/createAdmin", datas);
      const { status, data, message } = response?.data;
      if (status === 1) {
        setallUser((prevUser) => [...prevUser, data]);
        toastMessage("success", message)
        resetForm();
      } else {
        toastMessage("error", message)
      }
    } catch (error) {
      console.log(error);
      toastMessage("error", error);
    }
  };

  const handleDeleteEmployee = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:8000/api/deleteAdmin/${id}`);
      const { status, message } = response?.data;
      if (status === 1) {
        setallUser((prevUsers) => prevUsers.filter((user) => user.id !== id));
        toastMessage("success", message)
      }
    } catch (error) {
      console.log(error);
      toastMessage("error", error);
    }
  };
  return (
    <>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4 text-[#ff4b30]">Welcome to the Employee Management System</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">Total Employees</h2>
            <p className="text-2xl font-bold">{allEmployee?.length}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">Current Login User Details</h2>
            <div className="mt-4">
              <p className="text-lg"><span className="font-semibold">User ID:</span> {user?.id}</p>
              <p className="text-lg mt-2"><span className="font-semibold">User Name:</span> {user?.name}</p>
              <p className="text-lg mt-2"><span className="font-semibold">User Email:</span> {user?.email}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="border shadow-md rounded-md p-5 max-w-4xl mx-auto mb-5">
        <h1 className="border-b text-lg font-medium pb-2 mb-2">Create Admin</h1>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <InputField
              htmlFor="name"
              label="Admin Name"
              type="text"
              placeholder="Please Enter Your name"
              name="name"
              required="true"
              value={values.name}
              onChange={handleChange("name")}
              error={errors.name && touched.name}
              errText={errors.name && touched.name ? errors.name : ""}
            />
          </div>
          <div>
            <InputField
              htmlFor="email"
              label="Admin Email address"
              type="email"
              placeholder="Please Enter Your email"
              name="email"
              required="true"
              value={values.email}
              onChange={handleChange("email")}
              error={errors.email && touched.email}
              errText={errors.email && touched.email ? errors.email : ""}
            />
          </div>
          <div>
            <InputField
              htmlFor="password"
              label="Admin password"
              type="password"
              placeholder="Please Enter Your password"
              name="password"
              required="true"
              value={values.password}
              onChange={handleChange("password")}
              error={errors.password && touched.password}
              errText={errors.password && touched.password ? errors.password : ""}
            />
          </div>
          <div>
            <InputField
              htmlFor="role"
              label="Admin role (You can't edit this role)"
              type="text"
              placeholder="Please Enter Your role"
              name="role"
              required="true"
              disabled={true}
              value={values.role}
              onChange={handleChange("role")}
              error={errors.role && touched.role}
              errText={errors.role && touched.role ? errors.role : ""}
            />
          </div>
        </div>
        <div className="mt-6 flex gap-3 justify-end">
          <button
            type="click"
            onClick={() => resetForm()}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Clear
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Create Admin
          </button>
        </div>
      </div>
      <div className="mx-auto border shadow-md rounded-md p-5 max-w-6xl mb-5">
        <h1 className="border-b text-lg font-medium pb-2 mb-2">User List</h1>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                S.No
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                UserId
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Name
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Email
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Role
              </th>
              <th
                scope="col"
                className="relative px-6 py-3"
              >
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {
              allUser?.map((item, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{index + 1}.</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{item?.id}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{item?.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{item?.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{item?.role}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-indigo-600 hover:text-[#EF4444]" onClick={() => handleDeleteEmployee(item?.id)}>Delete</button>
                  </td>
                </tr>
              ))
            }
            {/* Add more rows as needed */}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default Dashboard