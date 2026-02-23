import { useState } from "react";
import { useForm } from "react-hook-form";

function TaskModal({ onClose, onAddTask }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      title: "",
      assignedTo: "",
      dueDate: "",
      status: "todo",
      priority: "",
    },
  });
  const onHandleSubmit = (data) => {
    const task = { ...data, id: Date.now().toString() };
    console.log(data);
    onAddTask(task);
    reset();
    onClose();
  };

  return (
    <div className="bg-black/70  w-full h-screen absolute top-0 right-0 flex justify-center items-center">
      <div className=" bg-white w-100 h-105  rounded-lg p-5 ">
        <h1 className="text-xl  font-semibold text-center">Create Task</h1>
        <form onSubmit={handleSubmit(onHandleSubmit)}>
          <div className="relative">
            <label htmlFor="title" className="text-lg font-semibold">
              Title:
              <input
                className="border rounded-lg w-full p-1"
                type="text"
                id="title"
                {...register("title", { required: "Title is required" })}
              />
            </label>
            {errors.title && (
              <span className="text-red-600 absolute left-3 top-8 text-lg">
                {errors.title.message}
              </span>
            )}
          </div>

          <div className="relative">
            <label htmlFor="assignTo" className="text-lg font-semibold">
              AssignedTo
              <input
                className="border rounded-lg w-full p-1"
                type="text"
                id="assignTo"
                {...register("assignedTo", {
                  required: "assignedTo is required",
                })}
              />
            </label>
            {errors.assignedTo && (
              <span className="text-red-600 absolute left-3 top-8 text-lg">
                {errors.assignedTo.message}
              </span>
            )}
          </div>

          <div className="relative">
            <label htmlFor="date" className="text-lg font-semibold">
              DueDate:
              <input
                className="border rounded-lg w-full p-1"
                type="date"
                id="date"
                {...register("dueDate", { required: "dueDate is required" })}
              />
            </label>
            {errors.dueDate && (
              <span className="text-red-600 absolute left-30 top-8 text-lg">
                {errors.dueDate.message}
              </span>
            )}
          </div>

          <div className="relative">
            <label htmlFor="priority" className="text-lg font-semibold">
              Priority:
              <select
                className="border rounded-lg w-full p-1"
                id="priority"
                {...register("priority", { required: "priority is required" })}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </label>
            {errors.priority && (
              <span className="text-red-600 absolute left-2 top-8 text-lg">
                {errors.priority.message}
              </span>
            )}
          </div>
          <button className="w-full border rounded-lg text-xl font-semibold text-gray-50 bg-gray-800 p-1 mt-2 hover:bg-gray-700 cursor-pointer">
            Add Task
          </button>
          <button
            type="button"
            onClick={onClose}
            className="w-full border rounded-lg text-xl font-semibold text-gray-50 bg-gray-800 p-1 mt-2 hover:bg-gray-700 cursor-pointer"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}

export default TaskModal;
