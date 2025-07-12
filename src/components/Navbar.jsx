import { Link } from 'react-router-dom'
import React from 'react'
import { LayoutTemplate } from 'lucide-react'
import { ProfileInfoCard } from './Cards'

const Navbar = () => {
  return (
    <div className='h-16  backdrop-blur-xl  py-2.5 px-4 md:px-0 sticky top-0 z-50'>
        <div className='max-w-6xl mx-auto flex items-center justify-between gap-5'>
            <Link to='/' className='flex items-center gap-3'>
                <div className='flex items-center pb-6 gap-0'>
                    <div >
                       <img src="/Logo3.png" alt="Logo" className="w-12 h-12 block md:hidden" />
                    </div>
                    <span className='text-xl sm:text-2xl font-black bg-white bg-clip-text text-transparent'>
                        Portofy
                    </span>
                </div>
            </Link>
            <ProfileInfoCard />
        </div>
      
    </div>
  )
}

export default Navbar
