import Navbar from "../components/Navbar";


const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="container w-full flex-1">{children}</div>
    </div>
  );
};

export default Layout;
