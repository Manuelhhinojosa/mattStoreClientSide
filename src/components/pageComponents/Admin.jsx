import React from "react";

// redux
import { useSelector, useDispatch } from "react-redux";

import {
  setShowAllProducts,
  setShowAddProduct,
  setShowViewOrders,
} from "../../redux/slices/staticState/logicSlice";

const Admin = () => {
  // redux || state || reducers
  const dispatch = useDispatch();
  const logic = useSelector((state) => state.logicSlice);
  const storeState = useSelector((state) => state.storeSlice);

  return (
    <section className="container mx-auto h-auto mt-32 flex flex-col">
      <div className="h-[100px] w-full flex flex-col justify-around items-center md:flex-row">
        <div
          className="hover:cursor-pointer text-xl"
          onClick={() => dispatch(setShowAllProducts())}
        >
          <p className="hover:text-slate-600"> see all products</p>
        </div>
        <div
          className="hover:cursor-pointer  text-xl"
          onClick={() => dispatch(setShowAddProduct())}
        >
          <p className="hover:text-slate-600"> add a product</p>
        </div>
        <div
          className="hover:cursor-pointer  text-xl"
          onClick={() => dispatch(setShowViewOrders())}
        >
          <p className="hover:text-slate-600">see orders</p>
        </div>
      </div>

      {/* all products */}
      {logic.showAllProducts ? (
        <div className="h-3/4 w-full">
          <div className="h-[100px] flex justify-center items-center text-3xl ">
            <p className="">All products</p>
          </div>
          {storeState.artPieces.map((p) => (
            <div className="mx-2 my-[25px] flex flex-col items-center">
              <img
                src={p.imgSrcHref}
                alt="product image"
                className="w-[200px] md:w-[500px] h-auto"
              />
              <div className="mt-[25px]">Title: {p.title}</div>
              <div>Description: {p.shortDesc}</div>
              <div>Price: {`${p.cost} CAD`}</div>
              <div>{p.inStock ? "In Stock" : "Not in Stock"}</div>
              <div>{p.recentWork ? "Recent work" : "Not recent work"}</div>
              <div>Natioal delivery cost: {p.nationwideDelivery}</div>
              <div>International delivery cost: {p.internationalDelivery}</div>
              <div className="text-green-900 mt-[25px]">Edit product</div>
              <div className="text-red-900">Delete product</div>
              <br />
              <br />
              <div>+++ +++ +++</div>
              <br />
              <br />
            </div>
          ))}
        </div>
      ) : null}

      {/* add a product */}
      {logic.showAddProduct ? (
        <div className="h-3/4 w-full bg-red-300">add product</div>
      ) : null}

      {/* see orders */}
      {logic.showViewOrders ? (
        <div className="h-3/4 w-full bg-red-300">see orders</div>
      ) : null}
    </section>
  );
};

export default Admin;
