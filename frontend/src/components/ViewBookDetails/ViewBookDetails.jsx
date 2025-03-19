import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loader from "../Loader/Loader";
import axios from "axios";
import { FaEdit, FaHeart, FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
const ViewBookDetails = () => {
    const { id } = useParams();
    const [Data, setData] = useState();
    const navigate = useNavigate();
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)
    const role = useSelector((state) => state.auth.role)
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:1000/api/v1/get-book-by-id/${id}`
                );
                setData(response.data.data);
            } catch (error) {
                console.error("Error fetching books:", error);
            }
        };
        fetchData();
    }, [id]);
    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
        bookid: id,
    }
    const handleFav = async () => {
        const response = await axios.put("http://localhost:1000/api/v1/add-book-to-fav", {}, {
            headers
        })
        alert(response.data.message)
    }
    const handleCart = async () => {
        const response = await axios.put("http://localhost:1000/api/v1/add-to-cart", {}, {
            headers
        })
        alert(response.data.message)
    }
    const ondelete = async () => {
        const res = await axios.delete("http://localhost:1000/api/v1/delete-book", { headers })
        alert(res.data.message);
        navigate('/all-books')

    }
    return (
        <>
            {Data ? (
                <div className="w-full h-screen bg-zinc-900 flex flex-col lg:flex-row items-center lg:items-start justify-around px-12 py-8">
                    <div className="flex flex-col items-center lg:flex-row bg-zinc-800 rounded-lg p-4 w-full lg:w-2/5 gap-4">
                        <img className="h-auto max-w-full lg:h-[80vh] sm:h-[44vh] rounded-lg shadow-lg" src={Data?.url} alt="Book Cover" />
                        {isLoggedIn && role === 'user' && (
                            <div className="flex lg:flex-col gap-4 mt-4 lg:mt-0">
                                <button onClick={handleFav} className="bg-white rounded-full text-4xl p-2 text-center"><FaHeart /></button>
                                <button className="bg-white rounded-full text-4xl p-2 text-center" onClick={handleCart}><FaShoppingCart /></button>
                            </div>
                        )}
                        {isLoggedIn && role === 'admin' && (
                            <div className="flex lg:flex-col gap-4 mt-4 lg:mt-0">
                                <Link
                                    to={`/updateBook/${id}`}
                                    className='bg-black lg:rounded-full text-3xl p-2  text-white flex items-center w-full justify-center '>



                                    <FaEdit /><span className='ms-4 block lg:hidden  text-xl'>edit</span>



                                </Link>
                                <button className="bg-white rounded-full text-4xl p-2 text-center" onClick={ondelete}><MdDelete /></button>
                            </div>
                        )}
                    </div>
                    {/* Book Details Section */}
                    <div className="lg:w-3/5 w-full p-4">
                        <h1 className="text-4xl text-zinc-300 font-semibold">{Data?.title}</h1>
                        <p className="text-zinc-400 mt-1 text-lg">by {Data?.author}</p>
                        <p className="text-zinc-500 mt-4 text-xl">{Data?.desc}</p>
                        <p className="text-zinc-400 mt-4 text-lg">{Data?.language}</p>
                        <p className="mt-4 text-zinc-100 text-3xl font-semibold">
                            Price: ₹ {Data?.price}
                        </p>
                    </div>
                </div>
            ) : (
                <div className='flex justify-center items-center h-screen bg-zinc-900'><Loader /></div>
            )}
        </>
    );
};

export default ViewBookDetails;
