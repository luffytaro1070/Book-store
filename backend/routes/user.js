import { Router } from "express";
import User from "../models/user.js";
const router = Router();
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken" // Corrected import statement
import authenticateToken from "./userAuth.js";
//Sign Up

router.post("/sign-up", async (req, res) => {
    try {
        const { username, email, password, address } = req.body;

        if (username.length < 4) {
            return res.status(400).json({ message: "Username length should be greater than 3" });
        }

        // Check if username already exists
        const existingUserName = await User.findOne({ username: username });
        if (existingUserName) {
            return res.status(400).json({ message: "Username already exists" });
        }

        // Check if email already exists
        const existingEmail = await User.findOne({ email: email });
        if (existingEmail) {
            return res.status(400).json({ message: "Email already exists" });
        }

        // Check password length
        if (password.length <= 5) {
            return res.status(400).json({ message: "Password length should be greater than 5" });
        }

        // Hash password
        const hashPass = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new User({
            username: username,
            email: email,
            password: hashPass,  // Store hashed password
            address: address
        });

        // Save user to database
        await newUser.save();

        res.status(200).json({ message: "User created successfully / Sign-up successful" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});


//login
router.post("/sign-in",async (req,res) => {
    try {
        const{username,password}=req.body;
        const existingUser=await User.findOne({username});
        if(!existingUser) {
            return res.status(400).json({ message: "Username or password is incorrect" }); 
        }
        await bcrypt.compare(password,existingUser.password,(err,data)=>{
            if(data){
                const authClaims=[
                    
                        {name:existingUser.username},
                        {role: existingUser.role},
                    
                ];
               const token =jwt.sign({authClaims},"bookStore123",{
                expiresIn:"30d",
            });
               res.status(200).json({id:existingUser._id, role:existingUser.role,token:token })
            
            }

            else{
                return res.status(400).json({message:"password is incorrect "});
            }
        })
    } catch (error) {
        res.status(500).json({message:"Internal Server Error"})
    }
})
router.get("/get-user-info",authenticateToken,async (req,res) => {
    try {
        const{id}=req.headers;
        const data= await User.findById(id).select("-password");
        return res.status(200).json(data);
    } catch (error) {
        res.status(500).json({message:"Internal Server Error"})
    }
})
router.put("/update-address",authenticateToken,async(req,res)=>{
    try {
        const {id}=req.headers;
        const {address}=req.body;
        await User.findByIdAndUpdate(id,{address:address});
        res.status(200).json({message:"address updated successfully"})
    } catch (error) {
        res.status(500).json({message:"Internal Server Error"})
    }
})
export default router;