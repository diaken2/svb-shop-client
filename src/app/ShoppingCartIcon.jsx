import React from "react";

const ShoppingCartIcon = ({ className, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="#2563eb"
    strokeWidth="2"
    aria-label="Корзина"
    {...props}
  >
    <circle cx="9" cy="21" r="1.5" />
    <circle cx="19" cy="21" r="1.5" />
    <path d="M2 3h2l.4 2M7 13h10l4-8H5.4" />
  </svg>
);

export default ShoppingCartIcon;
