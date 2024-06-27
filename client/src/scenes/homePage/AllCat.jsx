import React, {useContext} from 'react'
import CategoryCard from 'components/CategoryCard'
import { Box, Typography } from '@mui/material'
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
const AllCat = () => {

  const categories = [
    {
      image: "https://res.cloudinary.com/de4mrvvtt/image/upload/v1700158941/lcbjz74zneqoy7hluugi.png",
      cat: "Robbery",
      des: "Taking or attempting to take property from someone by force or threat of force"
    },
    {
      image: "https://res.cloudinary.com/de4mrvvtt/image/upload/v1700158968/qabtnuzw4ylljzt061xm.png",
      cat: "Murder",
      des: " The unlawful killing of another person with intent"
    },
    {
      image: "https://res.cloudinary.com/de4mrvvtt/image/upload/v1700158968/tnwwcvxwidcctv0h2xpf.png",
      cat: "Cyber Crime",
      des: "Criminal activities conducted through the internet or computer networks"
    },
    {
      image: "https://res.cloudinary.com/de4mrvvtt/image/upload/v1700158968/w6mzzwczekzslgedxdu1.png",
      cat: "Kidnapping",
      des: "Unlawfully seizing and carrying away a person against their will"
    },
    {
      image: "https://res.cloudinary.com/de4mrvvtt/image/upload/v1700158968/qabtnuzw4ylljzt061xm.png",
      cat: "Rape",
      des: "Non-consensual sexual activity involving force or coercion."
    },
    {
      image: "https://res.cloudinary.com/de4mrvvtt/image/upload/v1700158968/qabtnuzw4ylljzt061xm.png",
      cat: "Sexual harrasment",
      des: "Non-consensual sexual contact or behavior"
    },
    {
      image: "https://res.cloudinary.com/de4mrvvtt/image/upload/v1700158968/qabtnuzw4ylljzt061xm.png",
      cat: "Theft",
      des: "Taking someone's property without permission or intention to return it"
    },
    {
      image: "https://res.cloudinary.com/de4mrvvtt/image/upload/v1700158968/qabtnuzw4ylljzt061xm.png",
      cat: "Hit N Run",
      des: "Leaving the scene of an accident without stopping or providing aid"
    },

  ]

  return (

    <Box margin="2rem 6.5rem">
      <Typography textAlign="center" variant='h2' sx={{ fontFamily: "Sen", fontSize: "1.75rem", fontWeight: 700 }} m="2rem">
        Choose A Category
      </Typography>
      <Box component="div" sx={{ position: 'relative', width: '100%', p: '20px 0px' }}>
      <Box mt={4} sx={{position:'static'}}>
          <ScrollMenu>
            {
              categories.map((category, index) => (
                <Box
                  key={index}
                  itemId={index}
                  title={index}
                  m="10px 20px"
                >
                  <CategoryCard image={category.image} cat={category.cat} des={category.des} />
                </Box>
              ))
            }
          </ScrollMenu>
        </Box>
      </Box>
    </Box>
  )
}
export default AllCat