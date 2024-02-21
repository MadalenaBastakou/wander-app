import Cookies from 'js-cookie';

// const API_URL = import.meta.env.VITE_API_URL;


const signup = async (formData) => {
  const response = await fetch('api/user/signup', {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });

  const responseBody = await response.json();

  if (!response.ok) {
    throw new Error(responseBody.message);
  }
  Cookies.set('user', JSON.stringify(responseBody.user), { secure: true, sameSite: 'strict' });
};

const login = async (formData) => {
  const response = await fetch('api/user/login', {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });
 
  if (!response.ok) {
    throw new Error(responseBody.message);
  }
  const responseBody = await response.json();
  Cookies.set('user', JSON.stringify(responseBody.user), { secure: true, sameSite: 'strict' });
  return responseBody
};

const validateToken = async () => {
  const response = await fetch(`api/user/validate-token`, {
    credentials: "include",
  })

  if (!response.ok) {
    throw new Error("Token invalid");
  }

  return response.json();
};

const logout = async () => {
  const response = await fetch('api/user/logout', {
    method: "POST",
    credentials: "include"})

    if(!response.ok) {
      throw new Error("Error during logout")
    }
}

const addListing = async(formData)=>{
  console.log(formData);
const response = await fetch('/api/my-listings', {
  method: "POST",
  credentials: "include",
  body: formData
})
console.log(response);
if(!response.ok) {
  throw new Error("Failed to add listing")
}

const responseBody = await response.json()

return responseBody
}


export { signup, login, logout, validateToken, addListing};
