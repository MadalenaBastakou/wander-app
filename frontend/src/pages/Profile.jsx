import * as apiClient from "../api-client";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BsPersonFill } from "react-icons/bs";
import { UserContext } from "../contexts/UserContext";
import { toast, Toaster } from "react-hot-toast";
import { BarLoader } from "react-spinners";
import DeleteModal from "../components/DeleteModal"

export const Profile = () => {
  const { user, setUser, logout, setIsLoggedIn } = useContext(UserContext);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isUsernameOrPasswordChanged, setIsUsernameOrPasswordChanged] = useState(false)


  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, [setUser]);

  const navigate = useNavigate();

  const handleUploadPhotos = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setFile(files[0]);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "username" || name === "password") {
      setIsUsernameOrPasswordChanged(true);
    }

    if (name === "password" && value === "") {
      setUser({ ...user, [name]: value });
    } else if (name === "password") {
      setUser({ ...user, [name]: value });
    }

    if (name === "profileImagePath" && !files.length) {
      return;
    }

    if (files && files.length > 0) {
      setUser({ ...user, [name]: files[0] });
      setFile(files[0]);
    } else if (!files || files.length === 0) {
      setUser({ ...user, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    try {
      setLoading(true);
      e.preventDefault();
      const formData = new FormData();
      formData.append("profileImagePath", user.profileImagePath);
      formData.append("firstName", user.firstName);
      formData.append("lastName", user.lastName);
      formData.append("username", user.username);
      formData.append("email", user.email);
      formData.append("password", user.password);

      const updatedUser = await apiClient.updateUser(user._id, formData);

      if (updatedUser) {
        toast.success("User updated successfully");
        setUser({ ...updatedUser, password: "" });
        setLoading(false);
        if (isUsernameOrPasswordChanged) {
          setTimeout(() => {
            logout();
            navigate("/login");
            toast.dismiss()
          },1500)
         
        }
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleDelete = async () => {
    await apiClient.deleteUser(user._id);
    setIsLoggedIn(false)
    navigate("/");
  };

  return (
    <div className="p-3 max-w-xl mx-auto">
      <Toaster />
      <h1 className="text-3xl font-bold text-center my-7">Profile</h1>
      <form className="flex flex-col gap-4">
        <input
          id="profileImagePath"
          type="file"
          name="profileImagePath"
          style={{ display: "none" }}
          accept="image/*"
          onChange={handleChange}
        />
        {user?.profileImagePath && user?.profileImagePath.length !== 0 && (
          <label htmlFor="profileImagePath">
            {!file && user.profileImagePath !== 0 && (
              <div className="flex justify-center">
                <img
                  onClick={handleUploadPhotos}
                  className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2 p-1"
                  src={user?.profileImagePath}
                  alt="profile-image"
                />
              </div>
            )}
            {file && (
              <div className="flex justify-center">
                <img
                  onClick={handleUploadPhotos}
                  className="rounded-full h-24 w-24 object-cover cursor-pointer self-center p-1"
                  src={URL.createObjectURL(file)}
                  alt="profile-image"
                />
              </div>
            )}
          </label>
        )}
        {user?.profileImagePath && user?.profileImagePath?.length === 0 && (
          <label htmlFor="profileImagePath">
            <div className="flex justify-center text-3xl">
              <div>
                {" "}
                <BsPersonFill className="text-gray-400 border border-gray-400  rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2 p-1" />
              </div>
            </div>
          </label>
        )}
        {loading && (
          <div className="flex justify-center">
            <BarLoader color="#0064B4" />
          </div>
        )}
        <div className="flex flex-col md:flex-row gap-6 mt-6">
          <input
            className="border p-3 rounded flex md:flex-1"
            type="text"
            onChange={handleChange}
            value={user.firstName}
            placeholder="First Name"
            name="firstName"
          />
          <input
            className="border p-3 rounded md:flex-1"
            type="text"
            onChange={handleChange}
            value={user.lastName}
            placeholder="Last Name"
            name="lastName"
          />
        </div>
        <input
          className="border p-3 rounded"
          type="text"
          onChange={handleChange}
          value={user.username}
          placeholder="Username"
          name="username"
        />
        <input
          className="border p-3 rounded"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          value={user.email}
          name="email"
        />
        <input
          className="border p-3 rounded"
          type="text"
          placeholder="Password"
          value={user?.password ? user.password : ""}
          onChange={handleChange}
          name="password"
        />
        <button
          onClick={handleSubmit}
          className="bg-orange-400 text-white text-md font-medium p-3 rounded-md hover:bg-orange-500"
        >
          Update
        </button>
      </form>
      <div className="flex justify-between mt-6">
<button className="btn text-rose-600 text-md font-medium cursor-pointer hover:text-rose-800" onClick={()=>document.getElementById('my_modal_3').showModal()}>Delete Account</button>
<dialog id="my_modal_3" className="modal modal-bottom sm:modal-middle p-12 rounded-lg">
<DeleteModal handleDelete={handleDelete}>Are you sure you want to close your account?</DeleteModal>
</dialog>
        <button
          onClick={() => {
            logout()
          navigate("/")}}
          className=" text-blue-600 text-md font-medium cursor-pointer hover:text-blue-800  "
        >
          Log Out
        </button>
      </div>
    </div>
  );
};
