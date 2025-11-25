import React from "react";

// react hooks
import { useRef } from "react";

// React router V6
// react router hooks
import { Link } from "react-router-dom";

// Axios
import axios from "axios";

// Toastify for error and success message handling
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// error handling state (for styling)
import { toastStyleObject } from "../../tostifyStyle";

// redux
// redux hooks
import { useSelector, useDispatch } from "react-redux";
// functions from redux / logic slice
import {
  setShowAllProducts,
  setShowAddProduct,
  setShowViewOrders,
  setShowMembersInfo,
  setUser,
} from "../../redux/slices/staticState/logicSlice";
// functions from redux / store slice
import {
  // for new product
  setInStock,
  setRecentWork,
  setTitle,
  setShortDesc,
  setMedia,
  setCost,
  setNationwideDelivery,
  setInternationalDelivery,
  // users
  setUsers,
  // orders
  setOrders,
} from "../../redux/slices/state/storeSlice";
// fetching products function  from store slice
import { fetchArtPieces } from "../../redux/slices/state/storeSlice";

// helper functions
import {
  refreshOrdersData,
  refreshUsersData,
  refreshUserData,
  getApiErrorMessage,
  getApiSuccessMessage,
} from "../../utils/helpers";

// helper vars
// headers config
import { getHeadersConfig } from "../../utils/vars";

