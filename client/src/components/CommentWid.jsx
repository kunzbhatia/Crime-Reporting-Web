import React from 'react'
import { useTheme, Typography, Box } from '@mui/material'
import { useNavigate } from 'react-router-dom';

const CommentWid = ({userId,name, picturePath , comment}) => {
    const {palette} = useTheme();
    const navigate = useNavigate();
    return (
        <Box backgroundColor={palette.neutral.light} mb={1} p="1rem 1rem" alignItems='center'
            borderRadius= "0.75rem" display='flex' flexDirection='row'>
            <img src={picturePath} style={{objectFit: "cover", borderRadius:"50%"}}
                width="50px" height="50px" alt="user"
            />
            <Box ml={1.5}>
                <Typography variant='h5' sx={{"&:hover":{"cursor":"pointer"}, fontFamily:"Sen", fontWeight:700}} onClick={()=>navigate(`/profile/${userId}`)}>{name}</Typography>
                <Typography variant='subtitle1' sx={{fontFamily:"Inter", fontWeight:900}}>{comment.charAt(0).toUpperCase() + comment.slice(1)}</Typography>
            </Box>

        </Box>
    )

}

export default CommentWid