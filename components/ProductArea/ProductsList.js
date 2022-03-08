import React from 'react'

export default function ProductsList({ index, products }) {
  return (
    <div className="lg:py-8 py-20 flex flex-col ">
      {products?.map((product) => (
        <div className='' key={product.props.title}>{product}</div>
      ))}
    </div>
  )
}
