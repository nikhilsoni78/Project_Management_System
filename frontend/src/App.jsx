import "./App.css";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Deshboard from "./Pages/Deshboard";
import ProjectDetails from "./Pages/ProjectDetails";
import Layout from "./Components/Layout";
import {ToastContainer} from  'react-toastify'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/project/:id" element={<ProjectDetails />} />
            <Route path="/deshboard" element={<Deshboard />} />
          </Route>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer position="top-center" autoClose={2000} theme="colored" />
    </>
  );
}

export default App;
