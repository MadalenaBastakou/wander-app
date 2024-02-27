import { useForm } from "react-hook-form";
import { toast, Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";
import logo from "../assets/icons/logo.png";
import * as apiClient from "../api-client";
import { useMutation } from "react-query";


const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    reset,
  } = useForm();


  const navigate = useNavigate();

  const mutation = useMutation(apiClient.login, {
    onSuccess: () => {
      navigate("/");
      console.log("User sign in successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
    reset();
  });

  return (
    <>
      <Toaster />
      <div className="w-screen h-screen grid grid-rows-4 lg:grid-cols-2">
        <div className="w-full h-full md:h-screen row-span-3 ">
          <Link to="/">
            <img src={logo} alt="logo" className="px-2" />
          </Link>
          <div className="container  w-full flex flex-col mt-20  md:w-3/4 mx-auto ">
            <form onSubmit={onSubmit} className="flex flex-col gap-5 p-4">
              <div>
                <h2 className="text-3xl font-bold mb-2">Welcome back!</h2>
                <h3 className="text-2xl text-gray-400 font-medium mb-8">
                  Log in to your account
                </h3>
              </div>

              <label className="text-gray-700 text-sm font-bold flex-1">
                Username
                <input
                  className="border rounded w-full py-1 px-2 font-normal focus:outline-none focus:ring-2 focus:ring-orange-200"
                  {...register("username", {
                    required: "This field is required",
                  })}
                />
                {errors.username && (
                  <span className="text-red-500">
                    {errors.username.message}
                  </span>
                )}
              </label>
              <label className="text-gray-700 text-sm font-bold flex-1">
                Password
                <input
                  type="password"
                  className="border rounded w-full py-1 px-2 font-normal focus:outline-none focus:ring-2 focus:ring-orange-200"
                  {...register("password", {
                    required: "This field is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                />
                {errors.password && (
                  <span className="text-red-500">
                    {errors.password.message}
                  </span>
                )}
              </label>
              <span className="flex justify-between items-center pb-3 mb-3 mt-2">
                <span>
                  Don&apos;t have an account yet?{" "}
                  <Link to="/signup" className="font-semibold text-orange-300">
                    Sign Up
                  </Link>
                </span>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-gray-900 text-white text-md font-medium px-5 py-3 rounded-md hover:bg-gray-700"
                >
                  {isSubmitting ? "Loading..." : "Log In"}
                </button>
              </span>
            </form>
            <hr />
            <OAuth />
          </div>
        </div>
        <div className="w-full hidden lg:block md:h-screen bg-loginImg bg-cover bg-center"></div>
      </div>
    </>
  );
};

export default Login;
