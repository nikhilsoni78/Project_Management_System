import React, { useState } from "react";
import TaskCard from "../Components/TaskCard";
import { data } from "../mock";
import { useParams } from "react-router-dom";
import TaskModal from "../Components/TaskModel";

function ProjectDetails() {
  const { id } = useParams();
  const project = data.find((project) => project.id === Number(id));

  if (!project) {
    return <div> Projects not found</div>;
  }
  const [tasks, setTasks] = useState(project.tasks);
  const [isModelOpen, setModelOpen] = useState(false);

  const toDoTasks = tasks.filter((task) => task.status === "todo");
  const inPrograssTasks = tasks.filter((task) => task.status === "inprogress");
  const doneTasks = tasks.filter((task) => task.status === "done");

  const addTask = (newTask) => {
    setTasks([...tasks, newTask])
    setModelOpen(false);
  };

  const updateTaskStatus = (newStatus, id) => {
    const updatedTasks  = tasks.map((task) => task.id === id ? { ...task ,status:newStatus} :task)
    setTasks(updatedTasks)
  }

  return (
    <div className="p-3 ">
      <h2 className="text-2xl text-center font-semibold">Project Board</h2>
      <button
        className="border px-2 py-1 rounded-lg bg-gray-500 border-gray-700 hover:bg-gray-400 hover:border-gray-900 cursor-pointer"
        onClick={() => setModelOpen(true)}
      >
        Add Task
      </button>

      <div className="flex gap-5">
        <div className="flex-1 flex flex-col gap-1 ">
          <h3 className=" text-center text-red-600 text-lg font-medium ">
            To Do
          </h3>
          {toDoTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onUpdateStatus={updateTaskStatus}
            />
          ))}
        </div>
        <div className="bg-gray-500 w-0.5 h-auto"></div>

        <div className="flex-1 flex flex-col  gap-1">
          <h3 className="text-lg text-center text-green-800 font-medium">
            In Progress
          </h3>
          {inPrograssTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onUpdateStatus={updateTaskStatus}
            />
          ))}
        </div>

        <div className="bg-gray-500 w-0.5 h-auto"></div>

        <div className="flex-1 flex flex-col gap-1">
          <h3 className="text-lg text-center text-blue-800 font-medium">
            Done
          </h3>
          {doneTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onUpdateStatus={updateTaskStatus}
            />
          ))}
        </div>
      </div>
      {isModelOpen && (
        <TaskModal onClose={() => setModelOpen(false)} onAddTask={addTask} />
      )}
    </div>
  );
}

export default ProjectDetails;
