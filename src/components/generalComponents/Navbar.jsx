import React from "react";

// redux
import { useSelector, useDispatch } from "react-redux";
import { toggleNavbar } from "../../redux/slices/staticState/logicSlice";

const Navbar = () => {
  // redux & state
  const dispatch = useDispatch();
  const staticText = useSelector((state) => state.staticTextSlice);
  const logic = useSelector((state) => state.logictSlice);

  return <nav>Navbar</nav>;
};

export default Navbar;
