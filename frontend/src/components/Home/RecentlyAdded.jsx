import React, { useEffect, useState } from "react";
import axios from "axios";
import BookCard from "../BookCard/BookCard";
import Loader from "../Loader/Loader";

const RecentlyAdded = () => {
  const [Data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:1000/api/v1/recently-added-books"
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
    <div className="h-fit flex flex-col items-center">
      <h4 className="text-4xl text-yellow-100 mt-8">Recently Added Books</h4>
        {!Data && (
            <div className="flex items-center justify-center my-8">
                <Loader/>{" "}
            </div>
        )}
      <div className="w-full px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Data.length > 0 ? (
            Data.map((item, i) => <BookCard key={i} data={item} />)
          ) : (
            <p className="text-white col-span-full text-center">
              No books available
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecentlyAdded;
