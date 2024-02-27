import * as apiClient from "../api-client";
import { useContext, useEffect, useState } from "react";
import { BsPersonFill } from "react-icons/bs";
import { UserContext } from "../contexts/UserContext";


export const Profile = () => {
  const { user, setUser } = useContext(UserContext);
  const [file, setFile] = useState(null);
  // const [userInfo, setUserInfo] = useState({
  //   username: user?.username,
  //   email: user?.email,
  //   password: "",
  // });



  // useEffect(() => {
  //   const getUser = async () => {
  //     if(user) {
  //       setUpdatedUser(user)
  //     }
  //     // const res = await apiClient.fetchUser(user._id)
  //     // console.log(res);
  //     // const storedUser = localStorage.getItem("user");
  //     // if (storedUser) {
  //     //   await setUser(JSON.parse(storedUser));
  //     // }
  //   };
  //   getUser();
  // }, []);

  // // Save user data to localStorage whenever it changes
  // useEffect(() => {
  //   localStorage.setItem("user", JSON.stringify(user));
  // }, [user]);

  const handleUploadPhotos = (e) => {
    setFile(e.target.files[0]);
  };

  const handleChange = (e) => {
    const {name, value} = e.target
    setUser({...user, [name]: value})
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault()
      const formData = new FormData();
      // formData.append("profileImagePath", file);
      formData.append("firstName", user.firstName);
      formData.append("lastName", user.lastName);
      formData.append("username", user.username);
      formData.append("email", user.email);
      formData.append("password", user.password);

      for (var pair of formData.entries()) {
        console.log(pair[0] + " - " + pair[1]);
      }
      // const res = await apiClient.updateUser(userId, formData);
      // console.log(res);
      // const res = apiClient.updateUser(user._id, formData)
      // console.log(res);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <div className="p-3 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold text-center my-7">Profile</h1>
      <form className="flex flex-col gap-4">
        <input
          id="image"
          type="file"
          name="photos"
          style={{ display: "none" }}
          accept="image/*"
          onChange={handleUploadPhotos}
        />
        {user.profileImagePath === "" ? (
          <label htmlFor="image">
            {!file && (
              <img
                onClick={handleUploadPhotos}
                className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2 p-1"
                src={user.profileImagePath}
                alt="profile-image"
              />
            )}
            {file && (
              <img
                onClick={handleUploadPhotos}
                className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2 p-1"
                src={URL.createObjectURL(file)}
                alt="profile-image"
              />
            )}
          </label>
        ) : (
          <label htmlFor="image">
            <div className="flex justify-center text-3xl">
              <div>
                {" "}
                <BsPersonFill className="text-gray-400 border border-gray-400  rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2 p-1" />
              </div>
            </div>
          </label>
        )}
        <div className="flex gap-6 mt-6">
        <input
          className="border p-3 rounded flex-1"
          type="text"
          onChange={handleChange}
          value={user.firstName}
          placeholder="First Name"
          name="firstName"
        />
        <input
          className="border p-3 rounded flex-1"
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
          onChange={handleChange}
          name="password"
        />
        <button
          onClick={() => handleSubmit(user._id)}
          className="bg-orange-400 text-white text-md font-medium p-3 rounded-md hover:bg-orange-500"
        >
          Update
        </button>
      </form>
      <div className="flex justify-between mt-6">
        <span className=" text-rose-600 text-md font-medium cursor-pointer hover:text-rose-800  ">
          Delete Account
        </span>
        <span
          onClick={() => apiClient.logout()}
          className=" text-blue-600 text-md font-medium cursor-pointer hover:text-blue-800  "
        >
          Log Out
        </span>
      </div>
    </div>
  );
};
