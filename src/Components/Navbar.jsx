import React from 'react'

const Navbar = () => {
  return (
    <div className='w-full bg-purple-400 h-14 flex items-center justify-center px-4'>
      <div className="logo text-lg md:text-2xl font-semibold text-center cursor-pointer hover:font-bold transition-all text-white">
        UTodo - Your Todo Planner
      </div>
    </div>
  )
}

export default Navbar
