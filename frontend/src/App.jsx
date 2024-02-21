import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Signup from "./pages/Signup";
import "./index.css";
import Login from "./pages/Login";
import Layout from "./layouts/Layout";
import Home from "./pages/Home";
import { CreateListing } from "./pages/CreateListing";
import { PrivateRoute } from "./components/PrivateRoute";
import { Profile } from "./pages/Profile";
// import { AppContextProvider } from "./contexts/AppContext";


function App() {
  return (
    <BrowserRouter>
    {/* <AppContextProvider value={{ isLoggedIn: true }}>  */}
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
        <Route element={<PrivateRoute />}>
          <Route
            path="/profile"
            element={
              <Layout>
                <Profile />
              </Layout>
            }
          />
        </Route>
        <Route element={<PrivateRoute />}>
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
      {/* </AppContextProvider> */}
    </BrowserRouter>
  );
}

export default App;
