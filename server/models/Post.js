import mongoose from "mongoose";
//Add category to it
const postSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        state: String,
        location: String,
        title: String,
        description: String,
        userPicturePath: {
            public_id: {
                type: String,
                required: true,
            },
            url: {
                type: String,
                required: true
            }
        },
        picturePath: {
            type: [ 
                {
                    public_id: {
                        type: String,
                        required: true
                    },
                    url: {
                        type: String,
                        required: true
                    }
                }
            ],
            default: []
        },
        likes: {
            type: Map,
            of: Boolean,
        },
        comments: {
            type:[{
                userId: {
                    type: String,
                    required: true
                },
                userName: {
                    type: String,
                    required: true
                },
                userPicturePath: {
                    type: String,
                    required: true
                },
                comment:{
                    type: String,
                    required: true
                }
            }],
            default: []
        },
        category:{
            type:String,
            required: true,
        }
    },
    { timestamps: true }
)

const Post = mongoose.model("Post", postSchema);
export default Post;