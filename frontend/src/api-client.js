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

const logout = async () => {
  const response = await fetch('api/user/logout', {
    method: "POST",
    credentials: "include"})

    if(!response.ok) {
      throw new Error("Error during logout")
    }
}


export { signup, login, logout};
