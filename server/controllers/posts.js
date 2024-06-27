//createPost, updatePost, deletePost, likePost, getPosts, getPostsBySearch, getUserPosts, commentPost , getCommentPosts
import Post from "../models/Post.js"
import User from "../models/User.js";
import cloudinary from "cloudinary";
import getDataUri from "../utils/dataUri.js";
import nodemailer from "nodemailer";
import {google} from "googleapis";
import stream from "stream";
import path from "path"
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const KEYFILEPATH = path.join(__dirname, "cred.json");
const SCOPES = ["https://www.googleapis.com/auth/drive"];

const auth = new google.auth.GoogleAuth({
    keyFile: KEYFILEPATH,
    scopes: SCOPES,
});

function calculateDistance(userLatitude, userLongitude, queryLatitude, queryLongitude) {
    const earthRadius = 6371; // Radius of the Earth in kilometers

    const lat1 = parseFloat(userLatitude);
    const lon1 = parseFloat(userLongitude);
    const lat2 = parseFloat(queryLatitude);
    const lon2 = parseFloat(queryLongitude);

    if (isNaN(lat1) || isNaN(lon1) || isNaN(lat2) || isNaN(lon2)) {
        return NaN; // Invalid input, return NaN for distance
    }

    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos((lat1 * (Math.PI / 180))) * Math.cos((lat2 * (Math.PI / 180))) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = earthRadius * c; // Distance in kilometers
    console.log(distance);
    return distance;
}



const uploadFile = async (fileObject) => {
    const bufferStream = new stream.PassThrough();
    bufferStream.end(fileObject.buffer);
    const { data } = await google.drive({ version: "v3", auth }).files.create({
        media: {
            mimeType: fileObject.mimeType,
            body: bufferStream,
        },
        requestBody: {
            name: fileObject.originalname,
            parents: ["1wbq_2uPT5NeCTEI2sHguBoREtI8DRJ45"],
        },
        fields: "id,name",
    });
    console.log(`Uploaded file ${data.name} ${data.id}`);
};

export const updatePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { location, title, description, state } = req.body;
        const post = await Post.findByIdAndUpdate(
            id,
            { location, title, description, state },
            { new: true }
        );
        res.status(201).json(post);
    }
    catch (err) {
        res.status(404).json({ error: err.message });
    }
}

export const deletePost = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await Post.findById(id);
        for (const image of post.picturePath) {
            try {
                await cloudinary.v2.uploader.destroy(image.public_id);
            } catch (error) {
                console.error("Error deleting image:", error);
            }
        }
        await Post.findByIdAndDelete(id);
        const posts = await Post.find();
        res.status(200).json(posts);
    }
    catch (err) {
        res.status(404).json({ message: err.message })
    }
}

export const likePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId } = req.body;
        const post = await Post.findById(id);
        const isLiked = post.likes.get(userId);

        if (isLiked) {
            post.likes.delete(userId);
        } else {
            post.likes.set(userId, true)
        }

        const updatedPost = await Post.findByIdAndUpdate(id, { likes: post.likes },
            { new: true, timestamps: false });
        res.status(201).json(updatedPost);
    }
    catch (err) {
        res.status(404).json({ error: err.message });
    }
}

export const getPosts = async (req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).json(posts);
    }
    catch (err) {
        res.status(404).json({ error: err.message });
    }
}

export const getUserPosts = async (req, res) => {
    try {
        const { userId } = req.params;
        const posts = await Post.find({ userId });
        res.status(200).json(posts);
    }
    catch (err) {
        res.status(404).json({ error: err.message });
    }
}

export const getPostsBySearch = async (req, res) => {
    try {
        const searchName = req.query.q;
        const posts = await Post.find({
            $or: [
                { title: { $regex: searchName, $options: 'i' } },
                { $expr: { $regexMatch: { input: { $concat: ['$firstName', ' ', '$lastName'] }, regex: searchName, options: 'i' } } }
            ]
        });
        res.status(200).json(posts);
    }
    catch (err) {
        res.status(404).json({ error: err.message });
    }
}

