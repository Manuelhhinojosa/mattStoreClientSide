// React Router V6
// hooks
import { Routes, Route, useNavigate } from "react-router-dom";

// react hooks
import { useEffect, useRef } from "react";

// axios
import axios from "axios";

// jwt hooks
import { jwtDecode } from "jwt-decode";

// redux
// redux hooks
import { useSelector, useDispatch } from "react-redux";
// Redux functions
// fetch products
import { fetchArtPieces } from "./redux/slices/state/storeSlice";
// functions in store clice
import {
  removeProdShoppingCart,
  emptyShoppingCart,
  addProdShoppingCart,
  setOrders,
  setUsers,
} from "./redux/slices/state/storeSlice";
// functions in logic slice
import {
  setisLoggedInToTrue,
  setUser,
  setUserToken,
  setisLoggedInToFalse,
  setuserToNone,
  setUserTokenEmpty,
  resetEditUserState,
} from "./redux/slices/staticState/logicSlice";

// helper functions
import { refreshOrdersData, refreshUsersData } from "./utils/helpers";

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
import OrderSuccess from "./components/pageComponents/OrderSuccess";
import OrderCancel from "./components/pageComponents/OrderCancel";
// Genereal components
import Navbar from "./components/generalComponents/Navbar";
import Footer from "./components/generalComponents/Footer";
import ScrollToTop from "./utils/ScrollTop";

// App function component
// App functino component
// App function component
function App() {
  // redux hooks & state
  // state in store slice
  const storeState = useSelector((state) => state.storeSlice);
  // store in logic slice
  const logic = useSelector((state) => state.logicSlice);
  // redux hooks
  const dispatch = useDispatch();

  // react router hooks
  const navigate = useNavigate();

  // helper vars
  const hasRestoredRef = useRef(false);

  // functions
  // functions
  // functions

  // fectches products on load
  // fectches products on load
  // fectches products on load
  useEffect(() => {
    dispatch(fetchArtPieces());
  }, [dispatch]);

  // Saves shopping cart state on every change
  // Saves shopping cart state on every change
  // Saves shopping cart state on every change
  useEffect(() => {
    if (!hasRestoredRef.current) return;
    if (!logic.userToken) return;

    const ids = [];
    storeState.shoppingCart.map((p) => ids.push(p._id));
    localStorage.setItem("shoppingCart", JSON.stringify(ids));
  }, [storeState.shoppingCart, logic.userToken]);

  // Restores user's session and shopping cart on re load (orders and users if user role is admin)
  // Restores user's session and shopping cart on re load (orders and users if user role is admin)
  // Restores user's session and shopping cart on re load (orders and users if user role is admin)
  useEffect(() => {
    if (hasRestoredRef.current) return;
    if (storeState.artPieces.length === 0) return;

    const savedToken = localStorage.getItem("token");
    if (!savedToken) {
      hasRestoredRef.current = true;
      return;
    }

    const fetchUser = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_USERS_URL}/me`,
          {
            headers: { Authorization: `Bearer ${savedToken}` },
          }
        );

        dispatch(setisLoggedInToTrue());
        dispatch(setUser(res.data));
        dispatch(setUserToken(savedToken));

        if (res.data.role === "admin") {
          // refresh users
          await refreshUsersData(savedToken, dispatch, setUsers);

          // refresh orders
          await refreshOrdersData(savedToken, dispatch, setOrders);
        }

        // restore cart from stored ids
        const savedCart = localStorage.getItem("shoppingCart");
        if (savedCart) {
          const savedIds = JSON.parse(savedCart);
          savedIds.forEach((id) => {
            dispatch(addProdShoppingCart({ id, silent: true }));
          });
        }

        hasRestoredRef.current = true;
      } catch (err) {
        console.log("Expired or invalid session");
        localStorage.removeItem("token");
        localStorage.removeItem("shoppingCart");
        hasRestoredRef.current = true;
      }
    };

    fetchUser();
  }, [dispatch, storeState.artPieces.length]);

  // restores shopping cart
  // restores shopping cart
  // restores shopping cart
  useEffect(() => {
    if (!hasRestoredRef.current) return;
    if (!logic.userToken) {
      localStorage.removeItem("shoppingCart");
      return;
    }
    const ids = storeState.shoppingCart.map((p) => p._id);
    localStorage.setItem("shoppingCart", JSON.stringify(ids));
  }, [storeState.shoppingCart, logic.userToken]);

  // logs out user when token expires
  // logs out user when token expires
  // logs out user when token expires
  useEffect(() => {
    const token = logic.userToken;
    if (!token) return;

    const payload = jwtDecode(token);
    if (!payload || typeof payload.exp !== "number") return;

    const now = Date.now() / 1000;
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
      localStorage.removeItem("shoppingCart");
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

  // return
  // return
  // return
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

        {logic.isLoggedIn ? (
          <Route path="/cart" element={<ShoppingCart />} />
        ) : (
          <Route path="/cart" element={<Login />} />
        )}

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
        <Route path="/success" element={<OrderSuccess />} />
        <Route path="/cancel" element={<OrderCancel />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <Footer />
    </main>
  );
}

export default App;
