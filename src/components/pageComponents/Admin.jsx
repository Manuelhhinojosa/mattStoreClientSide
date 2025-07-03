import React from "react";

// redux
import { useSelector, useDispatch } from "react-redux";

// React router V6
import { Link } from "react-router-dom";

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

const Admin = () => {
  // redux || state || reducers
  const dispatch = useDispatch();
  const logic = useSelector((state) => state.logicSlice);
  const storeState = useSelector((state) => state.storeSlice);
  // for dev (to build front end of users info page)
  const users = [];
  users.push(
    logic.adminUser,
    logic.nonAdminUser,
    logic.nonAdminUser2,
    logic.nonAdminUser3
  );

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
              <div className="text-green-900 mt-[25px] hover:cursor-pointer">
                <Link to={`/editproduct/${p.id}`}>Edit product</Link>
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
            <p className="border-b-[1px] border-b-black">Add a product</p>
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
            <p className="border-b-[1px] border-b-black">Orders</p>
          </div>
          <div className="h-auto">
            {storeState.orders.length === 0 ? (
              <div className="h-[500px] flex items-center justify-center text-3xl">
                <p>There are no orders</p>
              </div>
            ) : (
              <div>
                {[...storeState.orders].reverse().map((order) => (
                  <div className="p-[25px] my-[25px]">
                    <p className="text-center text-xl mb-[25px]">
                      Order ID: {order.orderId}
                    </p>
                    <p className="mb-[5px]">
                      Order placed by: {order.fullName}
                    </p>

                    <p className="mb-[5px]">
                      Contact email address: {order.contactEmail}
                    </p>
                    <p className="mb-[5px]">
                      Contact phone number: {order.contactPhone}
                    </p>
                    <p className="mb-[5px]">{`Shiping Address: ${order.shippingAddress}. Unit ${order.shippingUnit}. ${order.shippingCountry}, ${order.shippingProviceState}, ${order.shippingCity}. ${order.shippingPostalCode}`}</p>
                    <p className="mb-[5px]">
                      Transaction date: {order.dateOfPurchase}
                    </p>
                    <p className="mb-[5px]">Piece ID: {order.pieceId}</p>
                    <p className="mb-[5px]">Piece title: {order.pieceTitle}</p>
                    <p className="mb-[5px]">
                      Amount paid: {order.pieceCost} CAD
                    </p>
                    <p className="text-center mt-[25px]">+++ +++ +++</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      ) : null}

      {/* see users info */}
      {logic.showMembersInfo ? (
        <div className="w-full">
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
                    <p className="text-center mb-[25px] border-[1px] border-black rounded-xl text-3xl p-4">
                      {`${user.name} ${user.lastname}`}
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
                    <div className="border-[1px] border-black rounded-lg my-5 p-5 text-center">
                      <p>Past orders:</p>
                      {user.pastOrders.length > 0 ? (
                        <p>there are past oders</p>
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
