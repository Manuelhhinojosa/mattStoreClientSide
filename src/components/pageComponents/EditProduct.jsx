import React from "react";

// react hooks
import { useState } from "react";

// redux
import { useSelector, useDispatch } from "react-redux";

// React router V6
import { useNavigate, useLocation } from "react-router-dom";

// Axios
import axios from "axios";

// Toastify for error and success message handling
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// error handling state (for styling)
import { toastStyleObject } from "../../tostifyStyle";

import {
  fetchArtPieces,
  setOrders,
  setUsers,
} from "../../redux/slices/state/storeSlice";
import { setShowAllProducts } from "../../redux/slices/staticState/logicSlice";

const EditProduct = () => {
  // redux & state
  const storeState = useSelector((state) => state.storeSlice);
  const logic = useSelector((state) => state.logicSlice);
  // redux hooks
  const dispatch = useDispatch();
  // React router V6
  const navigate = useNavigate();
  const location = useLocation();
  // identifying single product by id in the url
  let reference = location.pathname.slice(13);
  let product = {};
  storeState.artPieces.forEach((p) => {
    if (p._id == reference) {
      product = p;
      return;
    }
  });

  const [newProductSate, setNewProductState] = useState(product);

  // functions
  // handle edit product
  const handleEditProduct = (e) => {
    e.preventDefault();

    // form validation
    const {
      title,
      shortDesc,
      cost,
      nationwideDelivery,
      internationalDelivery,
    } = newProductSate;

    // api url
    const editproductUrl = "http://localhost:3000/posts";
    // const editPostUrl = process.env.REACT_APP_EDIT_POST_URL;
    const config = {
      headers: {
        Authorization: `Bearer ${logic.userToken}`,
        "Content-Type": "application/json",
      },
    };

    // axios call
    axios
      .put(`${editproductUrl}/${product._id}`, newProductSate, config)
      .then((result) => {
        console.log("Result: ", result.data);
        console.log("SUCCESS! Post edited. Result:", {
          config: result.config,
          data: result.data,
          status: result.status,
          headers: result.headers,
        });

        // setting artpieces after edit
        dispatch(fetchArtPieces());
        // making sure admin will show list of all products after edit
        dispatch(setShowAllProducts());
        // fetching orders
        axios
          .get("http://localhost:3000/orders/allorders", config)
          .then((res) => {
            const orders = res.data;
            dispatch(setOrders(orders));
          });

        // fetching users
        axios.get("http://localhost:3000/users/allusers", config).then((r) => {
          const users = r.data;
          dispatch(setUsers(users));
        });
        // navigate to admin pate
        navigate("/admin");

        // confirmation message
        toast("Product edited", toastStyleObject());
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <section className="container mx-auto h-auto mt-32 flex flex-col">
      <div className="h-[600px] w-full">
        <div className="h-[100px] flex justify-center items-center text-3xl">
          <p className="border-b-[1px] border-b-black ">Edit product</p>
        </div>
        <div className="h-full">
          <form
            encType="multipart/form-data"
            className="h-full flex flex-col items-center justify-evenly"
          >
            <img
              src={product.media.url}
              alt="productImage"
              className="w-[150px] rounded-lg shadow-lg"
            />

            {/* in stock */}
            <div className="flex flex-col text-sm">
              <label htmlFor="inStock">In Stock?</label>
              <select
                name="inStock"
                id="inStock"
                required
                className="border-[1px] border-black focus:outline-none"
                onChange={(e) => {
                  const newValue = e.target.value;

                  setNewProductState({ ...newProductSate, inStock: newValue });
                }}
              >
                {product.inStock ? (
                  <>
                    <option value="true">yes</option>
                    <option value="false">No</option>
                  </>
                ) : (
                  <>
                    <option value="false">No</option>
                    <option value="true">yes</option>
                  </>
                )}
              </select>
            </div>

            {/* recent work */}
            <div className="flex flex-col text-sm">
              <label for="recentWork">Recent work?</label>
              <select
                name="recentWork"
                id="recentWork"
                required
                className="border-[1px] border-black focus:outline-none"
                onChange={(e) => {
                  const newValue = e.target.value;

                  setNewProductState({
                    ...newProductSate,
                    recentWork: newValue,
                  });
                }}
              >
                {product.recentWork ? (
                  <>
                    <option value="true">yes</option>
                    <option value="false">No</option>
                  </>
                ) : (
                  <>
                    <option value="false">No</option>
                    <option value="true">yes</option>
                  </>
                )}
              </select>
            </div>

            <input
              type="text"
              placeholder={`Title: ${product.title}`}
              name="title"
              autoComplete="off"
              required
              className="w-3/4 md:w-1/2 text-center border-b-[1px] border-b-transperent hover:border-b-black focus:outline-none text-sm"
              onChange={(e) => {
                const newValue = e.target.value;

                setNewProductState({ ...newProductSate, title: newValue });
              }}
            />

            <input
              type="text"
              placeholder={`Description: ${product.shortDesc}`}
              name="shortDesc"
              autoComplete="off"
              required
              className="w-3/4 md:w-1/2 text-center border-b-[1px] border-b-transperent hover:border-b-black focus:outline-none text-sm"
              onChange={(e) => {
                const newValue = e.target.value;

                setNewProductState({ ...newProductSate, shortDesc: newValue });
              }}
            />

            <input
              type="number"
              placeholder={`Price: ${product.cost}`}
              name="cost"
              autoComplete="off"
              required
              className="w-3/4 md:w-1/3 text-center focus:outline-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-moz-appearance]:textfield border-b-[1px] border-b-transperent hover:border-b-black text-sm"
              onChange={(e) => {
                const newValue = e.target.value;

                setNewProductState({ ...newProductSate, cost: newValue });
              }}
            />

            <input
              type="number"
              placeholder={`NDF: ${product.nationwideDelivery}`}
              name="nationwideDelivery"
              autoComplete="off"
              required
              className="w-3/4 md:w-1/3 text-center focus:outline-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-moz-appearance]:textfield border-b-[1px] border-b-transperent hover:border-b-black text-sm"
              onChange={(e) => {
                const newValue = e.target.value;

                setNewProductState({
                  ...newProductSate,
                  nationwideDelivery: newValue,
                });
              }}
            />

            <input
              type="number"
              placeholder={`IDF: ${product.internationalDelivery}`}
              name="internationalDelivery"
              autoComplete="off"
              required
              className="w-3/4 md:w-1/3 text-center focus:outline-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-moz-appearance]:textfield border-b-[1px] border-b-transperent hover:border-b-black text-sm"
              onChange={(e) => {
                const newValue = e.target.value;

                setNewProductState({
                  ...newProductSate,
                  internationalDelivery: newValue,
                });
              }}
            />

            <div className="flex flex-col">
              <button
                className="hover:text-slate-600 mb-[15px]"
                onClick={(e) => handleEditProduct(e)}
              >
                Edit product
              </button>
              <button
                className="hover:text-slate-600"
                onClick={() => navigate("/admin")}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default EditProduct;
