import { useEffect, useState } from "react";
import ProjectCard from "../Components/ProjectCard";
import { data } from "../mock";
import CreateProjectModel from "../Components/CreateProjectModel";
import { projects } from "../services/projectService";

function Deshboard() {
  const [project, setProject] = useState([]);
  const [modelOpen, setModelOpen] = useState(false);

  const getProjects = async() => {
    const response = await projects();
    setProject(response.data)
}
  useEffect(() => {
    getProjects()
  },[])

  const handleAddProject = (newProject) => {
    console.log("Add project clicked");
    const newProjects = [newProject, ...project];
    setProject(newProjects);
    setModelOpen(false);
  };
  
  return (
    <div className="">
      <h1 className="text-2xl text-center font-semibold">Projects</h1>
      <button
        className="border bg-blue-500 py-1 px-3 rounded-lg border-blue-800 ml-2 font-semibold hover:bg-blue-600 cursor-pointer"
        onClick={() => setModelOpen(true)}
      >
        Add Project
      </button>
      
      {project.length === 0 && (<div>No projects Available</div>)}
      
        
      <div className="flex gap-3 p-5 flex-wrap justify-evenly">
        {project.map((project) => (
          <ProjectCard key={project._id} data={project} />
        ))}
      </div>
      {modelOpen && (
        <CreateProjectModel
          addProject={handleAddProject}
          onClose={() => setModelOpen(false)}
        />
      )}
    </div>
  );
}

export default Deshboard;
