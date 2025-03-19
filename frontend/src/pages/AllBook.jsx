import axios from "axios";
import React, { useEffect, useState } from "react";
import BookCard from "../components/BookCard/BookCard";


const AllBook = () => {
  const [Data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:1000/api/v1/get-all-books"
        );
        console.log(response.data.data);
        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-zinc-900">
      <main className="flex-grow px-4 py-8">
        <h4 className="text-3xl text-yellow-100"></h4>
        {!Data.length && (
          <div className="flex items-center justify-center my-8">
            <p className="text-white">Loading...</p>
          </div>
        )}
        <div className="w-full px-4 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10">
            {Data.length > 0 ? (
              Data.map((item, i) => <BookCard key={i} data={item} />)
            ) : (
              <p className="text-white col-span-full text-center">
                No books available
              </p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AllBook;
