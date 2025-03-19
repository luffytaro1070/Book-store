import axios from "axios";
import { Link } from "react-router-dom";

const BookCard = ({ data, favourites }) => {
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid: data._id,
  };

  const removebookfromfav = async () => {
    const response = await axios.put(
      "http://localhost:1000/api/v1/delete-book-from-fav",
      {},
      { headers }
    );
    alert(response.data.message);
  };

  return (
    <div className="flex flex-col items-center space-y-2">  
      <Link to={`/view-book-details/${data._id}`} className="block">
        <div className="bg-zinc-700 rounded-xl overflow-hidden shadow-lg w-44 sm:w-48 lg:w-56 transition-transform hover:scale-105 mx-auto">
          <div className="w-full h-60 bg-zinc-900 flex items-center justify-center">
            <img
              className="w-60 h-60 object-cover"
              src={data.url}
              alt={data.title || "Book Cover"}
            />
          </div>
          <div className="p-2">
            <h3 className="text-white text-sm font-semibold truncate">
              {data.title || "Unknown Title"}
            </h3>
            <p className="text-gray-300 text-xs truncate">
              {data.author || "Unknown Author"}
            </p>
            <p className="text-gray-300 text-center truncate text-2xl">
              $ {data.price}
            </p>
          </div>
        </div>
      </Link>
      {favourites && (
        <button
          className="bg-yellow-100 font-semibold px-4 py-2 rounded border border-yellow-500 text-yellow-500"
          onClick={removebookfromfav}
        >
          Remove from favourites
        </button>
      )}
    </div>
  );
};

export default BookCard;
