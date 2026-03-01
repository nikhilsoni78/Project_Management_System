import { useForm } from "react-hook-form";

const CreateProjectModel = ({ onClose, addProject }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      title: "",
      Description: "",
    },
  });

    const onHandleSubmit = (data) => {     
        const newProject = {
            id: Date.now().toString(),
            ...data,
            tasks: []
        }
        console.log(newProject);
        
      addProject(newProject)
      reset()
      onClose()
  };

  const handleCloseContainer = (e) => {
    if (e.target.id === "container") {
      onClose();
    }
  };
  return (
    <>
      <div
        id="container"
        className="fixed w-full h-screen top-0 left-0 bg-black/70 flex justify-center items-center"
        onClick={(e) => handleCloseContainer(e)}
      >
        <div className="w-100 h-100 bg-white p-3 rounded-lg">
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
              <label htmlFor="Description" className="text-lg font-semibold">
                Description
                <input
                  className="border rounded-lg w-full p-1"
                  type="text"
                  id="Description"
                  {...register("Description", {
                    required: "Description is required",
                  })}
                />
              </label>
              {errors.Description && (
                <span className="text-red-600 absolute left-3 top-8 text-lg">
                  {errors.Description.message}
                </span>
              )}
            </div>
            <button className="w-full border rounded-lg text-xl font-semibold text-gray-50 bg-gray-800 p-1 mt-2 hover:bg-gray-700 cursor-pointer">
              Add Project
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
    </>
  );
};

export default CreateProjectModel;
