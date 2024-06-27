import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mode: "dark",
    user: {},
    token: null,
    posts: [],
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setMode: (state) => {
            state.mode = state.mode === "light" ? "dark" : "light";
        },
        setLogin: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        setUpdatedUser: (state, action) => {
            state.user = action.payload.user;
        },
        setLogout: (state) => {
            state.user = null;
            state.token = null;
        },
        setPosts: (state,action) => {
            //console.log(action.payload);
            const sortedPostsDesc = action.payload.posts.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            state.posts = sortedPostsDesc;
        },
        setPost: (state,action) => {
            const updatedPosts = state.posts.map((post) => {
                if (post._id === action.payload.post._id) {
                    return action.payload.post;
                }else{
                    return post;
                }
            });
            state.posts = updatedPosts;
        }
    }
})

export const {setFriends, setLogin, setLogout, setMode,setPosts,setPost, setUpdatedUser} = authSlice.actions;

export default authSlice.reducer;