import React from 'react'
import PASlider from './PASlider'

export default function ProductArea() {
  return (
    <div className='py-[115px] text-center overflow-visible'>
      <div className='mb-12'>
        <h2 className='text-[31px]'><span className='font-extrabold'>New </span> Arrivals</h2>
          <p className='text-[#9f99b3]'>
          We alway up to date new arrivals follows trending
        </p>
      </div>
      <PASlider/>

      </div>
  )
}
