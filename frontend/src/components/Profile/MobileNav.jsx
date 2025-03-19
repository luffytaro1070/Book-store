import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
// import { authActions } from '../../store/auth'
const MobileNav = () => {
    useDispatch();
    // const dispatch = useDispatch();
    
    const role=useSelector((state)=>state.auth.role);
    
  return (
     <div className='w-full  lg:hidden flex items-center justify-between my-3 '>
    {role==="user" && (
     <>  
      <Link 
         to="/profile"
         className='text-zinc-100 font-semibold w-full text-center hover:bg-zinc-900 rounded transition-all'>
            favourites
         </Link>
         <Link 
         to="/profile/orderHistory"
         className='text-zinc-100 font-semibold w-full  text-center hover:bg-zinc-900 rounded transition-all'>
             order history
         </Link>
         <Link 
         to="/profile/settings"
         className='text-zinc-100 font-semibold w-full  text-center hover:bg-zinc-900 rounded transition-all'>
             settings
         </Link>
         </>
    )}
     {role==="admin" && (
     <>  
      <Link 
         to="/profile"
         className='text-zinc-100 font-semibold w-full text-center hover:bg-zinc-900 rounded transition-all'>
            All orders
         </Link>
         <Link 
         to="/profile/addbook"
         className='text-zinc-100 font-semibold w-full  text-center hover:bg-zinc-900 rounded transition-all'>
             Add book
         </Link>
         
         </>
    )}
    </div>

  )
}

export default MobileNav