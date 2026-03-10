
import { MdDelete } from "react-icons/md";
function TaskCard({ task, onUpdateStatus, onDeleteTask }) {
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString();
  };
  
  return (
    <div className="border relative p-2 w-60">
      <button
        onClick={() => onDeleteTask(task._id)}
        className="absolute top-0 right-0 cursor-pointer p-1 text-lg"
      >
        <MdDelete />
      </button>
      <h1 className="text-xl text-gray-800  font-semibold">{task.title}</h1>
      <p className="font-medium">AssignedTo: {task.assignedTo?.name}</p>
      <p className="font-medium">Due Date: {formatDate(task.dueDate)}</p>
      <p className="font-medium">Priority: {task.priority}</p>
      <label className="font-medium" htmlFor="update">
        Status:
      </label>
      <select
        className="font-medium "
        id="update"
        onChange={(e) => onUpdateStatus(e.target.value, task._id)}
        value={task.status}
      >
        <option value="todo">ToDo</option>
        <option value="inprogress">InProgress</option>
        <option value="done">Done</option>
      </select>
    </div>
  );
}

export default TaskCard;
