import "./App.css";
import {BrowserRouter, Route,Routes} from 'react-router-dom'
import Login from './Pages/Login'
import Register from './Pages/Register'
import Deshboard from "./Pages/Deshboard"
import ProjectDetails from "./Pages/ProjectDetails";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element= {<Login/>} /> 
          <Route path="/register" element= {<Register />} />
          <Route path="/deshboard" element= {<Deshboard />} />
          <Route path="/project/:id" element= {<ProjectDetails />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
