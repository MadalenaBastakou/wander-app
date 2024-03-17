/**------------------------------USER ROUTES---------------------------------------------- */

/**USER SIGNUP*/
export const signup = async (formData) => {
  const response = await fetch("/api/user/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });

  const responseBody = await response.json();

  if (!response.ok) {
    throw new Error(responseBody.message);
  }
  localStorage.setItem("user", JSON.stringify(responseBody.user));
};

/**USER LOGIN */
export const login = async (formData) => {
  const response = await fetch("/api/user/login", {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    const responseBody = await response.json();
    throw new Error(responseBody.message);
  }
  const responseBody = await response.json();
  localStorage.setItem("user", JSON.stringify(responseBody.user));
  return responseBody.user;
};

/**TOKEN VALIDATION */
export const validateToken = async () => {
  const response = await fetch(`/api/user/validate-token`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Token invalid");
  }

  const responseBody = await response.json();
  return responseBody;
};

/**USER LOGOUT */
export const logout = async () => {
  localStorage.remove("user");
  const response = await fetch("/api/user/logout", {
    method: "POST",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Error during logout");
  }
};

/**GET USER */
export const fetchUser = async (userId) => {
  const response = await fetch(`/api/user/${userId}`);
  if (!response.ok) {
    throw new Error("Error creating booking");
  }
  const responseBody = await response.json();

  return responseBody;
};

/**GET TRIPS LIST */
export const fetchTripList = async (userId) => {
  const response = await fetch(`/api/user/${userId}/trips`);
  if (!response.ok) {
    throw new Error("Error creating booking");
  }
  const responseBody = await response.json();
  return responseBody;
};

/**ADD TO WISHLIST */
export const patchWishList = async (userId, listingId) => {
  const response = await fetch(`/api/user/favorites/${userId}/${listingId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Error updating wishlist");
  }
  const responseBody = await response.json();
  localStorage.setItem("user", JSON.stringify(responseBody.rest));
  return responseBody;
};

/**UPDATE USER */
export const updateUser = async (userId, formData) => {
  const response = await fetch(`/api/user/${userId}`, {
    method: "PUT",
    // headers: {
    //   "Content-Type": "application/json"
    // },
    body: formData,
  });
  if (!response.ok) {
    throw new Error("Error updating user");
  }
  const responseBody = await response.json();
  localStorage.setItem("user", JSON.stringify(responseBody.user));
  return responseBody.user;
};

/**DELETE USER */
export const deleteUser = async (userId) => {
  const response = await fetch(`/api/user/${userId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Error deleting user");
  }
  const responseBody = await response.json();
  localStorage.removeItem("user");
  return responseBody;
};

/**------------------------------MY-LISTINGS ROUTES---------------------------------------------- */

/**CREATE LISTING */
export const addListing = async (formData) => {
  const response = await fetch("/api/my-listings", {
    method: "POST",
    credentials: "include",
    body: formData,
  });
  if (!response.ok) {
    throw new Error("Failed to add listing");
  }

  const responseBody = await response.json();

  localStorage.setItem("user", JSON.stringify(responseBody.rest));
  return responseBody;
};

/**UPDATE LISTING*/
export const updateListing = async (formData) => {
  const response = await fetch(
    `/api/my-listings/${formData.get("listingId")}`,
    {
      method: "PUT",
      body: formData,
      credentials: "include",
    }
  );
  if (!response.ok) {
    throw new Error("Failed to update listing");
  }

  const responseBody = await response.json();
  return responseBody;
};

/**DELETE LISTING*/
export const deleteListing = async (listingId) => {
  const response = await fetch(`/api/my-listings/${listingId}`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Error during logout");
  }

  await response.json();
};

/**GET USER LISTINGS */
export const fetchUserListings = async () => {
  const response = await fetch("/api/my-listings", {
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Error fetching listings");
  }

  const responseBody = await response.json();
  return responseBody;
};

/**GET LISTING */
export const fetchListing = async (listingId) => {
  const response = await fetch(`/api/my-listings/${listingId}`);
  if (!response.ok) {
    throw new Error("Error fetching listings");
  }
  const responseBody = await response.json();
  return responseBody;
};

/**GET ALL LISTINGS BY CATEGORY*/
export const fetchListings = async () => {
  const response = await fetch(
  
      "/api/my-listings/properties"
  );
  if (!response.ok) {
    throw new Error("Error fetching listings");
  }

  const responseBody = await response.json();
  return responseBody;
};

/**------------------------------LISTINGS REQUESTS---------------------------------------------- */

// /**CREATE BOOKING */
export const searchListings = async (searchParams) => {
  const queryParams = new URLSearchParams();
  queryParams.append("destination", searchParams.destination || "");
  queryParams.append("checkIn", searchParams.checkIn || "");
  queryParams.append("checkOut", searchParams.checkOut || "");
  queryParams.append("guests", searchParams.guests || "");
  queryParams.append("page", searchParams.page || "");
  queryParams.append("maxPrice", searchParams.maxPrice || 0);
  queryParams.append("sortOption", searchParams.sortOption || "");
  // queryParams.append("type", searchParams.type || "");

  searchParams.facilities?.forEach((facility) =>
    queryParams.append("facilities", facility)
  );

  searchParams.categories?.forEach((category) =>
    queryParams.append("categories", category)
  );

  searchParams.types?.forEach((type) =>
    queryParams.append("types", type)
  );

  const queryString = queryParams.toString();
  const response = await fetch(`/api/listings/search?${queryString}`);

  if (!response.ok) {
    throw new Error("Error fetching listings");
  }

  const responseBody = await response.json();
  return responseBody;
};

export const createPaymentIntent = async (listingId, numberOfNights) => {
  const response = await fetch(
    `/api/listings/${listingId}/bookings/payment-intent`,
    {
      credentials: "include",
      method: "POST",
      body: JSON.stringify({ numberOfNights }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Error fetching payment intent");
  }

  return response.json();
};

export const createBooking = async (formData) => {
  const response = await fetch(`/api/listings/${formData.listingId}/bookings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(formData),
  });
  if (!response.ok) {
    throw new Error("Error booking listing");
  }
};

/**------------------------------LISTINGS REQUESTS---------------------------------------------- */

export const fetchMyBookings = async () => {
  const response = await fetch("/api/my-bookings");

  if (!response.ok) {
    throw new Error("Error fetching bookings");
  }

  const responseBody = await response.json();
  return responseBody;
};

export const deleteBooking = async (paymentIntentId) => {
    const response = await fetch(`/api/my-bookings/${paymentIntentId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Error deleting booking");
    }
    const responseBody = await response.json();
  return responseBody;
    
  };

export const fetchCurrentUser = async () => {
  const response = await fetch("/api/user/me", {
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Error fetching user");
  }
  return response.json();
};
