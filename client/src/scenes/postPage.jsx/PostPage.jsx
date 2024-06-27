import React, { useEffect } from 'react'
import { Box, Typography, useMediaQuery, TextField, IconButton, Divider } from '@mui/material'
import DownloadDoneOutlinedIcon from '@mui/icons-material/DownloadDoneOutlined';
import Navbar from 'components/Navbar'
import Footer from 'components/Footer'
import MyImage from 'testimg2.jpg'
import MorePosts from './MorePosts'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import FlexBetween from 'components/FlexBetween'
import moment from 'moment'
import { setPost } from 'state'
import CommentWid from 'components/CommentWid'
import { useNavigate } from 'react-router-dom';

const PostPage = () => {
  const dispatch = useDispatch();
  const { articleId } = useParams();
  const [data, setData] = useState(null);
  const posts = useSelector((state) => state.posts);
  const loggedInUserId = useSelector((state) => state.user?._id);
  const featuredPosts = posts?.slice(0, 3);
  const token = useSelector((state) => state.token);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)")
  const [userComment, setUserComment] = useState('');
  const [isComment, setIsComment] = useState(true);
  const commentValues = data?.comments;
  const isAuth = Boolean(useSelector((state) => state.token));
  const navigate = useNavigate();

  function formatParagraph(paragraph) {

    const boldRegex = /\*\*(.*?)\*\*/g;

    // Split the paragraph into parts based on the boldRegex
    const parts = paragraph?.split(boldRegex);

    // Map the parts to format text between stars as bold
    const formattedParts = parts?.map((part, index) => {
      if (index % 2 === 1) {
        // Text between stars should be bold
        return (
          <Typography key={index} variant='h2'>
            {part}
          </Typography>
        );
      } else {
        // Regular text without stars
        return part;
      }
    });

    return formattedParts;
  }

  const getData = async (event) => {
    const response = await fetch(`https://crime-reporting-app-server.vercel.app/posts/post/${articleId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });

    const res = await response.json();
    setData(res);
  };

  const patchComment = async () => {
    const response = await fetch(`https://crime-reporting-app-server.vercel.app/posts/${articleId}/comment`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ userId: loggedInUserId, comment: userComment })
    });
    const updatedPosts = await response.json();
    setData(updatedPosts);
    setUserComment('');
    dispatch(setPost({ post: updatedPosts }));
  };

  useEffect(() => {
    getData();
  }, [articleId])

  if (!data)
    return "...loading";

  const desc = data.description.split('\n');

  return (
    <Box>
      <Navbar />
      <Box display="flex" flexDirection="row" margin="1rem">
        <Box width="70%">
          <Box>
            <Box display="flex" position="relative" flexDirection="column" alignItems="center">
              <img src={data?.picturePath[0]?.url || MyImage} width="90%" height="450rem" style={{ objectFit: "fill" }} />
            </Box>
          </Box>
          <Box margin="3rem">
            <Typography variant='h1' mb="2rem">{data?.title || "Title"}</Typography>
            {
              desc.map((paragraph, index) => (
                <Typography key={index} variant='h6' sx={{ marginBottom: '1rem', fontWeight: 400 }}>{formatParagraph(paragraph)}</Typography>
              ))
            }
            <Box display="flex" justifyContent="space-between">
              <Typography sx={{ pt: "2rem" }}>Written by <span style={{ color: "#FFD050", cursor: "pointer" }} onClick={() => (isAuth ? navigate(`/profile/${data?.userId}`) : alert("Login/Signup to Checkout writer's profile"))}>{`${data?.firstName} ${data?.lastName}` || "Deep"}</span></Typography>
              <Typography sx={{ pt: "2rem" }} mr="1rem">Published on {moment.unix((new Date(data?.createdAt)) / 1000).format("YYYY-MM-DD HH:mm")}</Typography>
            </Box>
            <Typography variant='h1' mb="2rem" mt="3rem">Community Insights</Typography>
            {isComment && (
              <Box mt="0.5rem">
                <FlexBetween mb={3}>
                  <TextField
                    label="Share your valuable insights & thoughts "
                    multiline
                    variant="outlined"
                    value={userComment}
                    onChange={(e) => setUserComment(e.target.value)}
                    fullWidth
                  />
                  <IconButton onClick={isAuth ? patchComment : () => (alert("SignUp/Login to post a comment"))}>
                    <DownloadDoneOutlinedIcon />
                  </IconButton>
                </FlexBetween>
                <Typography variant='h4' pl={2} pb={2}>
                  Comments
                </Typography>
                {commentValues.map((comment, i) => (
                  <Box key={i}>
                    <CommentWid name={comment?.userName}
                      picturePath={comment?.userPicturePath} comment={comment?.comment}
                      userId={comment?.userId}
                    />
                  </Box>
                ))}
                <Divider />
              </Box>
            )}
          </Box>
        </Box>


        <Box width="30%">
          <Box gap="2rem" display="flex" flexDirection="column">
            {
              featuredPosts.map((post) => (
                <MorePosts _id={post?._id}
                  title={post?.title}
                  cat={post?.category}
                  des={post?.description.slice(0, 200)}
                  image={post?.picturePath[0]?.url}
                />
              ))
            }
          </Box>
        </Box>
      </Box>
      <Footer />
    </Box>
  )
}

export default PostPage