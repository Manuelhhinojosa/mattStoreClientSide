import React from "react";

// redux
import { useSelector } from "react-redux";

const ShoppingCart = () => {
  // redux & state
  const storeState = useSelector((state) => state.storeSlice);
  return (
    <div>
      <h1>cart</h1>
      {storeState.shoppingCart.map((prod) => (
        <h2>{prod.title}</h2>
      ))}
    </div>
  );
};

export default ShoppingCart;
