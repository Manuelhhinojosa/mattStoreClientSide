import React from "react";

// redux
import { useSelector } from "react-redux";

// React router V6
import { useNavigate, useLocation } from "react-router-dom";

const EditProduct = () => {
  // redux & state
  const storeState = useSelector((state) => state.storeSlice);
  // React router V6
  const navigate = useNavigate();
  const location = useLocation();
  // identifying single product by id in the url
  let reference = location.pathname.slice(13);
  let product = {};
  storeState.artPieces.forEach((p) => {
    if (p.id == reference) {
      product = p;
      return;
    }
  });

  return (
    <section className="container mx-auto h-auto mt-32 flex flex-col">
      <div className="h-[600px] w-full">
        <div className="h-[100px] flex justify-center items-center text-3xl">
          <p className="border-b-[1px] border-b-black ">Edit product</p>
        </div>
        <div className="h-full">
          <form
            action=""
            className="h-full flex flex-col items-center justify-evenly"
          >
            <img
              src={product.imgSrcHref}
              alt="productImage"
              className="w-[125px]"
            />

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
              placeholder={product.title}
              name="title"
              autoComplete="off"
              className="w-3/4 md:w-1/2 text-center border-b-[1px] border-b-transperent hover:border-b-black focus:outline-none"
            />

            <input
              type="text"
              placeholder={product.shortDesc}
              name="shortDesc"
              autoComplete="off"
              className="w-3/4 md:w-1/2 text-center border-b-[1px] border-b-transperent hover:border-b-black focus:outline-none"
            />

            <input
              type="number"
              placeholder={product.cost}
              name="cost"
              autoComplete="off"
              className="w-3/4 md:w-1/3 text-center focus:outline-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-moz-appearance]:textfield border-b-[1px] border-b-transperent hover:border-b-black "
            />

            <input
              type="number"
              placeholder={product.nationwideDelivery}
              name="nationwideDelivery"
              autoComplete="off"
              className="w-3/4 md:w-1/3 text-center focus:outline-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-moz-appearance]:textfield border-b-[1px] border-b-transperent hover:border-b-black "
            />

            <input
              type="number"
              placeholder={product.internationalDelivery}
              name="internationalDelivery"
              autoComplete="off"
              className="w-3/4 md:w-1/3 text-center focus:outline-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-moz-appearance]:textfield border-b-[1px] border-b-transperent hover:border-b-black "
            />

            <div className="flex flex-col">
              <button
                className="hover:text-slate-600 mb-[15px]"
                onClick={(e) => e.preventDefault()}
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
