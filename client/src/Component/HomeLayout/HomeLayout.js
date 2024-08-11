import React, { useEffect, useState } from 'react';
import { InputField } from '../inputFields';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from "yup";
import { toastMessage } from '../../utils/toasMessage';

const createEmployeeSchema = Yup.object().shape({
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
  position: Yup.string()
    .required('Position is required')
    .min(2, 'Position must be at least 2 characters long')
    .max(50, 'Position must be less than 50 characters'),
  salary: Yup.number()
    .required('Salary is required')
    .positive('Salary must be a positive number')
    .integer('Salary must be an integer')
});

const HomeLayout = ({ userId }) => {
  console.log(userId, "userId");
  const [allEmployee, setallEmployee] = useState([]);
  const [editingEmployee, setEditingEmployee] = useState(null);
  useEffect(() => {
    getAllEmployee();
  }, []);

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

  const { handleChange, handleSubmit, setValues, errors, values, touched, resetForm } = useFormik({
    initialValues: {
      name: "",
      email: "",
      position: "",
      salary: null || ""
    },
    validationSchema: createEmployeeSchema,
    onSubmit: (values) => {
      if (editingEmployee) {
        handleUpdateEmployee(values);
      } else {
        handleCreateEmployee(values);
      }
    }
  });

  const handleCreateEmployee = async (datas) => {
    try {
      const createEmployee = await axios.post(`http://localhost:8000/api/createEmployee/${userId}`, datas);
      const { status, message, data } = createEmployee?.data;
      if (status === 1) {
        toastMessage("success", message);
        setallEmployee((prevEmployees) => [...prevEmployees, data]);
        resetForm();
      } else {
        toastMessage("error", message)
      }
    } catch (error) {
      console.log(error);
      toastMessage("error", error);
    }
  };

  const handleUpdateEmployee = async (datas) => {
    try {
      const response = await axios.put(`http://localhost:8000/api/updateEmployee/${editingEmployee.id}`, datas);
      const { status, message, data } = response?.data;
      if (status === 1) {
        setallEmployee((prevEmployees) =>
          prevEmployees.map((employee) =>
            employee.id === data?.id ? data : employee
          )
        );
        toastMessage("success", message);
        setEditingEmployee(null);
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
      const createEmployee = await axios.delete(`http://localhost:8000/api/deleteEmployee/${id}`);
      const { status, message } = createEmployee?.data;
      if (status === 1) {
        toastMessage("success", message);
        setallEmployee((prevEmployees) => prevEmployees.filter((employee) => employee.id !== id));
      } else {
        toastMessage("error", message)
      }
    } catch (error) {
      console.log(error);
      toastMessage("error", error);
    }
  };

  const handleEditEmployee = (employeeData) => {
    setEditingEmployee(employeeData);
    setValues({
      ...employeeData
    });
  };

  const handleClear = () => {
    setEditingEmployee(null);
    resetForm();
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-[#ff4b30]">Welcome to the Employee Management System</h1>
      <div className="border shadow-md rounded-md p-5 max-w-4xl mx-auto mb-5">
        <h1 className="border-b text-lg font-medium pb-2 mb-2">Create Employee</h1>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <InputField
              htmlFor="name"
              label="Employee Name"
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
              label="Employee Email address"
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
              htmlFor="Position"
              label="Employee Position"
              type="text"
              placeholder="Please Enter Your Position"
              name="Position"
              required="true"
              value={values.position}
              onChange={handleChange("position")}
              error={errors.position && touched.position}
              errText={errors.position && touched.position ? errors.position : ""}
            />
          </div>
          <div>
            <InputField
              htmlFor="Salary"
              label="Employee Salary"
              type="number"
              placeholder="Please Enter Your Salary"
              name="salary"
              required="true"
              value={values.salary}
              onChange={handleChange("salary")}
              error={errors.salary && touched.salary}
              errText={errors.salary && touched.salary ? errors.salary : ""}
            />
          </div>
        </div>
        <div className="mt-6 flex gap-3 justify-end">
          <button
            type="click"
            onClick={handleClear}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Clear
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {
              editingEmployee ? "Update Employee" : "Add Employee"
            }
          </button>
        </div>
      </div>
      <div className="border shadow-md rounded-md p-5 max-w-4xl mx-auto">
        <h1 className="border-b text-lg font-medium pb-2 mb-2">Employee List</h1>
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
                Position
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Salary
              </th>
              <th
                scope="col"
                className="relative px-6 py-3"
              >
                <span className="sr-only">Edit</span>
              </th>
              <th
                scope="col"
                className="relative px-6 py-3"
              >
                <span className="sr-only">Delete</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {
              allEmployee?.map((item, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{index + 1}.</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{item?.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{item?.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{item?.position}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">${item?.salary.toLocaleString()}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-indigo-600 hover:text-[#EF4444]" onClick={() => handleEditEmployee(item)}>Edit</button>
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
    </div>
  )
}

export default HomeLayout