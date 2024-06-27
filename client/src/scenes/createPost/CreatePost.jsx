import React, { useState } from 'react'
import Navbar from 'components/Navbar'
import { Box, Button, Typography, useMediaQuery, TextField, useTheme, IconButton, InputAdornment } from '@mui/material'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import { Formik } from 'formik' //form lib
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Dropzone from 'react-dropzone';
import FlexBetween from 'components/FlexBetween';
import MyImage from 'testimg2.jpg'
import ReadMore from 'components/ReadMore';
import Footer from 'components/Footer';
import { setPosts } from 'state';

const CreatePost = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);
  const user = useSelector((state) => state.user);

  const initialValuesCreate = {
    title: "",
    description: "",
    files: [],
    location: "",
    state: "",
    category: ""
  };

  const createPost = async (values, onSubmitProps) => {
    const files = [];
    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('description', values.description);
    formData.append('location', values.location);
    formData.append('state', values.state);
    formData.append('category', values.category);
    formData.append("userId", user._id);
    values.files.forEach((file) => {
      formData.append('files', file); // Use the same field name "files" for all selected files
    });
    const post = await fetch("https://crime-reporting-app-server.vercel.app/posts/",
      {
        method: "POST",
        headers: { Authorization: `Bearer ${token}`},
        body: formData,
      }
    );
    const posts = await post.json();
    dispatch(setPosts({posts:posts}));
    alert("Created post Successfully");
  };

  return (
    <Box>
      <Navbar />
      <Box margin="1rem 5rem">
        <Box display="flex" position="relative" flexDirection="column" alignItems="center">
          <img src={MyImage} width="90%" height="400rem" style={{ objectFit: "cover" }} />
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 70,
              width: "90%",
              height: "100%",
              background: "radial-gradient(80.99% 71.93% at 75.66% 19.72%, rgba(0, 0, 0, 0.00) 0%, rgba(0, 0, 0, 0.60) 100%)",
              filter: "blur(2px)",
            }}
          />
          <Box position="absolute"
            sx={{ top: 0, left: 0 }} ml={isNonMobileScreens ? "7rem" : "1rem"} mt={1}>
            {isNonMobileScreens && (<><Typography color="#fff" mt={10}>
              Be a<span style={{ color: "#FFD050" }}>{" Contributer"}</span> in forming a safe society.
            </Typography>
            </>)}
            <Typography variant='h2' mt={2} width={isNonMobileScreens ? "70%" : "80%"} color="#fff" sx={{
              fontFamily: "Sen",
              fontSize: isNonMobileScreens ? "3.5rem" : "2rem",
              fontStyle: "normal",
              fontWeight: "700",
              lineHeight: isNonMobileScreens ? "4rem" : "3.2rem", /* 114.286% */
              letterSpacing: "-0.125rem"
            }}>
              Create your own article to bring about awareness related to criminal activity
            </Typography>
          </Box>
        </Box>
        <Formik
          onSubmit={createPost}
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
              <Box
                display="grid"
                gap="10px"
                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                sx={{
                  "& > div": { gridColumn: isNonMobileScreens ? undefined : "span 4" }, //this will override inner textfields on smaller screens 
                }}
                margin="2rem 4rem"
              >
                <>
                  <TextField label="Title"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.title}
                    name="title" //align with schema 
                    sx={{ gridColumn: "span 4" }}
                  />
                  <TextField label="Category"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.category}
                    name="category" //align with schema 
                    sx={{ gridColumn: "span 4" }}
                  />
                  <TextField label="Description"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.description}
                    name="description" //align with schema 
                    multiline
                    rows={4}
                    sx={{ gridColumn: "span 4" }}
                  />
                  <TextField label="Location"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.location}
                    name="location" //align with schema 
                    error={Boolean(touched.location) && Boolean(errors.location)}
                    helperText={touched.location && errors.location}
                    sx={{ gridColumn: "span 4" }}
                  />
                  <TextField label="State"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.state}
                    name="state" //align with schema 
                    sx={{ gridColumn: "span 4" }}
                  />
                  <Box
                    gridColumn="span 4"
                    border={`1px solid ${palette.neutral.medium}`}
                    borderRadius="5px"
                    p="1rem"
                  >
                    <Dropzone
                      acceptedFiles=".jpg,.jpeg,.png"
                      multiple={true}
                      maxFiles={5}
                      onDrop={(acceptedFiles) => setFieldValue("files", acceptedFiles)}
                    >
                      {({ getRootProps, getInputProps }) => (
                        <Box {...getRootProps()}
                          border={`2px dashed ${palette.primary.main}`}
                          p="1rem"
                          sx={{ "&:hover": { cursor: "pointer" } }}
                        >
                          <input {...getInputProps()} />
                          {!values.files.length ? (<p>Add Picture Here</p>) : (
                            <FlexBetween>
                              <Box display="flex" gap="1rem">
                                {values.files.map((file) =>
                                  <Typography>{file.name}</Typography>)
                                }
                              </Box>
                              <EditOutlinedIcon />
                            </FlexBetween>

                          )}
                        </Box>
                      )}
                    </Dropzone>
                  </Box>
                </>
                <Box textAlign="center" gridColumn="span 4">
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
                  >
                    Submit
                  </Button>
                </Box>
              </Box>
            </form>
          }
        </Formik>
      </Box>
      <Footer />
    </Box>
  )
}



