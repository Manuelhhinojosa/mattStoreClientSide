import React from "react";

//React Router 6
import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <section className="relative  w-screen">
      <div className="mt-[125px] mb-[25px] text-3xl text-center">
        <p>Sign up</p>
      </div>
      <div>
        <form action="" className="flex flex-col items-center">
          <div className="border-[1px] border-black w-[90%] rounded-lg my-[25px]">
            {/* name and lastname */}
            <div className="flex flex-col items-center md:flex-row md:justify-evenly">
              <input
                className="my-2 w-2/3 md:w-1/3 text-center border-b-[1px] border-b-transparent hover:border-b-black focus:outline-none"
                type="text"
                placeholder="name"
                name="name"
                autocomplete="off"
              />
              <input
                className="my-2 w-2/3 md:w-1/3 text-center border-b-[1px] border-b-transparent hover:border-b-black focus:outline-none"
                type="text"
                placeholder="lastname"
                name="lastname"
                autocomplete="off"
              />
            </div>

            {/* email  */}
            <div className="flex flex-col items-center md:flex-row md:justify-evenly ">
              <input
                className="my-2 w-2/3 md:w-1/3 text-center border-b-[1px] border-b-transparent hover:border-b-black focus:outline-none"
                type="text"
                placeholder="e-mail"
                name="email"
                autocomplete="off"
              />
              <input
                className="my-2 w-2/3 md:w-1/3 text-center border-b-[1px] border-b-transparent hover:border-b-black focus:outline-none"
                type="text"
                placeholder="confirm email"
                name="email"
                autocomplete="off"
              />
            </div>

            {/* Password */}
            <div className="flex flex-col items-center md:flex-row md:justify-evenly">
              <input
                className="my-2 w-2/3 md:w-1/3 text-center border-b-[1px] border-b-transparent hover:border-b-black focus:outline-none"
                type="password"
                placeholder="password"
                name="password"
                autocomplete="off"
              />
              <input
                className="my-2 w-2/3 md:w-1/3 text-center border-b-[1px] border-b-transparent hover:border-b-black focus:outline-none"
                type="password"
                placeholder="confirm password"
                name="password"
                autocomplete="off"
              />
            </div>
          </div>

          {/* contact info */}
          <div className="border-[1px] border-black w-[90%] rounded-lg my-[25px]">
            <div className="flex items-center justify-center">
              <p className="text-xl">Contact info (optional)</p>
            </div>
            {/* contact phone number */}
            <div className="flex items-center justify-center">
              <input
                className="my-2 w-2/3 md:w-1/3 text-center border-b-[1px] border-b-transparent hover:border-b-black focus:outline-none"
                type="text"
                placeholder="contact phone number"
                name="contactPhoneNumber"
                autocomplete="off"
              />
            </div>

            {/* contact address and unit */}
            <div className="flex flex-col items-center md:flex-row md:justify-evenly">
              <input
                className="my-2 w-2/3 md:w-1/3 text-center border-b-[1px] border-b-transparent hover:border-b-black focus:outline-none"
                type="text"
                placeholder="address"
                name="address"
                autocomplete="off"
              />

              <input
                className="my-2 w-2/3 md:w-1/3 text-center border-b-[1px] border-b-transparent hover:border-b-black focus:outline-none"
                type="text"
                placeholder="unit"
                name="addressUnit"
                autocomplete="off"
              />
            </div>

            {/* contact country, provice or state, city, postal code */}
            <div className="flex flex-col items-center md:flex-row md:justify-evenly">
              <input
                className="my-2 w-2/3 md:w-[150px] text-center border-b-[1px] border-b-transparent hover:border-b-black focus:outline-none"
                type="text"
                placeholder="country"
                name="country"
                autocomplete="off"
              />

              <input
                className="my-2 w-2/3 md:w-[150px] text-center border-b-[1px] border-b-transparent hover:border-b-black focus:outline-none"
                type="text"
                placeholder="province or state"
                name="proviceOrState"
                autocomplete="off"
              />

              <input
                className="my-2 w-2/3 md:w-[150px] text-center border-b-[1px] border-b-transparent hover:border-b-black focus:outline-none"
                type="text"
                placeholder="city"
                name="city"
                autocomplete="off"
              />

              <input
                className="my-2 w-2/3 md:w-[150px] text-center border-b-[1px] border-b-transparent hover:border-b-black focus:outline-none"
                type="text"
                placeholder="postal code"
                name="postalCode"
                autocomplete="off"
              />
            </div>
          </div>

          {/* shipping info */}
          <div className="border-[1px] border-black w-[90%] rounded-lg my-[25px]">
            <div className="flex items-center justify-center">
              <p className="text-xl">Shipping info (optional)</p>
            </div>
            {/* shipping phone number */}
            <div className="my-[20px] flex justify-evenly md:flex-col md:items-center md:h-[50px]">
              <label htmlFor="contactSameShipping">same as contact info</label>
              <input
                id="contactSameShipping"
                type="checkbox"
                name="contactEqualShipping"
                className="accent-black w-5 h-5 rounded focus:outline-none"
              />
            </div>
            <div className="flex items-center justify-center">
              <input
                className="my-2 w-2/3 md:w-1/3 text-center border-b-[1px] border-b-transparent hover:border-b-black focus:outline-none"
                type="text"
                placeholder="shipping phone number"
                name="shippingtPhoneNumber"
                autocomplete="off"
              />
            </div>

            {/* ahipping address and unit */}
            <div className="flex flex-col items-center md:flex-row md:justify-evenly">
              <input
                className="my-2 w-2/3 md:w-1/3 text-center border-b-[1px] border-b-transparent hover:border-b-black focus:outline-none"
                type="text"
                placeholder="shipping address"
                name="shippingAddress"
                autocomplete="off"
              />

              <input
                className="my-2 w-2/3 md:w-1/3 text-center border-b-[1px] border-b-transparent hover:border-b-black focus:outline-none"
                type="text"
                placeholder="shipping unit"
                name="shippingAddressUnit"
                autocomplete="off"
              />
            </div>

            {/* contact country, provice or state, city, postal code */}
            <div className="flex flex-col items-center md:flex-row md:justify-evenly">
              <input
                className="my-2 w-2/3 md:w-[150px] text-center border-b-[1px] border-b-transparent hover:border-b-black focus:outline-none"
                type="text"
                placeholder="shipping country"
                name="shippingCountry"
                autocomplete="off"
              />

              <input
                className="my-2 w-2/3 md:w-[150px] text-center border-b-[1px] border-b-transparent hover:border-b-black focus:outline-none"
                type="text"
                placeholder="shipping province or state"
                name="shippingProviceOrState"
                autocomplete="off"
              />

              <input
                className="my-2 w-2/3 md:w-[150px] text-center border-b-[1px] border-b-transparent hover:border-b-black focus:outline-none"
                type="text"
                placeholder="shipping city"
                name="shippingCity"
                autocomplete="off"
              />

              <input
                className="my-2 w-2/3 md:w-[150px] text-center border-b-[1px] border-b-transparent hover:border-b-black focus:outline-none"
                type="text"
                placeholder="shipping postal code"
                name="shippingPostalCode"
                autocomplete="off"
              />
            </div>
          </div>

          <button className="text-lg hover:text-slate-600">sign up</button>
        </form>
      </div>
      <div className="flex items-center justify-center my-8 hover:text-slate-600">
        <Link to="/store">Cancel</Link>
      </div>
    </section>
  );
};

export default Signup;
