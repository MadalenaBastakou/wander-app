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
    <div className="w-screen mx-auto bg-neutral-100 h-screen p-4">
      <div className="max-w-screen-2xl mx-auto h-full  bg-white rounded-xl shadow-sm px-8">
        <h1 className="text-xl md:text-2xl text-gray-500 font-semibold ps-4 pt-8 pb-4 uppercase">
          My Favourites
        </h1>
        <div className="mt-8 grid md:grid-cols-2 gap-12 lg:grid-cols-3 xl:grid-cols-4 ">
          {wishlist.length === 0 && (
            <span className="text-lg mt-10 ps-4">Nothing in favourites yet.</span>
          )}
          {wishlist.map((trip) => (
            <ListingCard key={trip._id} listing={trip} />
          ))}
        </div>
      </div>
    </div>
  );
};
