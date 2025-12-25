import React from "react";

const OrderCancel = () => {
  return (
    <section className="relative flex flex-col h-screen w-screen items-center justify-center">
      <h1>Payment Cancelled</h1>
      <p>Your payment was not completed.</p>

      <a href="/cart" className="btn">
        Return to Cart
      </a>
    </section>
  );
};

export default OrderCancel;
