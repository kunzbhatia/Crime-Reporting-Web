import React from 'react'
import { Box, Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

const CategoryCard = ({image, cat, des}) => {
    const mode = useSelector(state=>state.mode);
    const navigate = useNavigate();

    const handleClick = ()=>{
        navigate(`/articles/${cat}`);
        window.scrollTo(0, 0);
    }

    return (
        <Box sx={{
            width: "18rem", height: "14rem", backgroundColor: mode==="dark"?"#4C4C4C":"#FFF", color: mode==="dark"?"#FFF":"#000", padding: "2rem",
            border: mode==="dark"?"" : "1px solid #ccc",
            "&:hover": {
                opacity: 1,
                color: "#000",
                backgroundColor: "#FFD050",
                cursor: "pointer"
            }
        }}
        onClick={handleClick}
        >
            <Box sx={{width:"3rem", height:"3rem", borderRadius:"1rem"}} backgroundColor="#FBF6EA" mb="1rem" justifyContent="center" alignItems="center" display="flex">
                <img src={image || "https://s3-alpha-sig.figma.com/img/8cc8/44df/72de2f7481cc39d883d9203c402cd53c?Expires=1696809600&Signature=bXvPaWrQLxMGY8BOfBghTJe0j4yjMPEoEbp0LlGDAB2sXcz7QpIP5FNZDf-IrsMZiMpoilMlPEoj5YPViEqbXaeVigeyfsmbegblb42jewMbBh7GkW46PC9yJ1I1DjWyqcWqJesWBQrqlKQrUH~bGHIEDr3OCqKs5SDYibXx~EKMFHz6aFR0SPC55BzNCdjLI7ORy2BG6xYJj2qor4w9KmPPDMUbl0bgw4lmOMhxPeFUQ~386VBGpoN7ZSDIX7YEeX040TyEL9Ig6E7XjGpDcHsS~HuzQoiVFBLJ5f8u2fejN1KaOoSB4s7syZOeoTyUS679qXIo9y2NFtdpXTzIWA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4" }
                 alt='myImage' width="25rem" height="25rem"/>
            </Box>
            <Typography variant='h3' sx={{ fontFamily: "Sen", fontSize: "1.5rem", fontWeight: 700 }} mb="1rem">
                {cat || "Category" }
            </Typography>
            <Typography variant='subheading1' sx={{ fontFamily: "Inter", fontSize: ".8rem", fontWeight: 400}}>
                {des || "Lorem ipsum dolor sit amet, consectetuer adipiscing elit."}
            </Typography>
        </Box>
    )
}

export default CategoryCard