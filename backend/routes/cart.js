import express from "express"
import User from "../models/user.js"
import authenticateToken from "./userAuth.js"
const router = express.Router()

//put book to cart
router.put('/add-to-cart', authenticateToken, async (req, res) => {
    try{
        const{bookid,id}=req.headers;
        const userData=await User.findById(id);
        const isBookInCart= userData.cart.includes(bookid);
        if(isBookInCart){
            return res.status(200).json({status:"success",message:"book is already in cart"});
        }
        await User.findByIdAndUpdate(id,{
            $push:{cart:bookid}
        })
        res.status(200).json({status:"success",message:"book added to cart"});
    }
    catch(err){
        res.status(500).json({message:"internal server error"});
    }
})

//remove from cart
router.put("/remove-from-cart/:bookid",authenticateToken,async(req,res)=>{
    try{
        const {bookid}=req.params;
        const {id}=req.headers;
        await User.findByIdAndUpdate(id,{
            $pull:{cart:bookid},
        });
        return res.status(200).json({status:"success",message:"book removed from cart"});

    }
    catch(err){
        res.status(500).json({message:err.message});
    }
})
// cart of particular user
router.get("/get-user-cart",authenticateToken,async(req,res)=>{
    try{
        const {id}=req.headers;
        const userData=await User.findById(id).populate("cart");
        const cart=userData.cart.reverse();
        return res.status(200).json({status:"success",data:cart});

    }
    catch(err){
        res.status(500).json({message:err.message});
    }
})
export default router