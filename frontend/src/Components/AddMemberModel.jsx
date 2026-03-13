import { use, useEffect } from "react";
import { getUsers } from "../services/authService.js";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {toast} from 'react-toastify'



function AddMemberModel({ onClose, addMembersApi }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      userId: "",
    },
  });

  const [users, setUsers] = useState([]);

  const getUserApi = async () => {
    try {
      const response = await getUsers();
      setUsers(response.data);
    } catch (error) {
      console.error(error.response?.data?.message);
      console.error(error);
    }
};

useEffect(() => {
      getUserApi();
  }, []);
    

    const onHandleSubmit = async (data) => {
        console.log(data.userId);
        
        addMembersApi(data.userId)
           reset();
           onClose();
  };

  const handleCloseModel = (e) => {
    if (e.target.id === "container") {
      onClose();
      reset();
    }
  };
  return (
    <div
      onClick={(e) => handleCloseModel(e)}
      id="container"
      className="bg-black/70 w-full h-screen absolute top-0 right-0 flex justify-center items-center"
    >
      <div className=" bg-white w-100 h-70  rounded-lg p-5 border border-gray-500 ">
        <h1 className="text-xl  font-semibold text-center">Add Members</h1>
        <form onSubmit={handleSubmit(onHandleSubmit)}>
          <div className="relative">
            <label htmlFor="userId" className="text-lg font-semibold">
              Name:
              <select
                className="border rounded-lg w-full p-1"
                id="userId"
                {...register("userId", { required: "Please Select a User" })}
              >
                <option value="">Select User</option>
                {users.map((user) => (
                  <option value={user._id} key={user._id}>
                    {user.name}
                  </option>
                ))}
              </select>
            </label>
            {errors.userId && (
              <span className="text-red-600 absolute left-27  top-8 text-lg">
                {errors.userId.message}
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

export default AddMemberModel   