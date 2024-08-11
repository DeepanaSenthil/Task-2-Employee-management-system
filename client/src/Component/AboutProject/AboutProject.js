import React from 'react';
import { FaReact, FaNodeJs, FaLock, FaUserShield, FaSignOutAlt, FaClipboardList } from 'react-icons/fa';
import { SiTailwindcss, SiExpress, SiPostgresql } from 'react-icons/si';

const AboutProject = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-6 text-center text-indigo-600">About This Project</h1>

      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-3xl font-bold mb-4 flex items-center"><FaClipboardList className="mr-2 text-indigo-600" />Technologies Used</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <h3 className="text-xl font-semibold flex"> <FaReact className="text-2xl text-blue-500 mr-2" />ReactJS</h3>
            <p className="text-sm text-gray-600">ReactJS is a powerful JavaScript library for building user interfaces. It allows for the creation of reusable UI components and ensures fast rendering through its virtual DOM.</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold flex"> <SiTailwindcss className="text-2xl text-blue-500 mr-2" />Tailwind CSS</h3>
            <p className="text-sm text-gray-600">Tailwind CSS is a utility-first CSS framework that provides low-level utility classes to build custom designs without writing custom CSS. It helps in rapid UI development and ensures consistency.</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold flex"> <FaNodeJs className="text-2xl text-blue-500 mr-2" />Node.js</h3>
            <p className="text-sm text-gray-600">Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine. It allows for server-side scripting and building scalable network applications with ease due to its non-blocking, event-driven architecture.</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold flex"> <SiExpress className="text-2xl text-blue-500 mr-2" />Express.js</h3>
            <p className="text-sm text-gray-600">Express.js is a minimal and flexible Node.js web application framework that provides robust features for building web and mobile applications. It simplifies routing and middleware configuration.</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold flex"> <SiPostgresql className="text-2xl text-blue-500 mr-2" />PostgreSQL with Prisma</h3>
            <p className="text-sm text-gray-600">PostgreSQL is a powerful, open-source relational database system. Prisma is an ORM that simplifies database access and migrations, making it easier to interact with the database using a type-safe API.</p>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-3xl font-bold mb-4 flex items-center"><FaClipboardList className="mr-2 text-indigo-600" />Features Implemented</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li><FaLock className="inline-block mr-2 text-green-600" /> Login and Register pages with password hashing and data storage in PostgreSQL</li>
          <li><FaSignOutAlt className="inline-block mr-2 text-red-600" /> Sign out button appears in the navbar when a user is logged in</li>
          <li>Dynamic Navbar content based on user authentication status</li>
          <ul className="list-disc pl-5 space-y-2">
            <li>Logged in: Title, Manage Employees, Dashboard, About Project</li>
            <li>Logged out: Title, Login, Register</li>
          </ul>
          <li><FaUserShield className="inline-block mr-2 text-blue-600" /> Restricted access to create employee data to logged-in users only</li>
          <li><FaUserShield className="inline-block mr-2 text-blue-600" /> Admin-only access to the Dashboard page using a private route method.</li>
          <li><FaUserShield className="inline-block mr-2 text-blue-600" />In Dashboard page we can see total employee count, all user details and Create the Admin user role.</li>
          <li>Local storage for storing all needed data</li>
        </ul>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-3xl font-bold mb-4 flex items-center"><FaClipboardList className="mr-2 text-indigo-600" />Manage Employee Page</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>Create employee data</li>
          <li>Update employee data</li>
          <li>Delete employee data</li>
        </ul>
      </div>
    </div >
  );
};

export default AboutProject;



// import React from 'react'

// const AboutProject = () => {
//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-3xl font-bold mb-6 text-center text-indigo-600">About This Project</h1>
//       <div className="bg-white shadow-md rounded-lg p-6 mb-6">
//         <h2 className="text-2xl font-bold mb-4">Technologies Used</h2>
//         <ul className="list-disc pl-5 space-y-2">
//           <li>ReactJS</li>
//           <li>Tailwind CSS</li>
//           <li>Node.js</li>
//           <li>Express.js</li>
//           <li>PostgreSQL with Prisma</li>
//         </ul>
//       </div>
//       <div className="bg-white shadow-md rounded-lg p-6 mb-6">
//         <h2 className="text-2xl font-bold mb-4">Features Implemented</h2>
//         <ul className="list-disc pl-5 space-y-2">
//           <li>Login and Register pages with password hashing and data storage in PostgreSQL</li>
//           <li>Sign out button appears in the navbar when a user is logged in</li>
//           <li>Dynamic Navbar content based on user authentication status</li>
//           <ul className="list-disc pl-5 space-y-2">
//             <li>Logged in: Title, Manage Employees, Dashboard, About Project</li>
//             <li>Logged out: Title, Manage Employees, Dashboard, Login, Register</li>
//           </ul>
//           <li>Restricted access to create employee data to logged-in users only</li>
//           <li>Admin-only access to the Dashboard page using a private route method</li>
//           <li>Local storage for storing all needed data</li>
//         </ul>
//       </div>
//       <div className="bg-white shadow-md rounded-lg p-6 mb-6">
//         <h2 className="text-2xl font-bold mb-4">Manage Employee Page</h2>
//         <ul className="list-disc pl-5 space-y-2">
//           <li>Create employee data</li>
//           <li>Update employee data</li>
//           <li>Delete employee data</li>
//         </ul>
//       </div>
//     </div>
//   )
// }

// export default AboutProject