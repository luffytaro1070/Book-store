import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const AddBook = () => {
    const [data, setData] = useState({
        url: "",
        title: "",
        author: "",
        price: 0,
        desc: "",
        language: ""
    })
    const navigate = useNavigate();
    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`
    }
    const change = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
        console.log(data);
    }
    const submit = async () => {
        try {
            if (
                data.url == "" ||
                data.title == "" ||
                data.author == "" ||
                data.price == 0 ||
                data.desc == "" ||
                data.language == ""
            ) {
                alert("Please fill all the fields");
            } else {
                const res = await axios.post("http://localhost:1000/api/v1/add-book", data, { headers })
                console.log(res);
                if (res.request.status === 200) {
                    setData({
                        url: "",
                        title: "",
                        author: "",
                        price: 0,
                        desc: "",
                        language: ""
                    });
                    alert("Book Added Successfully");
                    navigate("/all-books");
                }
            }
        }
        catch (err) {
            console.log(err);
        }
    }
    return (
        <div className='h-[100%] p-0 md:p-4'>
            <h1 className='text-3xl md:text-5xl font-semibold text-yellow-200'>
                Add Book:
            </h1>
            <div className='p-4 bg-zinc-800 rounded mt-8'>
                <div className='mt-1'>
                    <label className="text-zinc-400">
                        Image url
                    </label>
                    <input
                        type="text"
                        name="url"
                        value={data.url}
                        onChange={change}
                        className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
                    />

                </div>
                <div className='mt-1'>
                    <label className="text-zinc-400">
                        Title of the book
                    </label>
                    <input
                        type="text"
                        name="title"
                        value={data.title}
                        onChange={change}
                        className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none '
                    />
                </div>
                <div className='mt-1'>
                    <label className="text-zinc-400">
                        Author of the book
                    </label>
                    <input
                        type="text"
                        name="author"
                        value={data.author}
                        onChange={change}
                        className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'

                    />
                </div>
                <div className='mt-1 md:flex items-center gap-2'>
                    <label className="text-zinc-400">
                        language
                    </label>
                    <input
                        type="text"
                        name="language"
                        value={data.language}
                        onChange={change}
                        className='w-full lg:w-3/6 mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
                    />

                    <label className="text-zinc-400">
                        price
                    </label>
                    <input
                        type="number"
                        name="price"
                        value={data.price}
                        onChange={change}
                        className='w-full lg:w-1/2 mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
                    />
                </div>
                <div className='mt-1'>
                    <label className="text-zinc-400">
                        Description of the book
                    </label>
                    <textarea
                        name="desc"
                        value={data.desc}
                        onChange={change}
                        className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
                        rows="6"
                    />
                </div>

                <button
                    className='mt-12 bg-yellow-200 text-zinc-950 p-2 rounded
         hover:bg-yellow-500 '
                    onClick={submit}>
                    Save
                </button>
            </div>
        </div>
    )
}

export default AddBook