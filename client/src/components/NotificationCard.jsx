import React from 'react'
import { Box, Typography, Stack, Divider } from '@mui/material'
import Image from "Info.png"
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setUpdatedUser } from 'state'

const NotificationCard = ({_id,notificationId,title="Chor bazar me chori",image=Image,author="Deepanshu", location="Jammu"}) => {
    const mode = useSelector(state=>state.mode);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(state=>state.user);
    const token = useSelector(state=>state.token);
    
    const handleClick = async() => {
        navigate(`/article/${_id}`)
        const response = await fetch(`https://crime-reporting-app-server.vercel.app/users/${user._id}/${notificationId}`,{
            method:"DELETE",
            headers:{ Authorization: `Bearer ${token}`},
        })
        const res = await response.json();
        dispatch(setUpdatedUser({user:res}));
    }


  return (
    <>
    <Stack direction="row" onClick={handleClick}  sx={{"&:hover":{cursor:"pointer", backgroundColor: mode==="dark"?"#4C4C4C":"#FFF", color: mode==="dark"?"#FFF":"#000"}, padding:"0.8rem"}}>
        <Box display="flex" flexDirection="row" gap="20px" alignItems="center">
            <img src={image} alt="" height="80px" width="80px" style={{borderRadius:"50%"}}/>
            <Box display="flex" flexDirection="column" gap="10px">
                <Typography variant='h5'>{title}</Typography>
                <Box flexDirection="row" display="flex" justifyContent="space-between">
                    <Typography sx={{ fontFamily: "Inter", fontSize: "0.845rem", fontWeight: 500, color: "#FFD050", lineHeight: "1.25rem" }}>{author}</Typography>
                </Box>
            </Box>
        </Box>
    </Stack>
    <Divider/>
    </>
  )
}

export default NotificationCard