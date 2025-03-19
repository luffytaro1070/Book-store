import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Loader from '../components/Loader/Loader';
import { MdDelete } from "react-icons/md";
const Cart = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState();
  const [total, setTotal] = useState();
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  }
  const deleteItem = async (id) => {
    const res = await axios.put(`http://localhost:1000/api/v1/remove-from-cart/${id}`, {}, { headers });
    alert(res.data.message);
  }
  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get("http://localhost:1000/api/v1/get-user-cart", { headers });
      setCart(response.data.data)
    }
    fetch()
  }, [cart])
  useEffect(() => {
    if (cart && cart.length > 0) {
      let total = cart.reduce((acc, item) => acc + item.price, 0);
      setTotal(total);
    }
  }, [cart]);
  const placeOrder = async () => {
    try {
      const res = await axios.post("http://localhost:1000/api/v1/place-order", { order: cart }, { headers })
      alert(res.data.message);
      navigate("/profile/orderHistory");
    } catch (error) {
      console.log(err);
    }
  }
  return (
    <div className='bg-zinc-900 px-12 h-screen'>
      {!cart && <div className='h-screen flex items-center justify-center bg-zinc-900'><Loader /></div>}
      {cart && cart.length === 0 && (
        <div className="h-screen ">
          <div className='h-[100%] flex items-center justify-center flex-col'>
            <h1 className='text-5xl lg:text-6xl font-semibold text-yellow-100'>
              empty cart
            </h1>
          </div>
        </div>
      )}
      {cart && cart.length > 0 && (
        <>
          <h1 className='text-5xl font-semibold text-zinc-500 mb-8'>
            Your Cart
          </h1>
          {cart.map((items, i) => (
            <div className='w-full my-4 rounded flex flex-col md:flex-row p-4 bg-zinc-800 justify-between items-center ' key={i}>
              <img src={items.url}
                className='h-[20vh] md:h-[10vh] object-cover'>
              </img>
              <div className="w-full md:w-auto">
                <h1 className='text-2xl font-semibold text-start mt-2 md:mt-0 text-zinc-100'>
                  {items.title}
                </h1>
                <p className='text-normal text-zinc-300 mt-2 hidden lg:block'>
                  {items.desc.slice(0, 100)}...
                </p>
                <p className='text-normal text-zinc-300 mt-2 hidden md:block lg:hidden'>
                  {items.desc.slice(0, 65)}...
                </p>
                {/* <p className='text-normal text-zinc-300 mt-2 hidden lg:block'>
                  {items.desc.slice(0,100)}...
                  </p> */}
              </div>
              <div className="w-full md:w-auto flex mt-4 justify-between items-center">
                <h2 className='text-zinc-100 text-3xl font-semibold flex'>
                ₹{items.price}
                </h2>
                <button className='text-2xl text-red-500 bg-white rounded p-2 ms-12'
                onClick={()=> deleteItem(items._id)}>
                <MdDelete />
                </button>
              </div>
            </div>
          ))}
        </>
      )}
      {cart && cart.length>0 &&(
        <div className='mt-4 w-full flex items-center justify-end'>
          <div className='p-4 bg-zinc-800 rounded'>
            <h1 className='text-3xl text-zinc-200 font-semibold'>
              Total Amount
            </h1>
            <div className='mt-3 flex items-center justify-between text-xl text-zinc-200'>
              <h2>{cart.length} books</h2>
              <h2>
                ₹{total}
              </h2>
            </div>
            <div className='w-[100%] mt-3'>
              <button className='bg-zinc-100 rounded px-4 py-2 flex justify-center w-full font-semibold
               hover:bg-zinc-300' 
               onClick={placeOrder}>
                Place your order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Cart