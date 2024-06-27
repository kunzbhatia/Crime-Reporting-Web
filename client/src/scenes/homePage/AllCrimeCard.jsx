import React from 'react'
import { Box, Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const AllCrimeCard = ({_id, author, title, time}) => {
    const mode = useSelector(state => state.mode);
    const navigate = useNavigate();
    return (
        <Box width="100%" color="#000000" backgroundColor= {mode === "dark" ? "#D9D9D9" : "#FFF" } height="9.3rem" padding="1.2rem"
        sx={{
            display:"flex",
            flexDirection:"column",
            justifyContent:"center",
            borderBottom: "1px solid #ccc",
            "&:hover" : {
                backgroundColor:"#FBF6EA",
                cursor:"pointer"
            }
        }}
        onClick = {()=>navigate(`/article/${_id}`)}
        >
            <Typography>
                By <span style={{ color:"#592EA9" }}>{author || "James West"}</span> | {time || "May 23, 2022"}
            </Typography>
            <Typography sx={{
                fontFamily:'Sen', fontSize:"1.2rem", fontWeight:700
            }}>
                {title || "Mumbai Crime: One held in shooting incident in Kurla"}
            </Typography>
        </Box>
    )
}

export default AllCrimeCard