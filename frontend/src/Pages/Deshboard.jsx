import ProjectCard from "../Components/ProjectCard";
import { data } from "../mock";

function Deshboard() {
  return (
    <div className="flex gap-3 p-5" >
      {data.map((data) => (
        <ProjectCard key={data.id} data={data} />
      ))}
    </div>
  );
}

export default Deshboard;
