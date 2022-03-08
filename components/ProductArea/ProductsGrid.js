import React from "react";
import Link from "next/link";

export default function ProductsGrid({ index, products }) {
  return (
    <div className=" py-20 flex flex-col sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-12">
      {products?.map((product) => (
        <div key={product.props.title}>{product}</div>
      ))}
    </div>
  );
}
