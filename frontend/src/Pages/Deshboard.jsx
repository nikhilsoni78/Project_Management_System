import { useState } from "react";
import ProjectCard from "../Components/ProjectCard";
import { data } from "../mock";
import CreateProjectModel from "../Components/CreateProjectModel";

function Deshboard() {
  const [project, setProject] = useState(data);
  const [modelOpen, setModelOpen] = useState(false);
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
      <div className="flex gap-3 p-5 flex-wrap justify-evenly">
        {project.map((project) => (
          <ProjectCard key={project.id} data={project} />
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
