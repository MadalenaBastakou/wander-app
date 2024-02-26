import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Signup from "./pages/Signup";
import "./index.css";
import Login from "./pages/Login";
import Layout from "./layouts/Layout";
import Home from "./pages/Home";
import { CreateListing } from "./pages/CreateListing";
import { PrivateRoute } from "./components/PrivateRoute";
import { Profile } from "./pages/Profile";
import { MyListings } from "./pages/MyListings";
import { ListingDetails } from "./pages/ListingDetails";
import { CategoriesPage } from "./pages/CategoriesPage";
import { TripList } from "./pages/TripList";
import { Wishlist } from "./pages/Wishlist";


function App() {
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
          <Route element={<PrivateRoute />}>
            <Route
              path="/profile"
              element={
                <Layout>
                  <Profile />
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
              path="/:userId/trips"
              element={
                <Layout>
                  <TripList />
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

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
