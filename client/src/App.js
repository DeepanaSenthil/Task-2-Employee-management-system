import './App.css';
import Router from './Routes/Route';
import "react-toastify/dist/ReactToastify.css";
const { ToastContainer } = require("react-toastify");

function App() {

  return (
    <div className="App">
      <Router />
      <ToastContainer autoClose={10000} />
    </div>
  );
}

export default App;
