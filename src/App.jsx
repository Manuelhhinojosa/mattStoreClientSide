// React Router V6
import { Routes, Route } from "react-router-dom";

// react hooks
import { useEffect } from "react";

// redux
import { useSelector, useDispatch } from "react-redux";

// fething products fucntion
import { fetchArtPieces } from "./redux/slices/state/storeSlice";

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
  // redux hooks
  const dispatch = useDispatch();
  // redux & state
  const storeState = useSelector((state) => state.storeSlice);
  const logic = useSelector((state) => state.logicSlice);

  // ???
  useEffect(() => {
    dispatch(fetchArtPieces());
  }, [dispatch]);

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
          <Route key={p.id} path={`/store/${p._id}`} element={<SingleProd />} />
        ))}

        <Route path="/cart" element={<ShoppingCart />} />
        <Route path="/login" element={<Login />} />

        {logic.isLoggedIn && logic.user.role === "admin" ? (
          <Route path="/admin" element={<Admin />} />
        ) : (
          <Route path="/admin" element={<Login />} />
        )}

        {logic.isLoggedIn ? (
          <Route path="/profile" element={<Profile />} />
        ) : (
          <Route path="/profile" element={<Login />} />
        )}

        {logic.isLoggedIn && logic.user.role === "admin"
          ? storeState.artPieces.map((p) => (
              <Route
                key={p.id}
                path={`/editproduct/${p._id}`}
                element={<EditProduct />}
              />
            ))
          : null}

        <Route path="/editprofile" element={<EditProfile />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </main>
  );
}

export default App;
