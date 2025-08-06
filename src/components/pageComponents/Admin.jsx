import React from "react";

// React hooks
import { useRef } from "react";

// redux
import { useSelector, useDispatch } from "react-redux";

// React router V6
import { Link } from "react-router-dom";

// Axios
import axios from "axios";

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
  setShowMembersInfo,
} from "../../redux/slices/staticState/logicSlice";

import {
  setInStock,
  setRecentWork,
  setTitle,
  setShortDesc,
  setMedia,
  setCost,
  setNationwideDelivery,
  setInternationalDelivery,
} from "../../redux/slices/state/storeSlice";

// compoonent function
const Admin = () => {
  // redux || state || reducers
  const dispatch = useDispatch();
  const logic = useSelector((state) => state.logicSlice);
  const storeState = useSelector((state) => state.storeSlice);

  // useRef hook for adding product form
  const inStockRef = useRef("");
  const recentWorkRef = useRef("");
  const titleRef = useRef("");
  const shortDescRef = useRef("");
  const mediaRef = useRef("");
  const costRef = useRef(0);
  const nationwideDeliveryRef = useRef(0);
  const internationalDeliveryRef = useRef(0);

  // for dev (to build front end of users info page)
  const users = [];
  users.push(
    logic.adminUser,
    logic.nonAdminUser,
    logic.nonAdminUser2,
    logic.nonAdminUser3,
    logic.nonAdminUser4
  );

  // add post function
  // add post function
  // add post function
  const addPost = (e) => {
    e.preventDefault();
    // form error handling
    if (
      storeState.title === "" ||
      storeState.shortDesc === "" ||
      storeState.media === "" ||
      storeState.cost == false ||
      storeState.nationwideDelivery == false ||
      storeState.internationalDelivery == false
    ) {
      alert("all fields must be completed");
      return;
    }

    // create object to be sento to API
    const formData = new FormData();
    formData.append("reference", storeState.reference);
    formData.append("inStock", storeState.inStock);
    formData.append("added", storeState.added);
    formData.append("recentWork", storeState.recentWork);
    formData.append("title", storeState.title);
    formData.append("shortDesc", storeState.shortDesc);
    formData.append("largeDesc", storeState.largeDesc);
    formData.append("media", storeState.media);
    formData.append("cost", storeState.cost);
    formData.append("nationwideDelivery", storeState.nationwideDelivery);
    formData.append("internationalDelivery", storeState.internationalDelivery);

    // API URL
    const createPostUrl = "http://localhost:3000/posts/create";
    // const createPostUrl = process.env.REACT_APP_DATABASE_URL_CREATE_POST;

    // API call
    axios
      .post(createPostUrl, formData)
      .then((result) => {
        console.log(result);
        console.log("SUCCESS! Post added. Result:", {
          config: result.config,
          data: result.data,
          status: result.status,
          headers: result.headers,
        });

        // Reseting to initial values so app can add another post
        titleRef.current.value = "";
        shortDescRef.current.value = "";
        mediaRef.current.value = "";
        costRef.current.value = "";
        nationwideDeliveryRef.current.value = "";
        internationalDeliveryRef.current.value = "";
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <section className="container mx-auto h-auto mt-32 flex flex-col">
      {/* navbar */}
      <div className="h-[100px] w-full flex flex-col justify-around items-center md:flex-row ">
        {/* see all prods */}
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

        {/* add a prod */}
        <div
          className="hover:cursor-pointer  text-xl"
          onClick={() => dispatch(setShowAddProduct())}
        >
          <p
            className={`${
              logic.showAddProduct ? "border-b-[2px] border-black" : ""
            } hover:text-slate-600`}
          >
            add a product
          </p>
        </div>

        {/* see orders */}
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

        {/* see users info */}
        <div
          className="hover:cursor-pointer  text-xl"
          onClick={() => dispatch(setShowMembersInfo())}
        >
          <p
            className={`${
              logic.showMembersInfo ? "border-b-[2px] border-black" : ""
            } hover:text-slate-600`}
          >
            see members info
          </p>
        </div>
      </div>

      {/* all products */}
      {logic.showAllProducts ? (
        <div className="h-3/4 w-full">
          <div className="h-[100px] flex justify-center items-center text-3xl ">
            <p className="border-b-[1px] border-b-black">All products</p>
          </div>
          {storeState.artPieces.map((p) => (
            <div
              key={p.id}
              className="mx-2 py-5 my-[25px] flex flex-col items-center border-[1px] border-black rounded-xl"
            >
              <img
                src={p.imgSrcHref}
                alt="product image"
                className="w-[200px] md:w-[500px] h-auto"
              />
              <div className="mt-[25px]">Title: {p.title}</div>
              <div className="text-center">Description: {p.shortDesc}</div>
              <div>Price: {`${p.cost} CAD`}</div>
              <div>{p.inStock ? "In Stock" : "Not in Stock"}</div>
              <div>{p.recentWork ? "Recent work" : "Not recent work"}</div>
              <div>NDF: {p.nationwideDelivery}</div>
              <div>IDF: {p.internationalDelivery}</div>
              <div className="text-green-900 mt-[25px] hover:cursor-pointer">
                <Link to={`/editproduct/${p.id}`}>Edit product</Link>
              </div>
              <div
                className="text-red-900 hover:cursor-pointer mt-2"
                onClick={() => toast("Product deleted", toastStyleObject())}
              >
                Delete product
              </div>
            </div>
          ))}
        </div>
      ) : null}

      {/* add a product */}
      {/* here */}
      {/* here */}
      {/* here */}

      {logic.showAddProduct ? (
        <div className="h-[600px] w-full">
          <div className="h-[100px] flex justify-center items-center text-3xl">
            <p className="border-b-[1px] border-b-black">Add a product</p>
          </div>
          <div className="h-full">
            {/* here is the form */}
            {/* here is the form */}
            {/* here is the form */}
            <form
              encType="multipart/form-data"
              className="h-full flex flex-col items-center justify-evenly"
            >
              <div className="flex flex-col">
                <label for="inStock">In Stock?</label>
                <select
                  name="inStock"
                  id="inStock"
                  required
                  className="border-[1px] border-black focus:outline-none"
                  onChange={(e) =>
                    dispatch(setInStock(e.target.value === "true"))
                  }
                  ref={inStockRef}
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
                  onChange={(e) =>
                    dispatch(setRecentWork(e.target.value === "true"))
                  }
                  ref={recentWorkRef}
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
                onChange={(e) => dispatch(setTitle(e.target.value))}
                ref={titleRef}
              />

              <input
                type="text"
                placeholder="Short description"
                name="shortDesc"
                autoComplete="off"
                className="w-3/4 md:w-1/2 text-center border-b-[1px] border-b-transperent hover:border-b-black focus:outline-none"
                onChange={(e) => dispatch(setShortDesc(e.target.value))}
                ref={shortDescRef}
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
                  name="media"
                  autoComplete="off"
                  id="imgSrcHref"
                  className="hidden"
                  ref={mediaRef}
                  onChange={(e) => dispatch(setMedia(e.target.files[0]))}
                />
              </div>

              <input
                type="number"
                placeholder="Price"
                name="cost"
                autoComplete="off"
                className="w-3/4 md:w-1/3 text-center focus:outline-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-moz-appearance]:textfield border-b-[1px] border-b-transperent hover:border-b-black "
                onChange={(e) => dispatch(setCost(e.target.value))}
                ref={costRef}
              />

              <input
                type="number"
                placeholder="Natiowide delivery cost"
                name="nationwideDelivery"
                autoComplete="off"
                className="w-3/4 md:w-1/3 text-center focus:outline-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-moz-appearance]:textfield border-b-[1px] border-b-transperent hover:border-b-black "
                onChange={(e) =>
                  dispatch(setNationwideDelivery(e.target.value))
                }
                ref={nationwideDeliveryRef}
              />

              <input
                type="number"
                placeholder="International delivery cost"
                name="internationalDelivery"
                autoComplete="off"
                className="w-3/4 md:w-1/3 text-center focus:outline-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-moz-appearance]:textfield border-b-[1px] border-b-transperent hover:border-b-black "
                onChange={(e) =>
                  dispatch(setInternationalDelivery(e.target.value))
                }
                ref={internationalDeliveryRef}
              />

              <div className="flex flex-col">
                <button
                  className="hover:text-slate-600 mb-[15px]"
                  onClick={addPost}
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
        <div className="w-full  mt-5">
          <div className="h-[100px] flex justify-center items-center text-3xl ">
            <p className="border-b-[1px] border-b-black">Orders</p>
          </div>
          <div className="h-auto">
            {storeState.orders.length === 0 ? (
              <div className="h-[500px] flex justify-center text-3xl">
                <p>There are no orders</p>
              </div>
            ) : (
              <div className="flex flex-col justify-center items-center">
                {[...storeState.orders].reverse().map((order) => (
                  //  ID & date
                  <div className="w-7/8 border-[1px] border-black m-8 p-5 md:w-2/3 rounded-xl">
                    <div className="flex flex-col md:flex-row md:justify-between">
                      <p className="text-center font-semibold">{`Order ID: ${order.orderId}`}</p>
                      <p className="text-center">{`Date: ${order.date}`}</p>
                    </div>

                    <div className="text-center mt-[10px] text-lg">
                      <p className="mb-[10px]">Items purchased:</p>
                    </div>

                    {/* products */}
                    {order.products.map((product) => (
                      <div className="my-5 flex flex-col items-center md:flex-row justify-between px-5 border-[1px] border-black rounded-lg">
                        <img
                          className="w-[150px] p-3"
                          src={product.imgSrcHref}
                          alt="productImage"
                        />
                        <p className=" text-center text-sm">{`${product.title}`}</p>
                      </div>
                    ))}
                    <div className="text-center text-xl">Customer's info:</div>

                    <div className="p-2 w-full md:full mt-[25px]">
                      {/* client's info */}
                      <div className="p-3 border-[1px] border-black rounded-md  ">
                        <div className="lg:flex justify-between mb-2 text-sm">
                          <p>{`Full name: ${order.user.name} ${order.user.lastname}`}</p>
                          <p>User: {order.user.username} </p>
                        </div>
                      </div>

                      {/* Contact info */}
                      <div className="p-2 mt-3 border-[1px] border-black rounded-md text-sm">
                        <div className="mb-2">
                          <p className="text-center">Contact info:</p>
                        </div>
                        <div>
                          <p>{`Address: ${order.user.address}.  ${
                            order.user.addressUnit
                              ? `Unit ${order.user.addressUnit}.`
                              : ""
                          } ${order.user.city}, ${
                            order.user.provinceOrState
                          }, ${order.user.country}. ${
                            order.user.postalCode
                          }`}</p>
                          <div className="flex justify-between">
                            <p>{`Phone: ${order.user.contactPhoneNumber}`}</p>
                          </div>
                        </div>
                      </div>
                      {/* Shipping info */}
                      <div className="p-2 mt-3 border-[1px] border-black rounded-md text-sm">
                        <div className="mb-2">
                          <p className="text-center ">Shipping info:</p>
                        </div>
                        {order.user.contactEqualShipping ? (
                          <div className="flex justify-between">
                            <p>Same as contact info</p>
                          </div>
                        ) : (
                          <div>
                            <p>{`Address: ${order.user.shippingAddress}. ${
                              order.user.shippingAddressUnit
                                ? `Unit ${order.user.shippingAddressUnit}.`
                                : ""
                            } ${order.user.shippingCity}, ${
                              order.user.shippingProviceOrState
                            }, ${order.user.shippingCountry}. ${
                              order.user.shippingPostalCode
                            }`}</p>
                            <div className="flex justify-between">
                              <p>{`Phone: ${order.user.shippingPhoneNumber}`}</p>
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="mt-5 text-center">{`Amount paid: ${"000.00 CAD"}`}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      ) : null}

      {/* see users info */}
      {logic.showMembersInfo ? (
        <div className="w-full mt-10">
          <div className="h-[100px] flex justify-center items-center text-3xl ">
            <p className="border-b-[1px] border-b-black">Members' info</p>
          </div>
          <div className="h-auto">
            {users.length === 0 ? (
              <div className="h-[500px] flex items-center justify-center text-3xl">
                <p>There are no members yet</p>
              </div>
            ) : (
              <div>
                {users.map((user) => (
                  <div className="p-[25px] my-[50px] border-[3px] border-black m-2 rounded-xl flex flex-col py-10">
                    <p className="text-center mb-[25px] border-[1px] border-black rounded-xl text-3xl p-4 text-pretty">
                      {`${user.name} ${user.lastname}

                         ${
                           user.isActive
                             ? "(active member)"
                             : "(inactive member)"
                         }`}
                    </p>

                    <div className="border-[1px] border-black rounded-xl p-5 flex flex-col items-center justify-center lg:flex-row lg:justify-between">
                      <p className="">{user.username}</p>

                      {user.contactPhoneNumber ? (
                        <p className="mt-5 lg:mt-0">
                          {user.contactPhoneNumber}
                        </p>
                      ) : (
                        ""
                      )}
                    </div>

                    {user.address ? (
                      <p className="border-[1px] border-black rounded-lg my-5 p-5 text-center">
                        Contact address:{" "}
                        {`${user.address}. ${
                          user.addressUnit ? `Unit ${user.addressUnit}.` : ""
                        } ${user.city}, ${user.provinceOrState}. ${
                          user.country
                        }. ${user.postalCode} `}
                      </p>
                    ) : (
                      ""
                    )}

                    {user.contactEqualShipping ? (
                      <p className="border-[1px] border-black rounded-lg my-5 p-5 text-center">
                        shipping info is the same as contact info
                      </p>
                    ) : user.shippingPhoneNumber ? (
                      <div className="border-[1px] border-black rounded-lg my-5 p-5 text-center">
                        <p className="">
                          shipping phone number: {user.shippingPhoneNumber}
                        </p>

                        <p className="mt-5">
                          Shipping address:{" "}
                          {`${user.shippingAddress}. ${
                            user.shippingAddressUnit
                              ? `Unit ${user.shippingAddressUnit}.`
                              : ""
                          }   ${user.shippingCity}, ${
                            user.shippingProviceOrState
                          }. ${user.shippingCountry}. ${
                            user.shippingPostalCode
                          } `}
                        </p>
                      </div>
                    ) : (
                      ""
                    )}
                    <div className="border-[2px] border-black rounded-lg my-5 p-10 text-center">
                      <p className="text-xl">Past orders:</p>
                      {user.pastOrders.length > 0 ? (
                        user.pastOrders.map((order) => (
                          <div className="border-[1px] border-black rounded-lg my-10 flex flex-col">
                            <p className="pt-5">{`Date of purcharse: ${order.date}`}</p>
                            <div className="flex flex-col items-center md:flex-row justify-between lg:justify-around p-5">
                              <img
                                src={order.imgSrcHref}
                                alt="productImg"
                                className="w-[125px] my-5"
                              />

                              <div>
                                <p className="text-sm py-1">{`${order.title}`}</p>
                                <p className="text-sm py-1">{`${order.shortDesc}`}</p>
                                <p className="text-sm py-1">{`Total amount paid: $${
                                  (order.cost + order.nationwideDelivery) *
                                    0.13 +
                                  order.cost +
                                  order.nationwideDelivery
                                } CAD`}</p>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p>there aren't any past orders</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      ) : null}
    </section>
  );
};

export default Admin;
