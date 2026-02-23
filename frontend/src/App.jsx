import "./App.css";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Deshboard from "./Pages/Deshboard";
import ProjectDetails from "./Pages/ProjectDetails";
import Layout from "./Components/Layout";

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
    </>
  );
}

export default App;
