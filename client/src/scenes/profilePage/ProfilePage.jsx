import React,{useState, useEffect} from 'react'
import { Box, Divider, Typography } from '@mui/material'
import Navbar from 'components/Navbar'
import { useSelector } from 'react-redux'
import Footer from 'components/Footer'
import { useParams } from 'react-router-dom'

const ProfilePage = () => {
  const { userId } = useParams();
  const [user, setUser] = useState();

  const fetchUser = async () => {
    const response = await fetch(`https://crime-reporting-app-server.vercel.app/users/${userId}`, {
      method: "GET",
    });
    const res = await response.json();
    setUser(res);
  }

  useEffect(()=>{
    fetchUser();
},[userId])

  //console.log(user.pictureUrl.url);
  return (
    <Box>
      <Navbar />
      <Box flexDirection="column" m="1.2rem 8rem" alignItems="center">
        <Divider sx={{ backgroundColor: "#fff" }} />
        <Typography textAlign="center" variant='h1'
          sx={{
            fontFamily: 'Inter',
            fontSize: "9rem",
            fontWeight: 700,
            padding: "0rem 0rem 1rem 0rem"
          }}
        >
          {user?.firstName}
        </Typography>
        <Divider sx={{ backgroundColor: "#fff" }} />

        <Box mt={2} width="100%" height="30rem"><img src={user?.pictureUrl?.url} width="100%" height="100%" style={{ objectFit: "cover" }} /></Box>
        <Typography variant='h1' m="1.5rem 0rem">
          About Me
        </Typography>
        <Typography>
          {user?.desc?.aboutMe || "Rom Rom Bhaiyon!!!   Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat."}
        </Typography>
        <Typography variant='h1' m="1.5rem 0rem">
          Skills
        </Typography>
        <Typography>
          {user?.desc?.skills || "Rom Rom Bhaiyon!!!   Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat."}
        </Typography>
        <Typography variant='h1' m="1.5rem 0rem">
          Experience
        </Typography>
        <Typography>
          {user?.desc?.experience || "Rom Rom Bhaiyon!!!   Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat."}
        </Typography>
        <Typography variant='h1' m="1.5rem 0rem">
          Education
        </Typography>
        <Typography mb={5}>
          {user?.desc?.education || "Rom Rom Bhaiyon!!!   Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat."}
        </Typography>
      </Box>
      <Footer />
    </Box>
  )
}

export default ProfilePage