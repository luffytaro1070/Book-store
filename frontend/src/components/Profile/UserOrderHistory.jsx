import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../Loader/Loader';
import { Link } from 'react-router-dom';

const UserOrderHistory = () => {
  const [OrderHistory, setOrderHistory] = useState([]);

  const headers = {
    authorization: `Bearer ${localStorage.getItem('token')}`,
    id: localStorage.getItem('id'),
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get('http://localhost:1000/api/v1/get-order-history', { headers });
        setOrderHistory(res.data.data);
      } catch (error) {
        console.error('Error fetching order history:', error.response?.data || error.message);
      }
    };
    fetch();
  }, []);

  return (
    <div>
      {!OrderHistory && (
        <div className="h-screen flex items-center justify-center bg-zinc-900">
          <Loader />
        </div>
      )}

      {OrderHistory && OrderHistory.length === 0 && (
        <div className="h-[80vh] p-4 text-zinc-100">
          <div className="h-[100%] flex items-center justify-center flex-col">
            <h1 className="text-5xl mb-8 font-semibold text-yellow-100">No Orders</h1>
          </div>
        </div>
      )}

      {OrderHistory && OrderHistory.length > 0 && (
        <div className="h-[100%] p-0 md:p-4 text-zinc-100">
          {/* Hides the heading on smaller devices */}
          <div className="hidden sm:block">
            <h1 className="text-3xl md:text-5xl font-semibold text-zinc-500 mb-8">Your Order History</h1>
          </div>
        </div>
      )}

      <div className="mt-4 bg-zinc-800 w-full rounded py-2 px-4 flex gap-2">
        <div className="w-[3%]">
          <h1 className="text-center">Sr.</h1>
        </div>
        <div className="w-[22%]">
          <h1>Books</h1>
        </div>
        <div className="w-[45%]">
          <h1>Description</h1>
        </div>
        <div className="w-[9%]">
          <h1>Price</h1>
        </div>
        <div className="w-[16%]">
          <h1>Status</h1>
        </div>
        <div className="w-none md:w-[5%] hidden md:block">
          <h1>Mode</h1>
        </div>
      </div>

      {/* Order List */}
      {OrderHistory.map((items, i) => (
        <div key={i} className="bg-zinc-800 w-full rounded py-2 px-4 flex gap-4 hover:bg-zinc-900 hover:cursor-pointer">
          {/* Serial Number */}
          <div className="w-[3%]">
            <h1 className="text-center">{i + 1}</h1>
          </div>

          {/* Book Title */}
          <div className="w-[22%]">
            {items.book ? (
              <Link to={`/view-book-details/${items.book._id}`} className="hover:text-blue-300">
                {items.book.title}
              </Link>
            ) : (
              <span className="text-red-500">Book Deleted</span>
            )}
          </div>

          {/* Book Description */}
          <div className="w-[45%]">
            <h1>{items.book ? items.book.desc.slice(0, 50) + '...' : 'No Description Available'}</h1>
          </div>

          {/* Book Price */}
          <div className="w-[9%]">
            <h1>{items.book ? `₹ ${items.book.price}` : 'N/A'}</h1>
          </div>

          {/* Order Status */}
          <div className="w-[16%]">
            <h1 className="font-semibold text-green-500">
              {items.status === 'order placed' ? (
                <div className="text-yellow-500">{items.status}</div>
              ) : items.status === 'cancelled' ? (
                <div className="text-red-500">{items.status}</div>
              ) : (
                <div>{items.status}</div>
              )}
            </h1>
          </div>

          {/* Payment Mode */}
          <div className="w-none md:w-[5%] hidden md:block">
            <h1 className="text-sm text-zinc-400">COD</h1>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserOrderHistory;
