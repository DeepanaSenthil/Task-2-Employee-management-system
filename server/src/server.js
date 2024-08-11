// backend/src/app.js
const express = require('express');
const dotenv = require('dotenv');
const { PrismaClient } = require("@prisma/client");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

dotenv.config();

const app = express();
const prisma = new PrismaClient();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET, POST, PUT, DELETE",
    credentials: true,
  })
);

app.post("/api/register", async (req, res) => {
  try {
    console.log(req.body);
    const { name, email, password } = req.body;
    const existingUser = await prisma.user.findUnique({
      where: { email: email }
    });

    if (existingUser) {
      throw ("User already Exists. So, Please login with this email id.")
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const createUser = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          role: "user"
        }
      });
      if (createUser) {
        res.status(201).json({
          message: "User Created Successfully.",
          status: 1,
          data: createUser
        })
      }
    }
  } catch (error) {
    console.log(error);
    if (error === "User already Exists. So, Please login with this email id.") {
      res.status(200).json({
        message: error, status: 0
      })
    } else {
      res.status(400).json({
        message: error, status: 0
      })
    }
  }
});

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await prisma.user.findUnique({
      where: { email: email }
    });
    if (!existingUser) {
      throw ("User Not Found.")
    };

    const isPasswordMatch = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordMatch) {
      throw ("Password does not match.");
    };
    const accessToken = await jwt.sign({ email: email }, process.env.ACCESS_TOKEN, { expiresIn: '1h' });

    if (existingUser && isPasswordMatch) {
      res.status(200).json({
        message: "User Logged in Successfully.",
        data: { ...existingUser, accessToken: accessToken },
        status: 1,
      });
    }

  } catch (error) {
    console.log(error);
    if (error === "User Not Found." || "Password does not match.") {
      res.status(200).json({
        message: error, status: 0
      })
    } else {
      res.status(400).json({
        message: error, status: 0
      })
    }
  }
});

app.post("/api/createEmployee/:user_id", async (req, res) => {
  const { user_id } = req.params;
  const { name, email, position, salary } = req.body;
  try {
    const isUser = await prisma.user.findUnique({ where: { id: user_id } });
    if (!isUser) {
      throw ("User not found.")
    }

    const isEmployee = await prisma.employee.findUnique({
      where: {
        email: email
      }
    });
    if (isEmployee) {
      throw ("Already created employee data by using this email id.");
    };

    const newEmployee = await prisma.employee.create({
      data: {
        userId: isUser.id,
        name,
        email,
        position,
        salary
      }
    });

    res.status(200).json({
      message: "Employee details saved successfully.",
      status: 1,
      data: newEmployee
    });
  } catch (error) {
    if (error === "User not found." || "Already created employee data by using this email id.") {
      res.status(200).json({
        message: error,
        status: 0
      })
    } else {
      res.status(500).json({
        message: "Internal server error.",
        status: 0
      })
    }
  }
});

app.post("/api/createAdmin", async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const isUser = await prisma.user.findUnique({ where: { email: email } });
    if (isUser) {
      throw ("User already exists.")
    };

    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role
      }
    });

    res.status(200).json({
      message: "Admin details saved successfully.",
      status: 1,
      data: newAdmin
    });
  } catch (error) {
    if (error === "User not found.") {
      res.status(200).json({
        message: error,
        status: 0
      })
    } else {
      res.status(500).json({
        message: "Internal server error.",
        status: 0
      })
    }
  }
});

app.get("/api/getAllUsers", async (req, res) => {
  try {
    const allUser = await prisma.user.findMany();
    console.log(allUser);
    if (allUser) {
      res.status(200).json({
        message: "All user data fetched successfully.",
        status: 1,
        data: allUser
      })
    };
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error,
      status: 0
    })
  }
});

app.get("/api/getAllEmployees", async (req, res) => {
  try {
    const allEmployees = await prisma.employee.findMany();
    console.log(allEmployees);
    if (allEmployees) {
      res.status(200).json({
        message: "All employee data fetched successfully.",
        status: 1,
        data: allEmployees
      })
    };
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error,
      status: 0
    })
  }
});

app.get("/api/getUser/:user_id", async (req, res) => {
  const { user_id } = req.params;
  try {
    const isUser = await prisma.user.findUnique({
      where: { id: user_id },
      select: {
        id: true,
        role: true,
        email: true,
        name: true
      }
    });
    if (!isUser) {
      throw ("User not found.")
    }
    else {
      res.status(200).json({
        message: "user fetched successfully.",
        status: 1,
        data: isUser
      })
    }
  } catch (error) {
    if (error === "User not found.") {
      res.status(200).json({
        message: error,
        status: 1
      })
    } else {
      res.status(500).json({
        message: "Internal server error.",
        status: 0
      })
    }
  }
});

app.put("/api/updateEmployee/:employee_id", async (req, res) => {
  const { employee_id } = req.params;
  try {
    const isEmployee = await prisma.employee.findUnique({
      where: {
        id: employee_id
      }
    });
    if (!isEmployee) {
      throw ("Employee not found.")
    }

    const updateEmployee = await prisma.employee.update({
      where: { email: isEmployee?.email },
      data: {
        ...req.body
      }
    })

    res.status(200).json({
      message: "Employee data updated successfully.",
      status: 1,
      data: updateEmployee
    });
  } catch (error) {
    console.log(error);
    if (error === "Employee not found.") {

      res.status(200).json({
        message: error,
        status: 0,
      });
    } else {
      res.status(500).json({
        message: "Internal server error.",
        status: 0
      })
    }
  }
});

app.delete("/api/deleteEmployee/:employee_id", async (req, res) => {
  const { employee_id } = req.params;
  try {
    const isEmployee = await prisma.employee.findUnique({
      where: {
        id: employee_id
      }
    });
    if (!isEmployee) {
      throw ("Employee not found.")
    }

    const deleteEmployee = await prisma.employee.delete({
      where: { id: employee_id }
    });

    res.status(200).json({
      message: "Employee data deleted successfully.",
      status: 1
    })
  } catch (error) {
    console.log(error);
    if (error === "Employee not found.") {

      res.status(200).json({
        message: error,
        status: 0,
      });
    } else {
      res.status(500).json({
        message: "Internal server error.",
        status: 0
      })
    }
  }
});

app.delete("/api/deleteAdmin/:user_id", async (req, res) => {
  const { user_id } = req.params;
  try {
    const isUser = await prisma.user.findUnique({
      where: {
        id: user_id
      }
    });
    if (!isUser) {
      throw ("User not found.")
    }

    const deleteUser = await prisma.user.delete({
      where: { id: isUser?.id }
    });

    res.status(200).json({
      message: "User data deleted successfully.",
      status: 1
    })
  } catch (error) {
    console.log(error);
    if (error === "User not found.") {

      res.status(200).json({
        message: error,
        status: 0,
      });
    } else {
      res.status(500).json({
        message: "Internal server error.",
        status: 0
      })
    }
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));