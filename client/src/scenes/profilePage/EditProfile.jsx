import React, { useState } from 'react'
import { Box, Divider, Typography, TextField, Button } from '@mui/material'
import Navbar from 'components/Navbar'
import { useDispatch, useSelector } from 'react-redux'
import Footer from 'components/Footer'
import { useTheme } from '@emotion/react'
import { setUpdatedUser } from 'state'

const EditProfile = () => {
  const { palette } = useTheme();
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    firstName: user?.firstName,
    lastName: user?.lastName,
    location: user?.location,
    occupation: user?.occupation,
    aboutMe: user?.desc?.aboutMe,
    skills: user?.desc?.skills,
    experience: user?.desc?.experience,
    education: user?.desc?.education
  });
  //console.log(user.pictureUrl.url);

  const profileUpdate = async () => {
    const userData = await fetch(`https://crime-reporting-app-server.vercel.app/users/${user?._id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(formData),
    });
    const updatedUser = await userData.json();
    dispatch(setUpdatedUser({ user: updatedUser }))
    //console.log(loggedIn);
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <Box>
      <Navbar />
      <Box flexDirection="column" m="1.2rem 8rem" alignItems="center" mb="5rem">
        <Box display="flex" flexDirection="row" gap="2rem" alignItems="center">
          <Box mt={2} borderRadius="50%" ><img src={user.pictureUrl.url} style={{ objectFit: "cover", borderRadius: "50%", height: "10rem", width: "10rem" }} /></Box>

          <Divider sx={{ backgroundColor: "#fff", width: "0.1rem", height: "10rem" }} />
          <Typography textAlign="center" variant='h1'
            sx={{
              fontFamily: 'Inter',
              fontSize: "9rem",
              fontWeight: 700,
              padding: "0rem 0rem 1rem 0rem"
            }}
          >
            Edit Profile
          </Typography>
        </Box>
        <Box mt="3rem" display="flex" gap="6rem">
          <Box gap="2rem" display="flex" alignItems="center">
            <Typography variant='h4'>First Name: </Typography>
            <TextField placeholder={formData?.firstName} name='firstName' value={formData?.firstName} onChange={handleInputChange}/>
          </Box>
          <Box gap="2rem" display="flex" alignItems="center">
            <Typography variant='h4'>Last Name: </Typography>
            <TextField placeholder={formData?.lastName} name='lastName' value={formData?.lastName} onChange={handleInputChange}/>
          </Box>
        </Box>

        <Box mt="3rem" display="flex" gap="6rem">
          <Box gap="3.5rem" display="flex" alignItems="center">
            <Typography variant='h4'>Location: </Typography>
            <TextField placeholder={formData?.location} name='location' value={formData?.location} onChange={handleInputChange}/>
          </Box>
          <Box gap="2rem" display="flex" alignItems="center">
            <Typography variant='h4'>Occupation: </Typography>
            <TextField placeholder={formData?.occupation} name='occupation' value={formData?.occupation} onChange={handleInputChange}/>
          </Box>
        </Box>

        <Box gap="3rem" display="flex" alignItems="center" mt="3rem">
          <Typography variant='h4'>About Me: </Typography>
          <TextField placeholder={formData?.aboutMe} name='aboutMe' value={formData?.aboutMe} onChange={handleInputChange} sx={{ width: "40rem" }} minRows="2" multiline={true} />
        </Box>
        <Box gap="5.5rem" display="flex" alignItems="center" mt="3rem">
          <Typography variant='h4'>Skills:     </Typography>
          <TextField placeholder={formData?.skills} name='skills' value={formData?.skills} onChange={handleInputChange} sx={{ width: "40rem" }} minRows="2" multiline={true} />
        </Box>
        <Box gap="2rem" display="flex" alignItems="center" mt="3rem">
          <Typography variant='h4'>Experience: </Typography>
          <TextField placeholder={formData?.experience} name='experience' value={formData?.experience} onChange={handleInputChange} sx={{ width: "40rem" }} minRows="2" multiline={true} />
        </Box>
        <Box gap="2.5rem" display="flex" alignItems="center" mt="3rem">
          <Typography variant='h4'>Education: </Typography>
          <TextField placeholder={formData?.education} name='education' value={formData?.education} onChange={handleInputChange} sx={{ width: "40rem" }} minRows="2" multiline={true} />
        </Box>
        <Box gridColumn="span 4" mt="3rem">
          <Button
            type="submit"
            sx={{
              m: "1rem 0",
              p: "1rem 5rem",
              backgroundColor: palette.primary.main,
              color: palette.background.alt,
              "&:hover": { color: palette.primary.main },
              justifySelf: "center"
            }}
            onClick={profileUpdate}
          >
            Submit
          </Button>
        </Box>
      </Box>
      <Footer />
    </Box>
  )
}

export default EditProfile