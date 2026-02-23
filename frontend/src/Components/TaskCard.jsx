function TaskCard({ task,onUpdateStatus }) {
  return (
    <div className="border p-2 w-60">
      <h1 className="text-xl text-gray-800  font-semibold">{task.title}</h1>
      <p className="font-medium">AssignedTo: {task.assignedTo}</p>
      <p className="font-medium">Due Date: {task.dueDate}</p>
      <p className="font-medium">Priority: {task.priority}</p>
      <label className="font-medium" htmlFor="update">
        Status:
      </label>
      <select
        className="font-medium "
        id="update"
        onChange={(e) => onUpdateStatus(e.target.value,task.id)}
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
