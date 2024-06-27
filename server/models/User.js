import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            min: 2,
            max: 30,
        },
        lastName: {
            type: String,
            required: true,
            min: 2,
            max: 30,
        },
        email:{
            type:String,
            required: true,
            unique: true,
            max: 50
        },
        password:{
            type:String,
            required: true,
            min: 6
        },
        pictureUrl:{
            public_id:{
                type: String,
                default:"",
            },
            url:{
                type:String,
                default:"",
            }
       },
       notification:{
        type: [
            {
                postId:{
                    type: String,
                    required: true
                },
                title: {
                    type: String,
                    required: true
                },
                imgUrl: {
                    type: String,
                    required: true
                },
                author: {
                    type: String,
                    required: true
                }
            }
        ],
        default: []
       },
        location:String,
        longitude: {
            type: String,
            default:"0000"
        },
        latitude: {
            type: String,
            default:"0000"
        },
        desc:{
            type:
                {
                    aboutMe:{
                        type:String
                    },
                    skills:{
                        type:String
                    },
                    experience:{
                        type:String
                    },
                    education:{
                        type:String
                    }
                }
        },
        occupation:String,
        viewedProfile: Number,
    }, 
    {timestamps:true}
);

const User = mongoose.model("User",UserSchema)
export default User;