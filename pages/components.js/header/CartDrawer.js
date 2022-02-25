import React, { useEffect, useState } from 'react'
import Drawer from '@mui/material/Drawer';
import { AiOutlineClose } from 'react-icons/ai';
import Link from 'next/link';

export default function CartDrawer({toggle, returnValue}) {
    const [state, setState] = useState( false);
    const toggleDrawer = ( open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {return;}
        setState( open );
      }
      useEffect(()=>{returnValue(state)},[state])
      useEffect(()=>{setState( toggle )},[toggle])
  return (
    <Drawer
    transitionDuration={350}
    sx={{'& .MuiDrawer-paper':{
        width:'85%'},
        position:'relative'}
    }
    anchor={'right'}
    open={state}
    onClose={toggleDrawer( false)}
    >
        <div className='hover:rotate-90 duration-[400ms] cursor-pointer absolute top-[35px] right-[25px] flex justify-end'
        onClick={toggleDrawer( false)}
        ><AiOutlineClose
        className='hover:fill-red-500 h-8'
        />
        </div >
        <div className=' mt-[60px] mx-[15px]'>
            <h2 className='text-xl font-bold mb-[35px] '>Shopping Cart</h2>
            <div className='flex justify-between'>
                <div className='font-bold text-lg'>Subtotal:</div>
                <div className='font-medium	'>$170.00</div>
            </div>
        <div className='w-[250px] flex flex-col gap-y-[10px] mt-6'>
            <button
            className='h-[50px] w-full bg-black hover:bg-red-500 duration-[400ms] text-white font-medium  '
            >
                View Cart
            </button>
            <Link href={'/Checkout'}>
                <button 
                className='h-[50px] w-full bg-black hover:bg-red-500 duration-[400ms] text-white font-medium '>
                Chekcout
            </button>
            </Link>
        </div>
        </div>
    {/* {list(anchor)} */}
</Drawer>
  )
}
