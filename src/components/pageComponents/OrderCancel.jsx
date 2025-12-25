import React from "react";

// framer motion
import { motion } from "framer-motion";

//React Router v6
// react router hooks
import { Link } from "react-router-dom";

const OrderCancel = () => {
  return (
    <motion.section
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 2, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.2 }}
      className="relative flex flex-col h-screen w-screen items-center justify-center"
    >
      <div className="p-10 flex flex-col items-center justiy-center shadow-2xl rounded-2xl">
        <h1 className="text-2xl font-bold">Payment Cancelled</h1>
        <br />
        <p>Your payment was not completed.</p>
        <br />
        <Link
          className="underline hover:text-blue-500 duration-300"
          to={"/cart"}
        >
          return to your shopping cart
        </Link>
      </div>
    </motion.section>
  );
};

export default OrderCancel;