export const commentPost = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId, comment } = req.body;
        const post = await Post.findById(id);
        const user = await User.findById(userId);

        post.comments.push({ userId, userName: `${user.firstName} ${user.lastName}`, userPicturePath: user.pictureUrl.url, comment })

        const updatedPost = await Post.findByIdAndUpdate(id, { comments: post.comments }, { new: true, timestamps: false });
        res.status(200).json(updatedPost);

    } catch (err) {
        res.status(404).json({ message: err.message })
    }
}

export const getCommentPosts = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await Post.findById(id);
        const comments = post.comments;
        res.status(200).json(comments);

    } catch (err) {
        console.log(err.message);
        res.status(404).json({ message: err.message })
    }
}

export const getPost = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await Post.findById(id);
        res.status(200).json(post);
    }
    catch (err) {
        res.status(404).json({ error: err.message });
    }
}

export const createPost = async (req, res) => {
    try {
        const { userId, location, title, description, state, category } = req.body;
        const user = await User.findById(userId);
        const allUsers = await User.find();
        //console.log(allUsers);
        const users = allUsers.filter(us => {
            const distance = calculateDistance(us.latitude, us.longitude, user.latitude, user.longitude);
            return distance <= 10; // Users within 10 km radius
        });
        const uploadedImages = [];
        
        //for (let f = 0; f < req.files.length; f += 1) {
        //    await uploadFile(req.files[f]);
        //}

        for (const file of req.files) {
            const fileUri = getDataUri(file);
            const result = await cloudinary.v2.uploader.upload(fileUri.content);

            uploadedImages.push({
                url: result.secure_url,
                public_id: result.public_id
            });
        }
        const post = new Post({
            userId,
            firstName: user.firstName,
            lastName: user.lastName,
            state,
            location,
            title,
            description,
            userPicturePath: user.pictureUrl,
            picturePath: uploadedImages,
            likes: {},
            comments: [],
            category
        });
        await post.save();

        await Promise.all(users.map(userr =>
            User.findByIdAndUpdate(userr._id,
                {
                    $push: {
                        notification:
                        {
                            postId: post._id, title,
                            imgUrl: uploadedImages[0].url,
                            author: `${userr.firstName} ${userr.lastName}`
                        }
                    }
                }
            )
        ));

        const emails = [];
        for (const userr of users) {
            emails.push(userr.email);
        }

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.SMTP_EMAIL,
                pass: process.env.SMTP_PASSWORD,
            },
            debug: true,
        });
        const mailOptions = {
            from: "harjotjeevanandi@gmail.com",
            to: emails,
            subject: "Crime Report Alert",
            text: "There has been a new crime reported in your locality. Follow up on the website for more details"
        }

        if (emails.length>0) {
            transporter.sendMail(mailOptions, function (err, info) {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log("Email sent" + info);
                }
            })
        }

        const posts = await Post.find();
        res.status(201).json(posts);
    }
    catch (err) {
        console.log(err.message);
        res.status(409).json({ error: err.message });
    }
}

export const getCategoryPosts = async (req, res) => {
    try {
        const { catName } = req.params;
        const posts = await Post.find({ category: catName });
        res.status(200).json(posts);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}

export const findTopThreeAuthors = async (req, res) => {
    try {
      // Aggregate pipeline to find the top three authors with the most posts
      const topAuthors = await Post.aggregate([
        { $group: { _id: '$userId', count: { $sum: 1 } } }, // Group by userId and count posts
        { $sort: { count: -1 } }, // Sort by count in descending order
        { $limit: 3 }, // Limit the result to 3 authors
      ]);
  
      // Extracting author names and _id based on userId
      const topAuthorsInfo = await Promise.all(
        topAuthors.map(async (author) => {
          const authorInfo = await User.findOne({ _id: author._id });
          return {
            _id: authorInfo._id,
            name: `${authorInfo.firstName} ${authorInfo.lastName}`,
            postCount: author.count,
            image: authorInfo.pictureUrl.url
          };
        })
      );
  
      res.status(200).json(topAuthorsInfo);
    } catch (error) {
      res.status(500).json({ message: 'Error finding top authors', error: error.message });
    }
  };
  