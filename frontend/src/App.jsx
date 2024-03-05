import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./pages/Signup";
import "./index.css";
import "react-tooltip/dist/react-tooltip.css";
import Login from "./pages/Login";
import Layout from "./layouts/Layout";
import Home from "./pages/Home";
import { CreateListing } from "./pages/CreateListing";
import { PrivateRoute } from "./components/PrivateRoute";
import { Profile } from "./pages/Profile";
import { MyListings } from "./pages/MyListings";
import { ListingDetails } from "./pages/ListingDetails";
import { CategoriesPage } from "./pages/CategoriesPage";
import { MyBookings } from "./pages/MyBookings";
import { Wishlist } from "./pages/Wishlist";
import { EditListing } from "./components/EditListing";
import { useContext } from "react";
import { UserContext } from "./contexts/UserContext";
import Error404Page from "./pages/Error404Page";
import { SearchPage } from "./pages/SearchPage";
import { Booking } from "./pages/Booking";

function App() {
  const { isLoggedIn } = useContext(UserContext);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
        <Route
          path="/categories"
          element={
            <Layout>
              <CategoriesPage />
            </Layout>
          }
        />
        <Route
          path="/categories/:category"
          element={
            <Layout>
              <CategoriesPage />
            </Layout>
          }
        />
        <Route
          path="/my-listings/:listingId"
          element={
            <Layout>
              <ListingDetails />
            </Layout>
          }
        />
        <Route
          path="/search"
          element={
            <Layout>
              <SearchPage />
            </Layout>
          }
        />
        {isLoggedIn && (
          <Route element={<PrivateRoute />}>
            <Route
              path="/listings/:listingId/booking"
              element={
                <Layout>
                  <Booking />
                </Layout>
              }
            />
            <Route
              path="/profile"
              element={
                <Layout>
                  <Profile />
                </Layout>
              }
            />
            <Route
              path="/my-listings/edit-listing/:listingId"
              element={
                <Layout>
                  <EditListing />
                </Layout>
              }
            />
            <Route
              path="/my-listings"
              element={
                <Layout>
                  <MyListings />
                </Layout>
              }
            />
            <Route
              path="/:userId/bookings"
              element={
                <Layout>
                  <MyBookings />
                </Layout>
              }
            />
            <Route
              path="/:userId/wishList"
              element={
                <Layout>
                  <Wishlist />
                </Layout>
              }
            />
            <Route
              path="/create-listing"
              element={
                <Layout>
                  <CreateListing />
                </Layout>
              }
            />
          </Route>
        )}

        <Route
          path="*"
          element={
            <Layout>
              <Error404Page />
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
