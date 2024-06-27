import React from 'react'
import { Box, Typography, useTheme, useMediaQuery } from '@mui/material'
import MyImage from '../testimg2.jpg'

const Card = ({imageUrl=MyImage , title="Title", authorName="Author", location="Location", time="Time", description="Description"}) => {
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)")
  const { palette } = useTheme();
  return (
    <Box padding="1rem"
      backgroundColor={palette.background.alt}
      borderRadius="0.75rem"
      sx={{
        transition: "all 0.8s cubic-bezier(0.15, 0.83, 0.66, 1)",
        boxShadow :  "0px 10px 20px rgba(0, 0, 0, 0.1)",
        cursor: "pointer",
        "&:hover":{
          transform: "scale(1.05)"
        } 
      }}>
      <img src={imageUrl} style={{ objectFit: "cover", cursor: "pointer" }} alt='userImage' width={isNonMobileScreens ? "350rem" : "300rem"} height={isNonMobileScreens ? "250rem" : "300rem"} />
      <Box display="flex" justifyContent="space-between" m="0.3rem">
        <Typography variant='subheading'>{authorName}</Typography>
        <Typography variant='subheading'>{time}</Typography>
      </Box>
      <Typography variant='h3' fontWeight="bold" mt={1.5}>{title}</Typography>
      <Typography m="0.5rem 0" variant='h6' color={palette.neutral.medium}>{description}</Typography>
      <Typography color={palette.neutral.medium} >{location}</Typography>
    </Box>
  )
}

export default Card