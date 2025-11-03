import React from "react";

// redux
import { useSelector, useDispatch } from "react-redux";

// react hooks
import { useRef } from "react";

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
// logic
import {
  setShowAllProducts,
  setShowAddProduct,
  setShowViewOrders,
  setShowMembersInfo,
} from "../../redux/slices/staticState/logicSlice";

// handle store state (product)
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

// fetching products function
import { fetchArtPieces } from "../../redux/slices/state/storeSlice";

// compoonent function
const Admin = () => {
  // redux || state || reducers
  const dispatch = useDispatch();
  const logic = useSelector((state) => state.logicSlice);
  const storeState = useSelector((state) => state.storeSlice);

  // react hooks
  // useRef for image field (to clear field after submission)
  const fileInputRef = useRef(null);

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
  const addPost = (e) => {
    e.preventDefault();
    // form error handling
    const {
      title,
      shortDesc,
      media,
      cost,
      nationwideDelivery,
      internationalDelivery,
    } = storeState;

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
    // const createPostUrl = process.env.REACT_APP_CREATE_POST_URL;

    // // API call
    axios
      .post(createPostUrl, formData)
      .then((result) => {
        console.log("Result: ", result);
        console.log("SUCCESS! Post added. Result:", {
          config: result.config,
          data: result.data,
          status: result.status,
          headers: result.headers,
        });

        // re-setting products array in sotreState slice
        dispatch(fetchArtPieces());

        // Reseting to initial values so app can add another post
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

        // directs admin user to all products admin page
        dispatch(setShowAllProducts());

        // confirmation message
        toast("Product added", toastStyleObject());
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // handle delete Product
  const handleDeleteProduct = (id) => {
    const deletePostUrl = "http://localhost:3000/posts";
    // const deletePostUrl = process.env.REACT_APP_DELETE_POST_URL;

    axios
      .delete(`http://localhost:3000/posts/${id}`)
      .then((result) => {
        console.log(result);
        toast("Product deleted", toastStyleObject());

        dispatch(fetchArtPieces());
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleStatusChange = (id, newStatus) => {
    alert(id);
    alert(newStatus);
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
          {[...storeState.artPieces].reverse().map((p) => (
            <div
              key={p._id}
              className="mx-2 py-5 my-[25px] flex flex-col items-center border-[1px] border-black rounded-xl"
            >
              <img
                src={p.media.url}
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
                <Link to={`/editproduct/${p._id}`}>Edit product</Link>
              </div>
              <div
                className="text-red-900 hover:cursor-pointer mt-2"
                onClick={() => handleDeleteProduct(p._id)}
              >
                Delete product
              </div>
            </div>
          ))}
        </div>
      ) : null}

      {/* add a product */}

      {logic.showAddProduct ? (
        <div className="h-[600px] w-full">
          <div className="h-[100px] flex justify-center items-center text-3xl">
            <p className="border-b-[1px] border-b-black">Add a product</p>
          </div>
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

      {/* see users info */}
      {logic.showMembersInfo ? (
        <div className="w-full mt-10">
          <div className="h-[100px] flex justify-center items-center text-3xl ">
            <p className="border-b-[1px] border-b-black">Members info</p>
          </div>
          <div className="h-auto">
            {users.length === 0 ? (
              <div className="h-[500px] flex items-center justify-center text-3xl">
                <p>There aren't any members yet</p>
              </div>
            ) : (
              <div>
                {users.map((user) => (
                  <div className="p-[25px] my-[50px] border-[3px] border-black m-2 rounded-xl flex flex-col py-10">
                    <p
                      className={`text-center mb-[25px] border-[1px] border-black rounded-xl text-3xl p-4 text-pretty ${
                        user.isActive ? "text-green-500" : "text-red-400"
                      }`}
                    >
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
                          Phone number: {user.contactPhoneNumber}
                        </p>
                      ) : (
                        ""
                      )}
                    </div>
                    {user.address ? (
                      <p className="border-[1px] border-black rounded-lg my-5 p-5 text-center">
                        Contact info:{" "}
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
                        Shipping info is the same as contact info
                      </p>
                    ) : user.shippingPhoneNumber ? (
                      <div className="border-[1px] border-black rounded-lg my-5 p-5 text-center">
                        <p className="">
                          Shipping phone number: {user.shippingPhoneNumber}
                        </p>

                        <p className="mt-5">
                          Shipping info:{" "}
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
                      <p className="text-xl">orders:</p>
                      {user.orders.length > 0 ? (
                        user.orders.map((order) => (
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
                        <p>there aren't any orders</p>
                      )}
                    </div>

                    {/* delete profile */}

                    <div className=" mt-5 flex justify-center">
                      <button className="text-red-600 text-2xl">
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
