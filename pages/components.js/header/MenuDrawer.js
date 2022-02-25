import React, { useEffect, useState } from 'react'
import Drawer from '@mui/material/Drawer';
import { AiOutlineClose } from 'react-icons/ai';

import SearchInput from './SearchInput';

export default function MenuDrawer({toggle, returnValue}) {
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
        width:{xs:'290px',sm:'330px'}},
        position:'relative'}
    }
    anchor={'right'}
    open={state}
    onClose={toggleDrawer( false)}

    >
        <div className=' hover:rotate-90 duration-[400ms] cursor-pointer absolute top-[35px] right-[25px] flex justify-end'
        onClick={toggleDrawer( false)}
        >
            <AiOutlineClose
            className='hover:fill-red-500 h-8'
            />
        </div >
    <div className='w-10/12 flex flex-col items-center gap-y-[30px] mx-auto mt-[80px]'>
        <SearchInput />
        <hr className='h-[2px] w-full bg-[#ffffff]' />
          {/* linksto pages */}

          {/* contact */}
    </div>
   


    {/* {list(anchor)} */}
</Drawer>
  )
}
