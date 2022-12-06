import React from "react";

export default function ProductsList({ products }) {
  return (
    <div className="lg:py-8 py-20 flex flex-col ">
      {products?.map((product) => (
        <div key={product.props.title}>{product}</div>
      ))}
    </div>
  );
}
