// React Router V6
import { Routes, Route } from "react-router-dom";

// Components
// Page components
import Home from "./components/pageComponents/Home";
import About from "./components/pageComponents/About";
// Genereal components
import Navbar from "./components/generalComponents/Navbar";

function App() {
  return (
    <main className="overflow-y-hidden">
      <Navbar />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </main>
  );
}

export default App;
