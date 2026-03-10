import { useEffect, useState } from "react";
import ProjectCard from "../Components/ProjectCard";
import CreateProjectModel from "../Components/CreateProjectModel";
import { projects,createProject } from "../services/projectService";
import { toast } from 'react-toastify'


function Deshboard() {
  const [project, setProject] = useState([]);
  const [modelOpen, setModelOpen] = useState(false);

  const getProjects = async() => {
  try {
      const response = await projects();
      setProject(response.data)
  } catch (error) {
    console.log(error);
    
  }
}
  useEffect(() => {
    getProjects()
  },[])

  const handleAddProject = async(newProject) => {
    console.log(newProject);
    const {name, description} = newProject
    try {
      const response = await createProject({name,description})
      console.log(response);
      toast.success(response.message)
      setProject([response.data, ...project])
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message)
      console.log(error.response?.data?.message);
    }
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
