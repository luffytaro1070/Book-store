import mongoose from "mongoose";

const user=new mongoose.Schema({
    username:{
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    address:{
        type:String,
        required:true
    },
    avatar:{
        type:String,
        default:"https://cdn-icons-png.flaticon.com/128/3177/3177440.png"
    },
    role:{
        type:String,
        default:"user",
        enum:["user","admin"],
    },
    favourites:[
        {
            type:mongoose.Types.ObjectId,
            ref:"books",
        },
    ],
    cart:[
        {
            type:mongoose.Types.ObjectId,
            ref:"books",
        },
    ],
    orders:[
        {
            type:mongoose.Types.ObjectId,
            ref:"order",
        }
    ]
},{
    timestamps:true
})
const User =mongoose.model("user",user);
export default User;