import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { ListingCard } from "../components/ListingCard";

export const Wishlist = () => {
  const { user } = useContext(UserContext);
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    if (user && user.wishList) {
      setWishlist(user.wishList);
    }
   
  }, [user]);

  return (
    <div className="mt-8 grid md:grid-cols-2 gap-12 lg:grid-cols-3 xl:grid-cols-4 ">
      {wishlist.length === 0 && (
        <span className="text-lg mt-10">No trips were found.</span>
      )}
      {wishlist.map((trip) => (
        <ListingCard key={trip._id} listing={trip} />
      ))}
    </div>
  );
};