/*const Form = () => {
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobileScreens = useMediaQuery("(min-width:600px)");
  const isLogin = pageType === "login";
  const isRegister = pageType === "register";

  const register = async (values, onSubmitProps) => {
    //this allow us to send form info with image
    const formData = new FormData();
    for (let value in values) {
      formData.append(value, values[value])
    }
    formData.append("picturePath", values.picture.name);

    const savedUserResponse = await fetch("http://localhost:3001/auth/register",
      {
        method: "POST",
        body: formData
      }
    );
    const savedUser = await savedUserResponse.json();
    onSubmitProps.resetForm();

    if (savedUser) {
      setPageType("login");
    }

  };

  const login = async (values, onSubmitProps) => {

    const loggedInUserResponse = await fetch("http://localhost:3001/auth/login",
      {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(values),
      }
    );
    const loggedIn = await loggedInUserResponse.json();
    onSubmitProps.resetForm();
    if (loggedIn) {
      dispatch(
        setLogin({
          user: loggedIn.user,
          token: loggedIn.token,
        })
      );
      navigate("/home")
    }
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    if (isLogin) await login(values, onSubmitProps);
    if (isRegister) await register(values, onSubmitProps);
  }

  return (
    <Formik

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
      }) => (
        <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gap="10px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: isNonMobileScreens ? undefined : "span 4" }, //this will override inner textfields on smaller screens 
            }}
          >
            {isRegister && (
              <>
                <TextField label="First Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.firstName}
                  name="firstName" //align with schema 
                  error={Boolean(touched.firstName) && Boolean(errors.firstName)}
                  helperText={touched.firstName && errors.firstName}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField label="Last Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.lastName}
                  name="lastName" //align with schema 
                  error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                  helperText={touched.lastName && errors.lastName}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField label="Location"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.location}
                  name="location" //align with schema 
                  error={Boolean(touched.location) && Boolean(errors.location)}
                  helperText={touched.location && errors.location}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField label="Occupation"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.occupation}
                  name="occupation" //align with schema 
                  error={Boolean(touched.occupation) && Boolean(errors.occupation)}
                  helperText={touched.occupation && errors.occupation}
                  sx={{ gridColumn: "span 4" }}
                />
                <Box
                  gridColumn="span 4"
                  border={`1px solid ${palette.neutral.medium}`}
                  borderRadius="5px"
                  p="1rem"
                >
                  <Dropzone
                    acceptedFiles=".jpg,.jpeg,.png"
                    multiple={false}
                    onDrop={(acceptedFiles) => setFieldValue("picture", acceptedFiles[0])}
                  >
                    {({ getRootProps, getInputProps }) => (
                      <Box {...getRootProps()}
                        border={`2px dashed ${palette.primary.main}`}
                        p="1rem"
                        sx={{ "&:hover": { cursor: "pointer" } }}
                      >
                        <input {...getInputProps()} />
                        {!values.picture ? (<p>Add Picture Here</p>) : (
                          <FlexBetween>
                            <Typography>{values.picture.name}</Typography>
                            <EditOutlinedIcon />
                          </FlexBetween>
                        )}
                      </Box>
                    )}
                  </Dropzone>
                </Box>
              </>
            )}
            <TextField label="Email"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              name="email" //align with schema 
              error={Boolean(touched.email) && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              sx={{ gridColumn: "span 4" }}
              autocomplete="on"
            />
            <TextField label="Password"
              type={showPassword ? 'text' : 'password'}
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
              name="password" //align with schema 
              error={Boolean(touched.password) && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              sx={{ gridColumn: "span 4" }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end" sx={{ mr: '0.1px' }}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          {/*Buttons}
          <Box>
            <Button
              fullWidth
              type="submit"
              sx={{
                m: "1rem 0",
                p: "1rem",
                backgroundColor: palette.primary.main,
                color: palette.background.alt,
                "&:hover": { color: palette.primary.main },
              }}
            >
              {isLogin ? "LOGIN" : "REGISTER"}
            </Button>
            <Typography
              onClick={() => {
                setPageType(isLogin ? "register" : "login");
                resetForm();
              }}
              sx={{
                textDecoration: "underline",
                color: palette.primary.main,
                "&:hover": {
                  cursor: "pointer",
                  color: palette.primary.dark,
                }
              }}
            >
              {isLogin ? "Don't have an account? Sign up here. " : "Already have an account? Login here. "}
            </Typography>
          </Box>
        </form>
      )}
    </Formik>
  )
}*/

export default CreatePost;