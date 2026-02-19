import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useState } from "react";

function Login() {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    defaultValues: {
      email: "",
      pasword: "",
    },
  });
  const [eyeHide, setEyeHide] = useState(false);
  const handleOnEyeClick = () => {
    setEyeHide((curValue) => !curValue);
  };

  const formSubmit = (data) => {
    console.log(data);
    reset();
  };

  return (
    <div className="border-2 h-screen w-full flex justify-center items-center bg-gray-200">
      <form
        onSubmit={handleSubmit(formSubmit)}
        className=" border w-100 h-100 p-5 flex flex-col items-center rounded-2xl gap-2 bg-white"
      >
        <h1 className="text-3xl font-bold mb-5">Login</h1>
        <input
          type="email"
          {...register("email", {
            required: "Email Is Required",
            pattern: {
              value:
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              message: "please enter a valid email",
            },
          })}
          placeholder="Email"
          className="w-full border p-2 rounded-sm text-lg mb-1"
        />
        {errors.email && (
          <span className="text-red-500 font-medium ">
            {errors.email.message}
          </span>
        )}
        <div className="relative w-full">
          <input
            type={eyeHide ? "text" : "password"}
            {...register("pasword", {
              required: "Password is Required",
              minLength: {
                value: 6,
                message: "minimum 6 letters are required",
              },
            })}
            placeholder="Password"
            className="w-full border p-2 rounded-sm text-lg mb-1"
          />
          <span
            onClick={handleOnEyeClick}
            className="absolute text-xl right-2 top-3"
          >
            {eyeHide ? <FaRegEyeSlash /> : <FaRegEye />}
          </span>
        </div>
        {errors.pasword && (
          <span className="text-red-500 font-medium ">
            {errors.pasword.message}
          </span>
        )}

        <button className="border cursor-pointer w-full p-1 rounded-lg bg-gray-600 hover:bg-gray-500 font-medium text-lg">
          Login
        </button>
        <div className="flex gap-1 mt-5">
          <p>Don't Have An Account?</p>{" "}
          <span>
            <Link to="/register" className="text-blue-500 font-medium">
              Register Here
            </Link>
          </span>
        </div>
      </form>
    </div>
  );
}

export default Login;
