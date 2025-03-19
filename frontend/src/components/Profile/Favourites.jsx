import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BookCard from '../BookCard/BookCard';
import { FaBookOpen } from "react-icons/fa";
import { useSelector } from 'react-redux';
const Favourites = () => {
  const [favouriteBooks, setFavouriteBooks] = useState([]);
  // const role = useSelector((state) => state.auth.role);
  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get("http://localhost:1000/api/v1/get-fav-books", {
          headers: {
            id: localStorage.getItem("id"),
            authorization: `Bearer ${localStorage.getItem("token")}`
          }
        });
        setFavouriteBooks(response.data.data);
      } catch (error) {
        console.error("Error fetching favourite books:", error);
      }
    };
    fetch();
  }, [favouriteBooks]);

  return (
    <>
    {
     favouriteBooks &&favouriteBooks.length===0 && <div className='h-screen flex items-center justify-center  text-5xl lg:text-6xl font-semibold text-yellow-100 flex-col'>No books in favourite
     <br/>
     <div className='text-white'> <FaBookOpen /></div>
    
     </div>
    }
      <div className=' grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 p-1'>
        {favouriteBooks.length > 0 && (
          favouriteBooks.map((item, i) => (
            <div key={i}>
              <BookCard data={item} favourites={true} />
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default Favourites;
