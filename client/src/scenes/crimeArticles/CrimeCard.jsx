import React, { useState } from 'react'
import { Box, Typography } from '@mui/material'
import MyImage from "testimg2.jpg"
import { Navigate, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'


const CrimeCard = ({_id, cat , title, desc, image}) => {
    const mode = useSelector((state) => state.mode);
    const navigate = useNavigate();
  return (
    <Box display="flex" width="100%" height="19rem" gap="2rem" onClick={()=>navigate(`/article/${_id}`)}
    sx={{
        "&:hover":{
            cursor:"pointer",
            backgroundColor: mode === "dark" ? "#292929" : "#FBF6EA"
        }
    }}
    >
        <Box display="flex" width="35%" padding="1rem">
            <img src={image || MyImage} alt="crimeImg" style={{objectFit:"cover"}} width="100%"/>
        </Box>
        <Box padding="3rem" width="60%" display="flex" flexDirection="column" gap="1rem">
            <Typography variant='h6' sx={{fontFamily:"Inter", fontSize:"0.845rem", fontWeight:600,letterSpacing:"0.1875rem", color:"#FFD050", lineHeight:"1.25rem"}}>{cat || "Murder"}</Typography>
            <Typography variant='h1' sx={{fontFamily:"Sen", fontSize:"2rem", fontWeight:700, letterSpacing:"-0.125rem", lineHeight:"3rem"}}>{title || "Design tips for designers that cover everything you need"}</Typography>
            <Typography sx={{fontFamily:"Inter", fontSize:"1rem", fontWeight:400, lineHeight:"1.75rem"}}>{desc || "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident."}</Typography>
        </Box>
    </Box>
  )
}

export default CrimeCard