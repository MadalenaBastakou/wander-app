import { useForm } from "react-hook-form";
import * as apiClient from "../api-client";
import { useMutation } from "react-query";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";
import logo from "../assets/icons/logo.png";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    reset,
  } = useForm();
  const {setIsLoggedIn} = useContext(UserContext)

  const navigate = useNavigate();

  const mutation = useMutation(apiClient.signup, {
    onSuccess: () => {
      setIsLoggedIn(true)
      navigate("/");
      console.log("User signed up successfully");
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
          <div className="container w-full flex flex-col mt-10 md:w-3/4 mx-auto ">
            <form onSubmit={onSubmit} className="flex flex-col gap-5 p-4">
              <div>
                <h2 className="text-3xl font-bold mb-2">Create an Account</h2>
                <h3 className="text-2xl text-gray-400 font-medium mb-8">
                  Let&apos;s start planning
                </h3>
              </div>
              <div className="flex flex-col md:flex-row gap-5">
                <label className="text-gray-700 text-sm font-bold flex-1">
                  First Name
                  <input
                    className="border rounded w-full py-1 px-2 font-normal focus:outline-none focus:ring-2 focus:ring-orange-200"
                    {...register("firstName", {
                      required: "This field is required",
                    })}
                  />
                  {errors.firstName && (
                    <span className="text-red-500">
                      {errors.firstName.message}
                    </span>
                  )}
                </label>
                <label className="text-gray-700 text-sm font-bold flex-1">
                  Last Name
                  <input
                    className="border rounded w-full py-1 px-2 font-normal focus:outline-none focus:ring-2 focus:ring-orange-200"
                    {...register("lastName", {
                      required: "This field is required",
                    })}
                  />
                  {errors.lastName && (
                    <span className="text-red-500">
                      {errors.lastName.message}
                    </span>
                  )}
                </label>
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
                Email
                <input
                  type="email"
                  className="border rounded w-full py-1 px-2 font-normal focus:outline-none focus:ring-2 focus:ring-orange-200"
                  {...register("email", {
                    required: "This field is required",
                  })}
                />
                {errors.email && (
                  <span className="text-red-500">{errors.email.message}</span>
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
              <label className="text-gray-700 text-sm font-bold flex-1">
                Confirm Password
                <input
                  type="password"
                  className="border rounded w-full py-1 px-2 font-normal focus:outline-none focus:ring-2 focus:ring-orange-200"
                  {...register("confirmPassword", {
                    validate: (value) => {
                      if (!value) {
                        return "This field is required";
                      } else if (watch("password") !== value) {
                        return "Passwords do not match";
                      }
                    },
                  })}
                />
                {errors.confirmPassword && (
                  <span className="text-red-500">
                    {errors.confirmPassword.message}
                  </span>
                )}
              </label>
              <span className="flex flex-col md:flex-row md:justify-between md:items-center pb-3 md:mb-3 mt-2">
                <span className="mb-4">
                  Already have an account?{" "}
                  <Link to="/login" className="font-semibold text-orange-300">
                    Log In
                  </Link>
                </span>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-gray-900 text-white text-md font-medium px-5 py-3 rounded-md hover:bg-gray-700"
                >
                  Sign Up
                </button>
              </span>
            </form>
            <hr />
            <OAuth />
          </div>
        </div>
        <div className="w-full hidden lg:block md:h-screen bg-signupImg bg-cover bg-center"></div>
      </div>
    </>
  );
};

export default Signup;
