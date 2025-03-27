const User =  require("../models/user.js")
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv')
dotenv.config()


exports.register=(async (req,res) => {
    const {username,email,password,role}=req.body
    try{
        console.log("inside the register api");
        
        if(!username || !email |!password) return res.status(400).json({message: "Missing required fields"})
        
        const existingUser= await User.findOne({email})
        if(existingUser) return res.status(400).json({message:"User already exists"})
        
        // const hashedPassword = await bcrypt.hash(password,10)
        const salt = await bcrypt.genSalt(10); // Generate a random salt
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({username,email,password:hashedPassword, role})  
        console.log(newUser);
        await newUser.save();

        console.log("after saving new user:",newUser);
        res.status(201).json({message:'User registered successfully'})
    }catch (error){
        console.error(error);
        res.status(500).json({message:'Registration failed', error})
    }
})


exports.login = async (req,res)=>{
    const {email,password}= req.body
    try{
        console.log("inside login api");
        
        const user= await User.findOne({email})
     
        console.log("User:", user);
        
        if(!user) return res.status(400).json({message:'Invalid email'})
        
        const isMatch =  await bcrypt.compare(password,user.password)
            console.log("ismatch",isMatch);
            
        if(!isMatch) return res.status(400).json({message:'Invalid email or password'})

        const token = jwt.sign({userId:user._id}, process.env.JWT_SECRET_KEY,{expiresIn:'15m'})
    
        res.status(200).json({message:'Login Successful', token, user})
    }catch(error){
        res.status(500).json({message:"Error in log in",error})
    }
}

exports.updateUser  = async (req, res) => {
    const { username, email } = req.body;
    console.log("req.body:", req.body);
    const user = req.user; // Assuming you have user ID available in the request (e.g., from a token)
    console.log("userid:", user);
    
    try {
        // Find the user by ID and update the username and email
        const updatedUser  = await User.findByIdAndUpdate(
            user.userId,
            { username, email },
            { new: true } // Return the updated document
        );

        console.log("updated user:", updatedUser);
        

        if (!updatedUser ) {
            return res.status(404).json({ message: "User  not found" });
        }

        res.status(200).json({ message: "User  updated successfully", user: updatedUser  });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to update user", error });
    }
}

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find(); // Fetch all users from the database
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch users", error });
    }
};

exports.deleteUser = async (req, res) => {
    const { userId } = req.params;

    try {
        const deletedUser = await User.findByIdAndDelete(userId);

        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete user", error });
    }
};
