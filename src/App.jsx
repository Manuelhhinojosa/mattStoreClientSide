// React Router V6
import { Routes, Route } from "react-router-dom";

// redux
import { useSelector } from "react-redux";

// Toastify component for handling errors
import { ToastContainer } from "react-toastify";

// Components
// Page components
import Home from "./components/pageComponents/Home";
import About from "./components/pageComponents/About";
import RecentWork from "./components/pageComponents/RecentWork";
import Contact from "./components/pageComponents/Contact";
import Store from "./components/pageComponents/Store";
import SingleProd from "./components/pageComponents/SingleProd";
import ShoppingCart from "./components/pageComponents/ShoppingCart";
import Login from "./components/pageComponents/Login";
import Admin from "./components/pageComponents/Admin";
import Profile from "./components/pageComponents/Profile";
import EditProduct from "./components/pageComponents/EditProduct";
import EditProfile from "./components/pageComponents/EditProfile";
import Signup from "./components/pageComponents/Signup";
import ErrorPage from "./components/pageComponents/ErrorPage";

// Genereal components
import Navbar from "./components/generalComponents/Navbar";
// Scroll top component
import ScrollToTop from "./utils/ScrollTop";

function App() {
  // redux & state
  const storeState = useSelector((state) => state.storeSlice);
  const logic = useSelector((state) => state.logicSlice);

  return (
    <main>
      <ToastContainer />
      <Navbar />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/recent" element={<RecentWork />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/store" element={<Store />} />
        {storeState.artPieces.map((p) => (
          <Route key={p.id} path={`/store/${p.id}`} element={<SingleProd />} />
        ))}
        <Route path="/cart" element={<ShoppingCart />} />
        <Route path="/login" element={<Login />} />

        {logic.isLoggedIn && logic.user.isAdmin ? (
          <Route path="/admin" element={<Admin />} />
        ) : (
          <Route path="/admin" element={<Login />} />
        )}

        {logic.isLoggedIn ? (
          <Route path="/profile" element={<Profile />} />
        ) : (
          <Route path="/profile" element={<Login />} />
        )}

        <Route path="/editproduct" element={<EditProduct />} />
        <Route path="/editprofile" element={<EditProfile />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </main>
  );
}

export default App;
