import { Router } from "express";
import User from "../models/user.js";
const router = Router();
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import authenticateToken from "./userAuth.js";
import Book from "../models/book.js"
//add-book admin
router.post('/add-book', authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers;
        const user = await User.findById(id);

        if (user.role !== "admin") {
            return res.status(403).json({
                message: "UnAuthorized"
            })
        }
        const book = new Book({
            url: req.body.url,
            title: req.body.title,
            author: req.body.author,
            price: req.body.price,
            desc: req.body.desc,
            language: req.body.language,
        })
        await book.save();
        res.status(200).json({ message: "book added successfully" })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: "Internal Server Error" })
    }
})

router.put('/update-book', authenticateToken, async (req, res) => {
    try {
        const { bookid } = req.headers;
        await Book.findByIdAndUpdate(bookid, {
            url: req.body.url,
            title: req.body.title,
            author: req.body.author,
            price: req.body.price,
            desc: req.body.desc,
            language: req.body.language,
        })
        res.status(201).json({ message: "Book Updated Successfully" })
    } catch (error) {
        res.status(500).json({ message: "internal server error" });
    }
})
router.delete('/delete-book', authenticateToken, async (req, res) => {
    try {
        const { bookid } = req.headers;
        await Book.findByIdAndDelete(bookid)
        return res.status(200).json({ message: "Book Deleted Successfully" });
    } catch (error) {
        res.status(500).json({ message: "internal server error" });
    }
})
router.get('/get-all-books', async (req, res) => {
    try {
        const books = await Book.find().sort({ createdAt: -1 });
        res.json({ status: "success", data: books });
    }
    catch (err) {
        res.status(500).json({ message: "internal server error" });
    }
})
router.get('/recently-added-books', async (req, res) => {
    try {
        const books = await Book.find().sort({ createdAt: -1 }).limit(4);
        res.json({ status: "success", data: books });

    }
    catch (err) {
        res.status(500).json({ message: "internal server error" });
    }
})
router.get('/get-book-by-id/:id',async(req,res)=>{
    try{
        const { id }=req.params;
        const book=await Book.findById(id);
        res.json({status:"success",data:book});
    }
    
    catch(err){
        res.status(500).json({message:"internal server error"});
    }
})
export default router;