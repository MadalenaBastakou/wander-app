import { useCookies } from "react-cookie";
import * as apiClient from '../api-client'
import { useEffect, useRef, useState } from "react";
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from "firebase/storage"
import { app } from '../firebase';

export const Profile = () => {
  const [cookies] = useCookies();
  const { user } = cookies;
  const fileRef = useRef(null)
  const [file, setFile] = useState(undefined)
  const [filePerc, setFilePerc] = useState(0)
  const [fileUploadErr, setFileUploadErr] = useState(false)
  const [formData, setFormData] = useState({})

  console.log(formData);

useEffect(() => {
    if(file) {
        handleFileUpload(file)
    }
}, [file])

const handleFileUpload = (file) => {
const storage = getStorage(app)
const fileName = new Date().getTime() + file.name
const storageRef = ref(storage, fileName)
const uploadTask = uploadBytesResumable(storageRef, file)

console.log(file);

uploadTask.on('state_changed',
(snapshot) => {
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
    setFilePerc(Math.round(progress))
},
(error) => {
    setFileUploadErr(true)
},
()=>{
    getDownloadURL(uploadTask.snapshot.ref)
    .then((downloadURL) => {
        console.log('File available at', downloadURL);
setFormData({...formData, profileImagePath: downloadURL})
    })
})
}

console.log(filePerc);

  return (
    <div className="p-3 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold text-center my-7">Profile</h1>
      <form className="flex flex-col gap-4">
        <input onChange={(e) => setFile(e.target.files[0])} type="file" ref={fileRef} accept="image/*" hidden/>
        <img
        onClick={() => fileRef.current.click()}
          className="rounded-full self-center mt-2 mb-4 cursor-pointer"
          src={user.profileImagePath}
          alt="profile-image"
        />
        <input
          className="border p-3 rounded"
          type="text"
          placeholder="username"
          id="username"
        />
        <input
          className="border p-3 rounded"
          type="email"
          placeholder="email"
          id="email"
        />
        <input
          className="border p-3 rounded"
          type="text"
          placeholder="password"
          id="password"
        />
        <button className="bg-orange-400 text-white text-md font-medium p-3 rounded-md hover:bg-orange-500">
          Update
        </button>
      </form>
      <div className="flex justify-between mt-6">
        <span className=" text-rose-600 text-md font-medium cursor-pointer hover:text-rose-800  ">
          Delete Account
        </span>
        <span onClick={() => apiClient.logout()} className=" text-blue-600 text-md font-medium cursor-pointer hover:text-blue-800  ">
          Log Out
        </span>
      </div>
    </div>
  );
};
