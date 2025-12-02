// React Router V6
// hooks
import { Routes, Route, useNavigate } from "react-router-dom";

// react hooks
import { useEffect } from "react";

// axios
import axios from "axios";

import { jwtDecode } from "jwt-decode";

// redux
import { useSelector, useDispatch } from "react-redux";

// Redux functions
// fetch products
import { fetchArtPieces } from "./redux/slices/state/storeSlice";
// functions in logic slice
import {
  setisLoggedInToTrue,
  setUser,
  setUserToken,
} from "./redux/slices/staticState/logicSlice";

import { removeProdShoppingCart } from "./redux/slices/state/storeSlice";
import { emptyShoppingCart } from "./redux/slices/state/storeSlice";
import { setisLoggedInToFalse } from "./redux/slices/staticState/logicSlice";
import { setuserToNone } from "./redux/slices/staticState/logicSlice";
import { setUserTokenEmpty } from "./redux/slices/staticState/logicSlice";
import { resetEditUserState } from "./redux/slices/staticState/logicSlice";

// Toastify (messages to user)
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// error handling state (for styling)
import { toastStyleObject } from "./tostifyStyle";

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

// App functio component
function App() {
  // redux hooks
  const dispatch = useDispatch();
  // redux hooks & state
  const storeState = useSelector((state) => state.storeSlice);
  const logic = useSelector((state) => state.logicSlice);

  // react router hooks
  const navigate = useNavigate();

  // functions
  // functions
  // functions

  // fectches products
  useEffect(() => {
    dispatch(fetchArtPieces());
  }, [dispatch]);

  // Restore session on page load
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (!savedToken) return;

    const fetchUser = async () => {
      try {
        const result = await axios.get(
          `${import.meta.env.VITE_API_USERS_URL}/me`,
          {
            headers: { Authorization: `Bearer ${savedToken}` },
          }
        );

        dispatch(setisLoggedInToTrue());
        dispatch(setUser(result.data));
        dispatch(setUserToken(savedToken));
      } catch (err) {
        console.log("Expired or invalid session");
        localStorage.removeItem("token");
      }
    };

    fetchUser();
  }, []);

  // logs out user when token expires
  useEffect(() => {
    const token = logic.userToken;
    if (!token) return;

    const payload = jwtDecode(token);
    if (!payload || typeof payload.exp !== "number") return;

    const now = Date.now() / 1000; // seconds
    const millisUntilExpiry = (payload.exp - now) * 1000;

    // Timer for actual logout
    const logoutTimer = setTimeout(() => {
      if (storeState.shoppingCart.length > 0) {
        storeState.shoppingCart.forEach((prod) => {
          dispatch(removeProdShoppingCart(prod._id));
        });
      }
      dispatch(emptyShoppingCart());
      dispatch(setisLoggedInToFalse());
      dispatch(setuserToNone());
      dispatch(setUserTokenEmpty());
      dispatch(resetEditUserState());
      localStorage.removeItem("token");
      navigate("/login");
    }, millisUntilExpiry);

    // Timer for warning toast (1 minute before expiry or immediately if token < 1min)
    const warningTime =
      millisUntilExpiry > 60 * 1000 ? millisUntilExpiry - 60 * 1000 : 0;
    const warningTimer = setTimeout(() => {
      toast("⚠️ Your session will expire in 1 minute", toastStyleObject());
    }, warningTime);

    return () => {
      clearTimeout(logoutTimer);
      clearTimeout(warningTimer);
    };
  }, [logic.userToken, dispatch, storeState.shoppingCart, navigate]);

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

        {logic.isLoggedIn ? (
          <Route path="/editprofile" element={<EditProfile />} />
        ) : (
          <Route path="/editprofile" element={<Login />} />
        )}

        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </main>
  );
}

export default App;
