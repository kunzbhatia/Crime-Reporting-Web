import React from 'react'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const ReadMore = ({text="Read More", _id, nav}) => {
  const navigate = useNavigate();
  return (
    <Button onClick={()=>navigate(nav)}
    sx={{
        backgroundColor:"#FFD050",
        padding:"0.8rem 3rem",
        borderRadius:0,
        color: "#000000",
        marginTop: "1.2rem",

        "&:hover": {
            backgroundColor:"#FFB000"
        }
    }}
    > {`${text} > `} </Button>
  )
}

export default ReadMore