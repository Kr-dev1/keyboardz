'use client'
import React from 'react'
import Link from 'next/link'
import { buttonVariants } from './ui/button'
import { HandMetal } from 'lucide-react'

const Navbar = () => {
  return (
    <div className='bg-zinc-100 py-2 border-b border-s-zinc-200  w-full '>
      <div className='container mx-auto flex items-center justify-between px-4'>
        <Link href='/'>
          <HandMetal className='w-6 h-6 text-zinc-800' aria-label='Home' />
        </Link>
        <Link className={buttonVariants()} href='/sign-in' aria-label='Sign in'>Sign in</Link>
      </div>
    </div>
  )
}

export default Navbar
