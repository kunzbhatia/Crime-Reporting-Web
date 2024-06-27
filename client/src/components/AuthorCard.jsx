import React from 'react'
import { Box, Typography } from '@mui/material'
import MyImage from "../testimg2.jpg"
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AuthorCard = ({ _id, name, image, number = 10 }) => {
  const isAuth = Boolean(useSelector((state) => state.token));
  const navigate = useNavigate();
  return (
    <Box sx={{ width: "14rem", height: "17rem", backgroundColor: "#FBF6EA" }} display="flex" flexDirection="column" alignItems="center" color="#000" padding="1rem">
      <Box onClick={()=>( isAuth ? navigate(`/profile/${_id}`) : alert("Login/Signup to Checkout writer's profile"))} sx={{"&:hover" : {cursor:"pointer"}}}>
        <img src={image || MyImage} width="120rem" height="120rem" style={{ borderRadius: "50%", margin: "0.5rem" }} />
        <Typography textAlign="center" sx={{
          fontFamily: "Sen",
          fontSize: "1.3rem",
          fontWeight: 700,
          transition: "transform 0.3s ease",
          "&:hover" : {transform:"scale(1.1)"}
        }}
        >{name || "Deepanshu"}</Typography>
        <Typography m={1}>Reported {number} incidents</Typography>
      </Box>
      <Box display="flex" flexDirection="row" gap={1} mt={1}>
        <FacebookIcon />
        <TwitterIcon />
        <InstagramIcon />
        <LinkedInIcon />
      </Box>
    </Box>
  )
}

export default AuthorCard