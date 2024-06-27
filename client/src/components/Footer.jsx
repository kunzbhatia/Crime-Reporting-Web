import React from 'react'
import { Box, Typography, useTheme, useMediaQuery } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import ReadMore from './ReadMore';
import { useSelector } from 'react-redux';


const Footer = () => {
    const { palette } = useTheme();
    const navigate = useNavigate();
    const mode = useSelector(state=>state.mode);

    const handleClick = (route) =>{
        navigate(route);
        window.scrollTo(0, 0);
    }

    return (
        <Box width="100%" sx={{ height: "20rem", padding: "2.5rem 5rem" }} backgroundColor={mode == "dark" ? "#292929":"#232536"}>
            <Box display="flex" flexDirection="row" justifyContent="space-between">
                <Typography fontWeight="bold" fontSize="32px" color="#fff" position='relative' onClick={() => navigate("/")}
                    sx={{
                        "&:hover": {
                            color: palette.primary.dark,
                            cursor: "pointer"
                        }
                    }}
                >
                    <div>Secure<span style={{ color: "red", fontSize: "1.2rem" }}>Spot</span></div>
                </Typography>
                <Box display="flex" gap="1.5rem" alignItems="center" color="#fff">
                    <Typography sx={{"&:hover":{"cursor":'pointer'}}} onClick={()=>handleClick('/')}>Home</Typography>
                    <Typography sx={{"&:hover":{"cursor":'pointer'}}} onClick={()=>handleClick('/articles')}>Crimes</Typography>
                    <Typography sx={{"&:hover":{"cursor":'pointer'}}} onClick={()=>handleClick('/contactUs')}>Contact Us</Typography>
                </Box>
            </Box>
            <Box backgroundColor="#4C4C4C" width="100%" height="9rem" m="1rem 0" display='flex' p="3rem 7rem" alignItems="center" gap="20rem" color="#fff">
                    <Typography variant='h2' 
                    sx={{
                        fontFamily:"Sen",
                        fontWeight:700,
                        fontSize:"1.75rem",
                        width:"50%"
                    }}
                    >Signup to Subscribe to get latest crime notifications happened in your area.</Typography>
                    <ReadMore text='Subscribe' nav="/login"/>
            </Box>
            <Typography variant='body2' color="#fff">SecureSpot 400058 Mumbai</Typography>
            <Typography variant='body2' color="#fff">Hello@SecureSpot.com  +91 79930 29055</Typography>
        </Box>
    )
}

export default Footer