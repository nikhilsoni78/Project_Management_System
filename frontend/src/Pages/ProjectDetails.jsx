import React, { useEffect, useState } from "react";
import TaskCard from "../Components/TaskCard.jsx";
import { useParams } from "react-router-dom";
import TaskModal from "../Components/TaskModel.jsx";
import {
  getTasksByProject,
  createTask,
  updateStatus,
  deleteTask,
} from "../services/taskService.js";
import { toast } from "react-toastify";
import AddMemberModel from "../Components/AddMemberModel.jsx";
import { addMembers } from "../services/projectService.js";

function ProjectDetails() {
  const { id } = useParams();

  const [tasks, setTasks] = useState([]);
  const [members, setMembers] = useState([]);

  const getProject = async () => {
    try {
      const response = await getTasksByProject(id);
      console.log(response);

      setTasks(response.data);
      setMembers(response.members);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProject();
  }, []);

  const [isModelOpen, setModelOpen] = useState(false);
  const [isMemberModelOpen, setMembermodelOpen] = useState(false);

  const toDoTasks = tasks.filter((task) => task.status === "todo");
  const inPrograssTasks = tasks.filter((task) => task.status === "inprogress");
  const doneTasks = tasks.filter((task) => task.status === "done");

  const addMembersApi = async (userId) => {
    try {
      const response = await addMembers(userId, id);
      console.log(response.data);
      toast.success(response.message);
    } catch (error) {
      toast.error(error.response?.data?.message);
      console.error(error.response?.data?.message);
      console.error(error);
    } finally {
      setMembermodelOpen(false)
    }
  };

  const addTask = async (newTask) => {
    const { title, dueDate, priority } = newTask;
    try {
      const response = await createTask({ title, dueDate, priority }, id);
      toast.success(response.message);
      setTasks([response.data, ...tasks]);
    } catch (error) {
      toast(error.response?.data?.message);
      console.error(error.response?.data?.message);
      console.error(error);
    } finally {
      setModelOpen(false);
    }
  };

  const updateTaskStatus = async (newStatus, taskId) => {
    try {
      const response = await updateStatus(newStatus, taskId);
      toast.success(response.message);
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === taskId ? { ...task, status: newStatus } : task,
        ),
      );
    } catch (error) {
      toast(error.response?.data?.message);
      console.error(error.response?.data?.message);
      console.error(error);
    }
  };

  const onDeleteTask = async (taskId) => {
    try {
      const response = await deleteTask(taskId);
      toast.success(response.message);
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
    } catch (error) {
      toast.error(error.response.data.message);
      console.error(error.response.data.message);
      console.error(error);
    }
  };

  return (
    <div className="p-3">
      <h2 className="text-2xl text-center font-semibold">Project Board</h2>
      <button
        className="border px-2 py-1 rounded-lg bg-gray-500 border-gray-700 hover:bg-gray-400 hover:border-gray-900 cursor-pointer"
        onClick={() => setModelOpen(true)}
      >
        Add Task
      </button>
      <button
        className="border px-2 ml-2 py-1 rounded-lg bg-gray-500 border-gray-700 hover:bg-gray-400 hover:border-gray-900 cursor-pointer"
        onClick={() => setMembermodelOpen(true)}
      >
        Add Members
      </button>

      <div className="flex gap-5">
        <div className="flex-1 flex flex-col gap-1 ">
          <h3 className=" text-center text-red-600 text-lg font-medium ">
            To Do
          </h3>
          {toDoTasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              members={members}
              onUpdateStatus={updateTaskStatus}
              onDeleteTask={onDeleteTask}
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
              key={task._id}
              task={task}
              members={members}
              onUpdateStatus={updateTaskStatus}
              onDeleteTask={onDeleteTask}
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
              key={task._id}
              task={task}
              members={members}
              onUpdateStatus={updateTaskStatus}
              onDeleteTask={onDeleteTask}
            />
          ))}
        </div>
      </div>

      {isModelOpen && (
        <TaskModal onClose={() => setModelOpen(false)} onAddTask={addTask} />
      )}

      {isMemberModelOpen && (
        <AddMemberModel
          addMembersApi={addMembersApi}
          onClose={() => setMembermodelOpen(false)}
        />
      )}

      {tasks.length === 0 && (
        <p className="text-center font-semibold text-gray-500 mt-4">
          No tasks yet. Create your first task.
        </p>
      )}
    </div>
  );
}

export default ProjectDetails;
