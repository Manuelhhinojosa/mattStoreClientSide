// React Router V6
import { Routes, Route } from "react-router-dom";

// Components
// Page components
import Home from "./components/pageComponents/Home";
import About from "./components/pageComponents/About";
import RecentWork from "./components/pageComponents/RecentWork";
import Contact from "./components/pageComponents/Contact";
import Store from "./components/pageComponents/Store";
import SingleProd from "./components/pageComponents/SingleProd";
import ShoppingCart from "./components/pageComponents/ShoppingCart";
// Genereal components
import Navbar from "./components/generalComponents/Navbar";
// Toastify component for handling errors
import { ToastContainer } from "react-toastify";

// redux
import { useSelector } from "react-redux";

function App() {
  // redux & state
  const storeState = useSelector((state) => state.storeSlice);

  return (
    <main>
      <ToastContainer />
      <Navbar />
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
      </Routes>
    </main>
  );
}

export default App;
