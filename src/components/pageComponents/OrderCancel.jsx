import React from "react";

const OrderCancel = () => {
  return (
    <section className="cancel-page">
      <h1>Payment Cancelled</h1>
      <p>Your payment was not completed.</p>

      <a href="/cart" className="btn">
        Return to Cart
      </a>
    </section>
  );
};

export default OrderCancel;
