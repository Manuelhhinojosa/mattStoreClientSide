import React from "react";

// framer motion
import { motion } from "framer-motion";

const OrderCancel = () => {
  return (
    <motion.section
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 2, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.2 }}
      className="relative flex flex-col h-screen w-screen items-center justify-center"
    >
      <h1>Payment Cancelled</h1>
      <p>Your payment was not completed.</p>

      <a href="/cart" className="btn">
        Return to Cart
      </a>
    </motion.section>
  );
};

export default OrderCancel;
