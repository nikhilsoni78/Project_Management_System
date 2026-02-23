import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

function ProjectCard({data}) {

  return (
    <div className="bg-neutral-primary-soft border w-80 p-4 rounded-xl">
      <h1 className="text-2xl font-semibold ">{data.title}</h1>
      <p className="text-gray-700 mt-2">{data.description}
      </p>
      <div className="bg-brand flex gap-1 items-center mt-2 justify-center font-semibold text-white bg-blue-500 text-sm p-1 w-17 rounded-lg border border-transparent">
        <Link to={`/project/${data.id}`}>View</Link>
        <FaArrowRight className="font-semibold  w-2" />
      </div>
    </div>
  );
}

export default ProjectCard;
