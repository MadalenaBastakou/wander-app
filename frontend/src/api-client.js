
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
  

  return responseBody
};


export { signup, login};
