import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Box,Typography } from '@mui/material';
import MyImage from "testimg2.jpg"
import { useSelector } from 'react-redux';

const MorePosts = ({_id,cat,title,des,image }) => {
  const navigate = useNavigate();
  const mode = useSelector((state)=>state.mode);
  return (
    <Box display="flex" onClick={()=>navigate(`/article/${_id}`)} flexDirection="column" width="25rem"
    sx={{
        "&:hover":{
            cursor:"pointer",
            backgroundColor: mode === "dark" ? "#292929" : "#FBF6EA"
        }
    }}
    >
        <Box display="flex" padding="1rem">
            <img src={image || MyImage} alt="crimeImg" style={{objectFit:"cover"}} width="100%"/>
        </Box>
        <Box display="flex" padding="1rem" flexDirection="column" gap="0.2rem">
            <Typography variant='h6' sx={{fontFamily:"Inter", fontSize:"0.845rem", fontWeight:600,letterSpacing:"0.1875rem", color:"#FFD050", lineHeight:"1.25rem"}}>{cat || "Murder"}</Typography>
            <Typography variant='h2' sx={{fontFamily:"Sen", fontSize:"1.4rem", fontWeight:700, letterSpacing:"-0.05rem", lineHeight:"3rem"}}>{ title || "Design tips for designers that cover everything you need"}</Typography>
            <Typography sx={{fontFamily:"Inter", fontSize:".7rem", fontWeight:400, lineHeight:"1.75rem"}}>{des || "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident."}</Typography>
        </Box>
    </Box>
  )
}

export default MorePosts