// Admin compoonent function
// Admin compoonent function
// Admin compoonent function
const Admin = () => {
  // redux and state
  // redux hooks and state
  const dispatch = useDispatch();
  // state in logic slice
  const logic = useSelector((state) => state.logicSlice);
  // state in store slice
  const storeState = useSelector((state) => state.storeSlice);

  // react hooks
  const fileInputRef = useRef(null);

  // functions
  // functions
  // functions

  // add post function
  // add post function
  // add post function
  const addPost = async (e) => {
    e.preventDefault();

    const {
      title,
      shortDesc,
      media,
      cost,
      nationwideDelivery,
      internationalDelivery,
    } = storeState;

    // form validation
    if (
      !title ||
      !shortDesc ||
      !media ||
      cost <= 0 ||
      nationwideDelivery <= 0 ||
      internationalDelivery <= 0
    ) {
      toast("Make sure all the fields are filled.", toastStyleObject());
      return;
    }

    // create object to be sent to API
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

    try {
      // API call to add new post
      const result = await axios.post(
        `${import.meta.env.VITE_API_POSTS_URL}/create`,
        formData,
        getHeadersConfig()
      );

      // success after api call

      // console log result
      getApiSuccessMessage(result);

      // re-fetch products array in storeState slice
      dispatch(fetchArtPieces());

      // reset fields to initial values so admin can add another post
      dispatch(setInStock(true));
      dispatch(setRecentWork(true));
      dispatch(setTitle(""));
      dispatch(setShortDesc(""));
      dispatch(setMedia(""));
      dispatch(setCost(0));
      dispatch(setNationwideDelivery(0));
      dispatch(setInternationalDelivery(0));
      if (fileInputRef.current) {
        fileInputRef.current.value = null;
      }

      // redirect admin to all products page  within admin page
      dispatch(setShowAllProducts());

      // confirmation message
      toast("Product added", toastStyleObject());
    } catch (error) {
      // error handling
      console.log("Error adding post:", error);

      // error message
      toast(getApiErrorMessage(error), toastStyleObject());
    }
  };

  // handle delete product
  // handle delete product
  // handle delete product
  const handleDeleteProduct = async (id) => {
    try {
      // delete product API call
      const result = await axios.delete(
        `${import.meta.env.VITE_API_POSTS_URL}/${id}`,
        getHeadersConfig()
      );

      // successafter deleting product call

      // console log result
      getApiSuccessMessage(result);

      // success message
      toast("Product deleted", toastStyleObject());

      // refresh products in storeState slice
      dispatch(fetchArtPieces());

      // refresh orders API call
      await refreshOrdersData(logic.userToken, dispatch, setOrders);
    } catch (error) {
      // error handling
      console.log("Error:", error);

      // error message
      toast(getApiErrorMessage(error), toastStyleObject());
    }
  };

  // handle order status update
  // handle order status update
  // handle order status update
  const handleStatusChange = async (id, newStatus) => {
    // data
    const data = {
      _id: id,
      status: newStatus,
    };

    try {
      // update status API call
      const result = await axios.patch(
        `${import.meta.env.VITE_API_ORDERS_URL}/editorderstatus`,
        data,
        getHeadersConfig()
      );

      // success after updating order status call

      // console log result
      getApiSuccessMessage(result);

      // success message
      toast("Order status updated", toastStyleObject());

      // refresh users API call
      await refreshUsersData(logic.userToken, dispatch, setUsers);

      // refresh orders API call
      await refreshOrdersData(logic.userToken, dispatch, setOrders);

      // refresh posts
      dispatch(fetchArtPieces());

      // refresh user API call
      await refreshUserData(logic.user._id, logic.userToken, dispatch, setUser);
    } catch (error) {
      // error handling
      console.log("Order status update error:", error);

      // error message
      toast(getApiErrorMessage(error), toastStyleObject());
    }
  };

  // handle delete user (account)
  // handle delete user (account)
  // handle delete user (account)
  const handleDeleteAcc = async (id) => {
    try {
      // delete user API call
      const result = await axios.delete(
        `${import.meta.env.VITE_API_USERS_URL}/${id}`,
        getHeadersConfig()
      );

      // success after delete acc call

      // console log result
      getApiSuccessMessage(result);

      // success message
      toast("User account deleted", toastStyleObject());

      // refresh users API call
      await refreshUsersData(logic.userToken, dispatch, setUsers);

      // refresh orders API call
      await refreshOrdersData(logic.userToken, dispatch, setOrders);
    } catch (error) {
      // error handling
      console.log("Delete account error:", error);

      // error message
      toast(getApiErrorMessage(error), toastStyleObject());
    }
  };

  return (
    <section className="container mx-auto h-auto mt-32 flex flex-col">
      {/* admin navbar */}
      <div className=" w-full flex flex-col justify-around items-center md:flex-row mb-5 ">
        {/* see all prods */}
        <div
          className="hover:cursor-pointer  "
          onClick={() => dispatch(setShowAllProducts())}
        >
          <p
            className={`${
              logic.showAllProducts ? "underline text-xl font-semibold" : ""
            } hover:text-slate-600`}
          >
            see all products
          </p>
        </div>

        {/* add a prod */}
        <div
          className="hover:cursor-pointer  "
          onClick={() => dispatch(setShowAddProduct())}
        >
          <p
            className={`${
              logic.showAddProduct ? "underline text-xl font-semibold" : ""
            } hover:text-slate-600`}
          >
            add a product
          </p>
        </div>

        {/* see orders */}
        <div
          className="hover:cursor-pointer "
          onClick={() => dispatch(setShowViewOrders())}
        >
          <p
            className={`${
              logic.showViewOrders ? "underline text-xl font-semibold" : ""
            } hover:text-slate-600`}
          >
            see orders
          </p>
        </div>

        {/* see users info */}
        <div
          className="hover:cursor-pointer  "
          onClick={() => dispatch(setShowMembersInfo())}
        >
          <p
            className={`${
              logic.showMembersInfo ? "underline text-xl font-semibold" : ""
            } hover:text-slate-600`}
          >
            see members info
          </p>
        </div>
      </div>

      {/* all products section*/}
      {logic.showAllProducts ? (
        <div className=" w-full ">
          {[...storeState.artPieces].reverse().map((p) => (
            <div
              key={p._id}
              className=" py-12 mx-10 my-[50px] flex flex-col items-center border-[1px] border-black rounded-xl text-sm md:flex-row justify-evenly shadow-xl "
            >
              <img
                src={p.media.url}
                alt="product image"
                className="max-h-[350px] rounded-3xl shadow"
              />
              <div className="text-center">
                <div className="mt-[25px]">Title: {p.title}</div>
                <div className="text-center">Description: {p.shortDesc}</div>
                <div>Price: {`${p.cost} CAD`}</div>
                <div>{p.inStock ? "In Stock" : "Not in Stock"}</div>
                <div>{p.recentWork ? "Recent work" : "Not recent work"}</div>
                <div>NDF: {p.nationwideDelivery}</div>
                <div>IDF: {p.internationalDelivery}</div>
                <div className="mt-[25px] hover:cursor-pointer hover:text-gray-500 underline">
                  <Link to={`/editproduct/${p._id}`}>Edit product</Link>
                </div>
                <div
                  className="hover:text-red-900 hover:cursor-pointer mt-2 underline"
                  onClick={() => handleDeleteProduct(p._id)}
                >
                  Delete product
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : null}

      {/* add a product section */}
      {logic.showAddProduct ? (
        <div className="h-[550px] w-full">
          <div className="h-full">
            {/* form */}
            <form
              encType="multipart/form-data"
              className="h-full flex flex-col items-center justify-evenly"
            >
              <div className="flex flex-col">
                <label htmlFor="inStock">In Stock?</label>
                <select
                  name="inStock"
                  id="inStock"
                  required
                  className="border-[1px] border-black focus:outline-none"
                  value={storeState.inStock}
                  onChange={(e) =>
                    dispatch(setInStock(e.target.value === "true"))
                  }
                >
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </div>

              <div className="flex flex-col">
                <label htmlFor="recentWork">Recent work?</label>
                <select
                  name="recentWork"
                  id="recentWork"
                  required
                  className="border-[1px] border-black focus:outline-none"
                  value={storeState.recentWork}
                  onChange={(e) =>
                    dispatch(setRecentWork(e.target.value === "true"))
                  }
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
                value={storeState.title}
                onChange={(e) => dispatch(setTitle(e.target.value))}
              />

              <input
                type="text"
                placeholder="Short description"
                name="shortDesc"
                autoComplete="off"
                className="w-3/4 md:w-1/2 text-center border-b-[1px] border-b-transperent hover:border-b-black focus:outline-none"
                value={storeState.shortDesc}
                onChange={(e) => dispatch(setShortDesc(e.target.value))}
              />

              <div className="flex flex-col">
                <label
                  className="text-center mb-[10px] hover:cursor-pointer hover:text-slate-600 border-b-[1px] border-b-black"
                  htmlFor="imgSrcHref"
                >
                  Select image
                </label>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  name="media"
                  autoComplete="off"
                  id="imgSrcHref"
                  className="hidden"
                  onChange={(e) => dispatch(setMedia(e.target.files[0]))}
                />
              </div>
              <p
                className={`${
                  storeState.media === "" ? "text-red-500" : "text-black"
                }`}
              >
                {storeState.media === ""
                  ? "Not image selected yet."
                  : `Image selected succesfully: ${storeState.media.name}`}
              </p>

              <input
                type="number"
                placeholder="Price"
                name="cost"
                autoComplete="off"
                className="w-3/4 md:w-1/3 text-center focus:outline-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-moz-appearance]:textfield border-b-[1px] border-b-transperent hover:border-b-black "
                value={storeState.cost === 0 ? "" : storeState.cost}
                onChange={(e) => dispatch(setCost(Number(e.target.value)))}
              />

              <input
                type="number"
                placeholder="Natiowide delivery cost"
                name="nationwideDelivery"
                autoComplete="off"
                className="w-3/4 md:w-1/3 text-center focus:outline-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-moz-appearance]:textfield border-b-[1px] border-b-transperent hover:border-b-black "
                value={
                  storeState.nationwideDelivery === 0
                    ? ""
                    : storeState.nationwideDelivery
                }
                onChange={(e) =>
                  dispatch(setNationwideDelivery(Number(e.target.value)))
                }
              />

              <input
                type="number"
                placeholder="International delivery cost"
                name="internationalDelivery"
                autoComplete="off"
                className="w-3/4 md:w-1/3 text-center focus:outline-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-moz-appearance]:textfield border-b-[1px] border-b-transperent hover:border-b-black "
                value={
                  storeState.internationalDelivery === 0
                    ? ""
                    : storeState.internationalDelivery
                }
                onChange={(e) =>
                  dispatch(setInternationalDelivery(Number(e.target.value)))
                }
              />

              <div className="flex flex-col">
                {/* add product button */}
                <button
                  className="hover:text-slate-600 mb-[15px]"
                  onClick={addPost}
                >
                  Add product
                </button>

                {/* cancel add product button */}
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

      {/* see orders section*/}
      {logic.showViewOrders ? (
        <div className="w-full  mt-5">
          <div className="h-auto">
            {storeState.orders.length === 0 ? (
              <div className="h-[500px] flex justify-center text-3xl">
                <p>There are no orders</p>
              </div>
            ) : (
              <div className="flex flex-col justify-center items-center">
                {[...storeState.orders].reverse().map((order) => (
                  //  ID & date
                  <div className="w-7/8 border-[1px] border-black m-8 p-5 md:w-2/3 rounded-xl shadow-2xl">
                    <div className="flex flex-col md:flex-row md:justify-between">
                      <p className="text-center font-semibold">{`Order ID: ${order._id}`}</p>
                      <p className="text-center">{`Date: ${order.createdAt.slice(
                        0,
                        10
                      )}`}</p>
                    </div>

                    <div className="text-center mt-[10px] text-lg">
                      <p className="mb-[10px] mt-7">Items purchased:</p>
                    </div>

                    {/* products */}
                    {order.productsInfoAtTimeOfPurchase.map((product) => (
                      <div className="my-5 flex flex-col items-center md:flex-row justify-between px-5 border-b border-black ">
                        <img
                          className="w-[100px] mb-5 rounded shadow"
                          src={product.imgUrl}
                          alt="productImage"
                        />

                        <div>
                          <p className=" text-center text-sm font-bold">{`"${product.title}"`}</p>
                          <p className=" text-center text-sm">{`${product.shortDesc}`}</p>
                          <p className=" text-center text-sm">{`${product.cost}`}</p>
                          <p className=" text-center text-sm">{`${product.deliveryCost}`}</p>
                          <p className=" text-center text-sm">{`${product.totalAmountPaid}`}</p>
                        </div>
                      </div>
                    ))}

                    <div className="text-center text-xl mt-5">
                      Customer's info:
                    </div>

                    <div className="p-2 w-full md:full mt-[25px]">
                      {/* client's info */}
                      <div className="p-3 border-[1px] border-black rounded-md  ">
                        <div className="lg:flex justify-between mb-2 text-sm">
                          <p>
                            {`Full name: ${order.custInfoAtTimeOfPurchase.name} ${order.custInfoAtTimeOfPurchase.lastname}`}{" "}
                            <span>
                              {order.user && order.user.isActive
                                ? "(Active)"
                                : "(Inactive)"}
                            </span>
                            <span>{!order.user ? "(Acc deleted)" : ""}</span>
                          </p>
                          <p>Email: {order.custInfoAtTimeOfPurchase.email} </p>
                        </div>
                      </div>

                      {/* Contact info */}
                      <div className="p-2 mt-3 border-[1px] border-black rounded-md text-sm">
                        <div className="mb-2">
                          <p className="text-center">
                            Contact info at the time of purchase:
                          </p>
                        </div>
                        <div>
                          <p className="text-center">
                            {order.contactInfoAtTimeOfPurchase}
                          </p>
                        </div>
                      </div>

                      {/* Shipping info */}
                      <div className="p-2 mt-3 border-[1px] border-black rounded-md text-sm">
                        <div className="mb-2">
                          <p className="text-center ">
                            Shipping info at the time of purchase:
                          </p>
                        </div>
                        <div>
                          <p className="text-center">
                            {order.shippingInfoAtTimeOfPurchase}
                          </p>
                        </div>
                      </div>
                      <div className="mt-5 text-center flex flex-col items-center md:flex-row md:justify-between">
                        {/* Amount paid info */}
                        <div className="mb-5">{`Amount paid: ${"000.00 CAD"}`}</div>

                        {/* status button */}
                        <div>
                          <select
                            value={order.status}
                            onChange={(e) =>
                              handleStatusChange(order._id, e.target.value)
                            }
                            className="focus:outline-none focus:ring-0 block p-2.5"
                          >
                            <option value="Processing">Processing</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      ) : null}

      {/* see users info section */}
      {logic.showMembersInfo ? (
        <div className="w-full mt-10">
          <div className="h-auto">
            {storeState.users.length === 0 ? (
              <div className="h-[500px] flex items-center justify-center text-3xl">
                <p>There aren't any members yet</p>
              </div>
            ) : (
              <div>
                {storeState.users.map((user) => (
                  <div
                    key={user._id}
                    className="p-[25px] my-[70px] border-[3px] border-black m-2 rounded-xl flex flex-col py-10 shadow-2xl"
                  >
                    <p
                      className={`text-center mb-[25px] border-[1px] border-black rounded-xl text-xl p-4 text-pretty`}
                    >
                      {`${user.name} ${user.lastname}

                         ${
                           user.isActive
                             ? "(active member)"
                             : "(inactive member)"
                         }`}
                    </p>
                    <div className="border-[1px] border-black rounded-xl p-5 flex flex-col items-center justify-center">
                      <p>
                        Email: <span className="underline"> {user.email}</span>
                      </p>
                    </div>
                    <div className=" flex flex-col md:flex-row md:justify-evenly">
                      <div className="border-[1px] border-black rounded-lg my-5 p-5 text-left">
                        <div>
                          <p className="mb-2 underline">
                            Current contact info:
                          </p>
                        </div>
                        <div>
                          <p>Phone number: {user.contactPhoneNumber}</p>
                          <p>Address: {`${user.contactAddress}`}</p>
                          <p>Unit: {`${user.contactUnit}`}</p>
                          <p>Country: {`${user.contactCountry}`}</p>
                          <p>
                            Province or State:{" "}
                            {`${user.contactProvinceOrState}`}
                          </p>
                          <p>City: {`${user.contactCity}`}</p>
                          <p>Postal Code: {`${user.contactPostalCode}`}</p>
                        </div>
                      </div>

                      {user.shippingSameAsContactInfo ? (
                        <p className="border-[1px] border-black rounded-lg my-5 p-5 flex items-center justify-center">
                          Shipping info is the same as contact info
                        </p>
                      ) : (
                        <div className="border-[1px] border-black rounded-lg my-5 p-5 text-left">
                          <div>
                            <p className="mb-2 underline">
                              Current shipping info
                            </p>
                          </div>
                          <div>
                            <p>Phone number: {user.shippingPhoneNumber}</p>
                            <p>Address: {`${user.shippingAddress}`}</p>
                            <p>Unit: {`${user.shippingUnit}`}</p>
                            <p>Country: {`${user.shippingCountry}`}</p>
                            <p>
                              Province or State:{" "}
                              {`${user.shippingProvinceOrState}`}
                            </p>
                            <p>City: {`${user.shippingCity}`}</p>
                            <p>Postal Code: {`${user.shippingPostalCode}`}</p>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="rounded-lg my-5 p-10 text-center">
                      <p className="text-xl">orders:</p>
                      {user.orders.length > 0 ? (
                        user.orders.map((order) => (
                          <div className="border-[1px] border-black rounded-lg my-10 flex flex-col items-center h-[500px] overflow-hidden overflow-y-scroll shadow-2xl">
                            <p className="pt-5 underline">{`Date of purcharse: ${order.createdAt.slice(
                              0,
                              10
                            )}`}</p>
                            <p className="text-sm">Order ID: {order._id}</p>
                            <p className="text-sm">
                              Total items: {order.products.length}
                            </p>
                            <p className="text-sm">Status: {order.status}</p>
                            <p className="text-sm">
                              Shipped to: {order.shippingInfoAtTimeOfPurchase}
                            </p>
                            <p className="text-sm">
                              Contact info: {order.contactInfoAtTimeOfPurchase}
                            </p>
                            <p className="text-sm">
                              Total amount paid: 123 CAD
                            </p>
                            <br />
                            <p className="underline">Items:</p>

                            {order.productsInfoAtTimeOfPurchase.map(
                              (product) => (
                                <div className="flex flex-col items-center md:flex-row justify-between lg:justify-around p-5 w-[90%] border-b border-black m-5">
                                  <img
                                    src={product.imgUrl}
                                    alt="productImg"
                                    className="w-[125px] my-5 rounded shadow"
                                  />

                                  <div>
                                    <p className="text-sm py-1">{`"${product.title}"`}</p>
                                    <p className="text-sm py-1">{`${product.shortDesc}`}</p>
                                    <p className="text-sm py-1">{`Cost: ${product.cost}`}</p>
                                    <p className="text-sm py-1">{`Delivery cost: ${product.deliveryCost}`}</p>
                                    <p className="text-sm py-1">{`Total (Including taxes): ${product.deliveryCost}`}</p>
                                  </div>
                                </div>
                              )
                            )}
                          </div>
                        ))
                      ) : (
                        <p>there aren't any orders</p>
                      )}
                    </div>
                    {/* delete profile */}
                    <div className=" mt-5 flex justify-center">
                      <button
                        className="hover:text-red-600 text-xl underline"
                        onClick={() => handleDeleteAcc(user._id)}
                      >
                        Delete account
                      </button>
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
