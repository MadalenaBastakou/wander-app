import Cookies from "js-cookie";

// const API_URL = import.meta.env.VITE_API_URL;

export const signup = async (formData) => {
  const response = await fetch("api/user/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });

  const responseBody = await response.json();

  if (!response.ok) {
    throw new Error(responseBody.message);
  }
  Cookies.set("user", JSON.stringify(responseBody.user), {
    secure: true,
    sameSite: "strict",
  });
};

export const login = async (formData) => {
  const response = await fetch("api/user/login", {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    throw new Error(responseBody.message);
  }
  const responseBody = await response.json();
  Cookies.set("user", JSON.stringify(responseBody.user), {
    secure: true,
    sameSite: "strict",
  });
  return responseBody;
};

export const validateToken = async () => {
  const response = await fetch(`api/user/validate-token`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Token invalid");
  }

  return response.json();
};

export const logout = async () => {
  const response = await fetch("api/user/logout", {
    method: "POST",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Error during logout");
  }
};

export const addListing = async (formData) => {
  console.log(formData);
  const response = await fetch("/api/my-listings", {
    method: "POST",
    credentials: "include",
    body: formData,
  });
  console.log(response);
  if (!response.ok) {
    throw new Error("Failed to add listing");
  }

  const responseBody = await response.json();

  return responseBody;
};

export const fetchListings = async () => {
  const response = await fetch("/api/my-listings", {
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Error fetching listings");
  }

  const responseBody = await response.json();
  return responseBody;
};

export const fetchCreator = async(userId) => {
  const response = await fetch(`/api/user/${userId}`)
  if (!response.ok) {
    throw new Error("Error fetching listings");
  }
  const responseBody = await response.json();
  return responseBody
  }

export const fetchListing = async(listingId) => {
const response = await fetch(`/api/my-listings/${listingId}`)
if (!response.ok) {
  throw new Error("Error fetching listings");
}
const responseBody = await response.json();
return responseBody
}
