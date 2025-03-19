import express from "express"
import User from "../models/user.js"
import authenticateToken from "./userAuth.js"
const router = express.Router()

//add book to fav loged in user
router.put('/add-book-to-fav', authenticateToken, async (req, res) => {
    try {
        const { bookid,id } = req.headers;
        const userData = await User.findById(id);
        const isBookFavourite = userData.favourites.includes(bookid);
        if (isBookFavourite) {
            return res.status(200).json({ message: "Book is Favourite already" });
        }
        await User.findByIdAndUpdate(id, { $push: { favourites: bookid } });
        return res.status(200).json({ message: "Book addedto favourites" });

    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
})
router.put( '/delete-book-from-fav',authenticateToken,async(req,res)=>{
    try{
        const {bookid,id}=req.headers;
        const userData = await User.findById(id);
        const isBookFavourite=userData.favourites.includes(bookid);
        if(isBookFavourite ){
            await User.findByIdAndUpdate(id,{ $pull: { favourites: bookid } });
        }

        return res.status(200).json({message:"Book deleted from favourites"});
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
})
//get favourites books of a particular user
router.get('/get-fav-books',authenticateToken,async(req,res)=>{
    try{
        const {id}=req.headers;
        const userData = await User.findById(id).populate("favourites");
        const favourites=userData.favourites;
        return res.json({status:"success",data:favourites})
    }
    catch(err){
        res.status(500).json({message:"internal server error"});
    }
})

export default router