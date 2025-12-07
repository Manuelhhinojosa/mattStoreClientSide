// react hooks
import { useEffect } from "react";

// react router hooks
import { useLocation } from "react-router-dom";

// functions
// functions
// functions

// scroll top
// scroll top
// scroll top
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
