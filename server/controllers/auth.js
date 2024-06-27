import bcrypt from "bcrypt";
import User from "../models/User.js";
import cloudinary from "cloudinary";
import getDataUri from "../utils/dataUri.js";
import jwt from "jsonwebtoken"

export const register = async (req, res) => {
    try{
        //console.log(req.body)
        const uploadedImages = [];
        
        for(const file of req.files){
            const fileUri = getDataUri(file);
            const result = await cloudinary.v2.uploader.upload(fileUri.content);
            
            uploadedImages.push({
                url: result.secure_url,
                public_id: result.public_id
            });
        }
        
        const { firstName, lastName, email, password, location, occupation } = req.body;
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const user = new User({
            firstName,
            lastName,
            email,
            password: passwordHash,
            pictureUrl:{
                public_id: uploadedImages[0].public_id,
                url: uploadedImages[0].url,
            },
            location,
            occupation
        });
        const savedUser = await user.save();
        //console.log("successfully worked");
        res.status(201).json(savedUser);
    }
    catch (err) {
        console.log(err.message);
        res.status(500).json({error: err.message})
    }
}

/*logging in*/
export const login = async(req,res) => {
    try{
        const {email, password} = req.body
        console.log(email);
        const user = await User.findOne({email: email});
        if(!user){
            res.status(400).json({msg: "User does not exist"})
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) return res.status(400).json({msg: "Invalid Credentials"});

        const token = jwt.sign({id:user._id}, process.env.JWT_SECRET);
        delete user.password;
        res.status(200).json({token, user});

    } catch(err){
        console.log(err.message);
        res.status(500).json({error : err.message})
    }
}