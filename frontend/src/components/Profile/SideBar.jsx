import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

const SideBar = ({ data }) => {
    // const dispatch = useDispatch();
    // const navigate = useNavigate();
    const role = useSelector((state) => state.auth.role);

    return (
        <div className='bg-zinc-700 w-fit p-4 rounded flex flex-col items-center justify-between h-[100%]'>
            <div className='flex flex-col items-center justify-center'>
                <img src={data.avatar} className='h-[10vh] w-[10vh] rounded-full' alt="User Avatar" />
                <p className='mt-3 text-xl text-zinc-100 font-semibold'>
                    {data.username}
                </p>
                <p className='mt-3 text-xl text-zinc-100 font-semibold'>
                    {data.email}
                </p>
            </div>

            <div className='w-full flex flex-col items-center justify-between my-20'>
                {role === "user" ? (
                    <>
                        <Link
                            to="/profile"
                            className='text-zinc-100 font-semibold w-full py-2 pl-4 text-left hover:bg-zinc-900 rounded transition-all text-2xl'>
                            Favourites
                        </Link>
                        <Link
                            to="/profile/orderHistory"
                            className='text-zinc-100 font-semibold w-full py-2 pl-4 text-left hover:bg-zinc-900 rounded transition-all text-2xl'>
                            Order History
                        </Link>
                        <Link
                            to="/profile/settings"
                            className='text-zinc-100 font-semibold w-full py-2 pl-4 text-left hover:bg-zinc-900 rounded transition-all text-2xl'>
                            Settings
                        </Link>
                    </>
                ) : role === "admin" ? (
                    <>
                        <Link
                            to="/profile/all-orders"
                            className='text-zinc-100 font-semibold w-full py-2 pl-4 text-left hover:bg-zinc-900 rounded transition-all text-2xl'>
                            All Orders
                        </Link>
                        <Link
                            to="/profile/addbook"
                            className='text-zinc-100 font-semibold w-full py-2 pl-4 text-left hover:bg-zinc-900 rounded transition-all text-2xl'>
                            Add Book
                        </Link>
                        <Link
                            to="/all-books"
                            className='text-zinc-100 font-semibold w-full py-2 pl-4 text-left hover:bg-zinc-900 rounded transition-all text-2xl'>
                            All Books
                        </Link>
                    </>
                ) : null}
            </div>
        </div>
    );
};

export default SideBar;
