import React from 'react'
import Navbar from 'components/Navbar'
import { Box, Typography, Divider, useMediaQuery, TextField, useTheme, Button} from '@mui/material'
import { Formik } from 'formik' //form lib
import { useSelector } from 'react-redux'

import Footer from 'components/Footer'

const ContactUs = () => {
  const mode = useSelector((state)=>state.mode);
  const { palette } = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const initialValuesCreate = {
    fullName: "",
    message: "",
    files: [],
    queryRelated: "",
    state: "",
    email: ""
  };
  return (
    <div>
      <Navbar />
      <Box display="flex" flexDirection="column" alignItems="center" mt={8} mb={14}>
        <Typography variant='h5' sx={{ fontFamily: 'Inter', fontWeight: 900, textTransform: 'uppercase' }}> Contact Us</Typography>
        <Typography variant='h1' m="1.5rem 0rem" sx={{ fontFamily: 'Sen', fontWeight: 700 }}>Let’s Start a Conversation</Typography>
        <Typography variant='body2' width="40%" textAlign="center" mt="1rem" sx={{ fontFamily: 'Inter', fontWeight: 400 }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim.</Typography>

        <Box mt="3rem" sx={{ backgroundColor: mode === 'dark'? "#592EA9" : "#FFD050" }} height="15rem" width="50%" display="flex" flexDirection="row" padding="3rem" gap="3rem">
          <Box width="50%">
              <Typography>Working hours</Typography>
              <Divider sx={{marginTop:"1rem", marginBottom:"1rem"}}/>
              <Typography sx={{fontFamily: "Sen",fontSize: "1.25rem",fontStyle: "normal",fontWeight: 700,lineHeight: "2rem"}}>Monday to Friday</Typography>
              <Typography sx={{fontFamily: "Sen",fontSize: "1.25rem",fontStyle: "normal",fontWeight: 700,lineHeight: "2rem"}}>9:00 AM to 8:00 PM</Typography>
              <Typography mt="0.6rem"  sx={{fontFamily: "Inter",fontSize: "0.8rem",fontStyle: "normal",fontWeight: 400,lineHeight: "1.75rem"}}>Our Support team is available 24x7</Typography>
          </Box>
          <Box width="50%">
              <Typography>ContactUs</Typography>
              <Divider sx={{marginTop:"1rem", marginBottom:"1rem"}}/>
              <Typography sx={{fontFamily: "Sen",fontSize: "1.25rem",fontStyle: "normal",fontWeight: 700,lineHeight: "2rem"}}>+91 70060 61747</Typography>
              <Typography mt="0.2rem"  sx={{fontFamily: "Inter",fontSize: "0.8rem",fontStyle: "normal",fontWeight: 400,lineHeight: "1.75rem"}}>deepanshuaggarwal023@gmail.com</Typography>
          </Box>
        </Box>
      </Box>
      <Formik
          onSubmit={()=>(0)}
          initialValues={initialValuesCreate}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
            setFieldValue,
            resetForm
          }) =>

            <form onSubmit={handleSubmit}>
            <Box display="flex" alignItems="center" justifyContent="center">
              <Box
                display="grid"
                gap="15px"
                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                sx={{
                  "& > div": { gridColumn: isNonMobileScreens ? undefined : "span 4" }, //this will override inner textfields on smaller screens 
                }}
                margin="0rem 4rem 4rem 4rem"
                width="60%"
               
              >
                <>
                  <TextField label="Full Name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.fullName}
                    name="fullName" //align with schema 
                    sx={{ gridColumn: "span 4" }}
                  />
                  <TextField label="Your Email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.email}
                    name="email" //align with schema 
                    sx={{ gridColumn: "span 4" }}
                  />
                  <TextField label="Query Related"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.queryRelated}
                    name="queryRelated" //align with schema 
                    error={Boolean(touched.queryRelated) && Boolean(errors.queryRelated)}
                    helperText={touched.queryRelated && errors.queryRelated}
                    sx={{ gridColumn: "span 4" }}
                  />
                  <TextField label="Message"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.message}
                    name="message" //align with schema 
                    multiline
                    rows={4}
                    sx={{ gridColumn: "span 4" }}
                  />
                </>
                <Box textAlign="center" gridColumn="span 4">
                  <Button
                    type="submit"
                    fullWidth
                    sx={{
                      m: "1rem 0",
                      p: "1rem 5rem",
                      backgroundColor: palette.primary.main,
                      color: palette.background.alt,
                      "&:hover": { color: palette.primary.main },
                      justifySelf: "center"
                    }}
                  >
                    Send Message
                  </Button>
                </Box>
              </Box>
              </Box>
            </form>
          }
        </Formik>
      <Footer/>
    </div>
  )
}

export default ContactUs