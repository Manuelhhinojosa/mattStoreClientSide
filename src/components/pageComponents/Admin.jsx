import React from "react";

// redux
import { useSelector, useDispatch } from "react-redux";

// React router V6
import { useNavigate } from "react-router-dom";

// Toastify for error and success message handling
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// error handling state (for styling)
import { toastStyleObject } from "../../tostifyStyle";

// Redux (functions)
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

  // React router V6
  const navigate = useNavigate();

  return (
    <section className="container mx-auto h-auto mt-32 flex flex-col">
      <div className="h-[100px] w-full flex flex-col justify-around items-center md:flex-row ">
        <div
          className="hover:cursor-pointer text-xl"
          onClick={() => dispatch(setShowAllProducts())}
        >
          <p
            className={`${
              logic.showAllProducts ? "border-b-[2px] border-black" : ""
            } hover:text-slate-600`}
          >
            see all products
          </p>
        </div>

        <div
          className="hover:cursor-pointer  text-xl"
          onClick={() => dispatch(setShowAddProduct())}
        >
          <p
            className={`${
              logic.showAddProduct ? "border-b-[2px] border-black" : ""
            } hover:text-slate-600`}
          >
            {" "}
            add a product
          </p>
        </div>

        <div
          className="hover:cursor-pointer  text-xl"
          onClick={() => dispatch(setShowViewOrders())}
        >
          <p
            className={`${
              logic.showViewOrders ? "border-b-[2px] border-black" : ""
            } hover:text-slate-600`}
          >
            see orders
          </p>
        </div>
      </div>

      {/* all products */}
      {logic.showAllProducts ? (
        <div className="h-3/4 w-full">
          <div className="h-[100px] flex justify-center items-center text-3xl ">
            <p>All products</p>
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
              <div
                className="text-green-900 mt-[25px] hover:cursor-pointer"
                onClick={() => navigate("/editproduct")}
              >
                Edit product
              </div>
              <div
                className="text-red-900 hover:cursor-pointer mt-2"
                onClick={() => toast("Product deleted", toastStyleObject())}
              >
                Delete product
              </div>
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
        <div className="h-[600px] w-full">
          <div className="h-[100px] flex justify-center items-center text-3xl">
            <p>Add a product</p>
          </div>
          <div className="h-full">
            <form
              action=""
              className="h-full flex flex-col items-center justify-evenly"
            >
              <div className="flex flex-col">
                <label for="inStock">In Stock?</label>
                <select
                  name="inStock"
                  id="inStock"
                  required
                  className="border-[1px] border-black focus:outline-none"
                >
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </div>

              <div className="flex flex-col">
                <label for="recentWork">Recent work?</label>
                <select
                  name="recentWork"
                  id="recentWork"
                  required
                  className="border-[1px] border-black focus:outline-none"
                >
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </div>

              <input
                type="text"
                placeholder="Title"
                name="title"
                autoComplete="off"
                className="w-3/4 md:w-1/2 text-center border-b-[1px] border-b-transperent hover:border-b-black focus:outline-none"
              />

              <input
                type="text"
                placeholder="Short description"
                name="shortDesc"
                autoComplete="off"
                className="w-3/4 md:w-1/2 text-center border-b-[1px] border-b-transperent hover:border-b-black focus:outline-none"
              />

              <div className="flex flex-col">
                <label
                  className="text-center mb-[10px] hover:cursor-pointer hover:text-slate-600 border-b-[1px] border-b-black"
                  for="imgSrcHref"
                >
                  Select image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  name="imgSrcHref"
                  autoComplete="off"
                  id="imgSrcHref"
                  className="hidden"
                />
              </div>

              <input
                type="number"
                placeholder="Price"
                name="cost"
                autoComplete="off"
                className="w-3/4 md:w-1/3 text-center focus:outline-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-moz-appearance]:textfield border-b-[1px] border-b-transperent hover:border-b-black "
              />

              <input
                type="number"
                placeholder="Natiowide delivery cost"
                name="nationwideDelivery"
                autoComplete="off"
                className="w-3/4 md:w-1/3 text-center focus:outline-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-moz-appearance]:textfield border-b-[1px] border-b-transperent hover:border-b-black "
              />

              <input
                type="number"
                placeholder="International delivery cost"
                name="internationalDelivery"
                autoComplete="off"
                className="w-3/4 md:w-1/3 text-center focus:outline-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-moz-appearance]:textfield border-b-[1px] border-b-transperent hover:border-b-black "
              />

              <div className="flex flex-col">
                <button
                  className="hover:text-slate-600 mb-[15px]"
                  onClick={(e) => e.preventDefault()}
                >
                  Add product
                </button>
                <button
                  className="hover:text-slate-600"
                  onClick={() => dispatch(setShowAllProducts())}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}

      {/* see orders */}
      {logic.showViewOrders ? (
        <div className="w-full">
          <div className="h-[100px] flex justify-center items-center text-3xl ">
            <p>Orders</p>
          </div>
          <div className="h-auto">
            {storeState.orders.length === 0 ? (
              <div className="h-[500px] flex items-center justify-center text-3xl">
                <p>There are no orders</p>
              </div>
            ) : (
              <div>
                <p>there are orders</p>
              </div>
            )}
          </div>
        </div>
      ) : null}
    </section>
  );
};

export default Admin;
