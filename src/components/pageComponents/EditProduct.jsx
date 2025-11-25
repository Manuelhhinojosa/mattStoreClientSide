import React from "react";

// react hooks
import { useState } from "react";

// redux
// redux hooks
import { useSelector, useDispatch } from "react-redux";

// React router V6
// react router hooks
import { useNavigate, useLocation } from "react-router-dom";

// Axios
import axios from "axios";

// Toastify for error and success message handling
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// error handling state (for styling)
import { toastStyleObject } from "../../tostifyStyle";

// redux
// functions from redux store slice
import {
  fetchArtPieces,
  setOrders,
  setUsers,
} from "../../redux/slices/state/storeSlice";
// functions from redux logic slice
import { setShowAllProducts } from "../../redux/slices/staticState/logicSlice";

// helper vars
// headers config
import { getHeadersConfig } from "../../utils/vars";

// helper functions
import {
  getApiSuccessMessage,
  refreshOrdersData,
  refreshUsersData,
  getApiErrorMessage,
} from "../../utils/helpers";

// edit product function component
// edit product function component
// edit product function component
const EditProduct = () => {
  // redux & state
  // state in store slice
  const storeState = useSelector((state) => state.storeSlice);
  // state in logic slice
  const logic = useSelector((state) => state.logicSlice);
  // redux hooks
  const dispatch = useDispatch();

  // React router V6 hooks
  const navigate = useNavigate();
  const location = useLocation();

  // helper vars
  // identifying single product by id in the url
  let reference = location.pathname.slice(13);
  let product = {};

  // functions
  // functions
  // functions

  // identifying single product by id in the url
  // identifying single product by id in the url
  // identifying single product by id in the url
  storeState.artPieces.forEach((p) => {
    if (p._id == reference) {
      product = p;
      return;
    }
  });

  // setting product to be edited
  const [newProductSate, setNewProductState] = useState(product);

  // handle edit product
  // handle edit product
  // handle edit product
  const handleEditProduct = async (e) => {
    e.preventDefault();

    const {
      title,
      shortDesc,
      cost,
      nationwideDelivery,
      internationalDelivery,
    } = newProductSate;

    // form validation
    if (
      !title ||
      !shortDesc ||
      cost <= 0 ||
      nationwideDelivery <= 0 ||
      internationalDelivery <= 0
    ) {
      toast("Please fill in all required fields.", toastStyleObject());
      return;
    }

    try {
      // edit product API call
      const result = await axios.put(
        `${import.meta.env.VITE_API_POSTS_URL}/${product._id}`,
        newProductSate,
        getHeadersConfig()
      );

      // success after editing product

      // console result
      getApiSuccessMessage(result);

      // refresh products in storeState slice
      dispatch(fetchArtPieces());

      // refresh orders API call
      await refreshOrdersData(logic.userToken, dispatch, setOrders);

      // refresh users API call
      await refreshUsersData(logic.userToken, dispatch, setUsers);

      // make sure admin shows list of all products after edit
      dispatch(setShowAllProducts());

      // navigate to admin page
      navigate("/admin");

      // confirmation message
      toast("Product edited", toastStyleObject());
    } catch (error) {
      // error handling
      console.log("Error editing product:", error);

      // error message
      toast(getApiErrorMessage(error), toastStyleObject());
    }
  };

  // return
  // return
  // retrun
  return (
    <section className="container mx-auto h-auto mt-32 flex flex-col">
      <div className="h-[600px] w-full">
        <div className="h-[100px] flex justify-center items-center text-3xl">
          <p className="underline ">Edit product</p>
        </div>
        {/* form container */}
        <div className="h-full">
          {/* form */}
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

            {/* title */}
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

            {/* short desc */}
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

            {/* cost */}
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

            {/* national delivery fee */}
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

            {/* international delivery fee */}
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

            {/* button */}
            <div className="flex flex-col">
              <button
                className="hover:text-blue-500 mb-[15px]"
                onClick={(e) => handleEditProduct(e)}
              >
                Edit product
              </button>

              {/* cancel button */}
              <button
                className="hover:text-blue-500"
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
