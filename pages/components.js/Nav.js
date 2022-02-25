import Link from 'next/link'
import React from 'react'

export default function Nav() {
  return (
      <div className=' justify-center gap-x-12 h-24 items-center lg:flex hidden'>
            <Link href={'/'}>
                <a>
                HOME  </a></Link>
            <Link href={'/products'}>
            <a>SHOP
            </a></Link>
            <Link href={'/contact'}>
                <a>
                CONTACT   </a></Link>

      </div>
  )
}
