// React Router V6
import { Routes, Route } from "react-router-dom";

// Components
// Page components
import Home from "./components/pageComponents/Home";
import About from "./components/pageComponents/About";
import RecentWork from "./components/pageComponents/RecentWork";
// Genereal components
import Navbar from "./components/generalComponents/Navbar";

function App() {
  return (
    <main className="overflow-hidden overflow-y-scroll">
      <Navbar />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/recent" element={<RecentWork />} />
      </Routes>
    </main>
  );
}

export default App;
