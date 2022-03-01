import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function Deal() {
  return (
      
    <div className='h-[430px] md:h-[530px] lg:h-[675px] xl:h-[780px] 2xl:h-[1000px] mb-[50px] relative bg-[#eef1f6] w-full'>
        <div className='absolute z-10 py-[60px] lg:py-[150px] h-full flex flex-col justify-between gap-y-3'>
            <h2 className='bg-[#6b7b90] w-fit text-white text-lg font-bold px-2 py-1 rounded-lg' >DEAL OF THE DAY</h2>
            <div>
                <div className='text-4xl md:text-6xl xl:text-8xl font-light tracking-wide'>
                    <span className='text-red-500 font-bold text-[2rem] md:text-6xl xl:text-8xl  tracking-normal'>50% OFF </span>
                     Basic
                    <div>Tee Flavor</div>
                </div>
                </div>
            <p className='text-[#66666b] w-[270px]'>Lorem ipsum dolor sit amet, consectetur adipis elit. Nunc imperdiet, nulla.</p>
            <div className='font-bold text-lg'>Expires in:</div>
            <p className='text-lg'>The countdown is finished!</p>
            <Link href='deal'><a className='font-bold md:text-2xl text-lg underline-offset-8 underline' href="deal">BUY NOW</a></Link>
           
        </div>
        <div className='relative h-full '>
        <img
            src={'/bg/bg-1.jpg'}
            // layout='fill'
            // objectFit='cover'
            className='absolute -right-[360px] sm:-right-[300px] 2xl:-right-[600px] h-full min-w-min'
        />
        </div>
    </div>
  )
}
