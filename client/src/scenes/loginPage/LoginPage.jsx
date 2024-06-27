import React from 'react'
import { Stack, Typography, Box, useTheme, useMediaQuery, Button } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { setLogin, setPosts } from 'state'
import Navbar from 'components/Navbar'
import './login.css'
import Dropzone from 'react-dropzone'
import FlexBetween from 'components/FlexBetween'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'

const LoginPage = () => {

    const { palette } = useTheme();
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isLogin, setIslogin] = useState(true);

    // Step 1: Define state variables for form input values
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        location: '',
        occupation: '',
        email: '',
        password: '',
        files: ''
    });

    // Step 2: Event handlers to update form input values
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleFileChange = (files) => {
        setFormData({
          ...formData,
          files: files[0],
        });
      };

    const handleRegister = async (event) => {
        const registerData = new FormData();
        for (const key in formData) {
            registerData.append(key,formData[key]);
        }

        event.preventDefault();
        const userData = await fetch("https://crime-reporting-app-server.vercel.app/auth/register", {
            method: "POST",
            body: registerData,
        });
        setFormData({
            firstName: '',
            lastName: '',
            location: '',
            occupation: '',
            email: '',
            password: '',
            files: ''
        });
        setIslogin(true);
    }

    // Step 3: Event handler for form submit
    const handleSubmit = async (event) => {
        event.preventDefault();
        const userData = await fetch("https://crime-reporting-app-server.vercel.app/auth/login", {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(formData),
        });

        const loggedIn = await userData.json();
        if (loggedIn) {
            dispatch(
                setLogin({
                    user: loggedIn.user,
                    token: loggedIn.token,
                })
            );
        }

        const articles = await fetch("https://crime-reporting-app-server.vercel.app/posts", {
            method: "GET",
            headers: { "Content-type": "application/json" },
        });
        const posts = await articles.json();
        if (posts) {
            dispatch(setPosts({ posts }));
            navigate("/")
        }
    };

    return (
        <Stack direction="column" position='relative'>
            <Navbar />
            <Box>{isLogin ? (
                <div className="login-box">
                    <p>Login</p>
                    <form id="login-form">
                        <div className="user-box">
                            <input required={true} name="email" type="text" value={formData.email} onChange={handleInputChange} />
                            <label>Email</label>
                        </div>
                        <div className="user-box">
                            <input required={true} name="password" type="password" value={formData.password} onChange={handleInputChange} />
                            <label>Password</label>
                        </div>
                        <a onClick={handleSubmit}>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            Submit
                        </a>
                    </form>
                    <p>Don't have an account? <a className="a2" onClick={() => setIslogin(!isLogin)}>Sign up!</a></p>
                </div>
            ) : (
                <div className="login-box">
                    <p>Sign Up</p>
                    <form id="login-form">
                        <Box display="flex" gap="2rem">
                            <div className="user-box">
                                <input required={true} name="firstName" type="text" value={formData.firstName} onChange={handleInputChange} />
                                <label>First Name</label>
                            </div>
                            <div className="user-box">
                                <input required={true} name="lastName" type="text" value={formData.lastName} onChange={handleInputChange} />
                                <label>Last Name</label>
                            </div>
                        </Box>
                        <div className="user-box">
                            <input required={true} name="location" type="text" value={formData.location} onChange={handleInputChange} />
                            <label>Location</label>
                        </div>
                        <div className="user-box">
                            <input required={true} name="occupation" type="text" value={formData.occupation} onChange={handleInputChange} />
                            <label>Occupation</label>
                        </div>

                        <div className="user-box">
                            <input required={true} name="email" type="text" value={formData.email} onChange={handleInputChange} />
                            <label>Email</label>
                        </div>
                        <div className="user-box">
                            <input required={true} name="password" type="password" value={formData.password} onChange={handleInputChange} />
                            <label>Password</label>
                        </div>
                        <Dropzone
                            acceptedFiles=".jpg,.jpeg,.png"
                            multiple={false} // Allow only one file
                            onDrop={(acceptedFiles) => handleFileChange(acceptedFiles)}
                        >
                            {({ getRootProps, getInputProps }) => (
                                <Box
                                    {...getRootProps()}
                                    border={`2px dashed`}
                                    p="1rem"
                                    sx={{ "&:hover": { cursor: "pointer" } }}
                                >
                                    <input {...getInputProps()} />
                                    {!formData.files ? (
                                        <p>Add Picture Here</p>
                                    ) : (
                                        <FlexBetween>
                                            <Box display="flex" justifyContent="center" textAlign="center" alignItems="center">
                                                <Typography textAlign="center" pt="1rem">{formData.files?.name}</Typography>
                                            </Box>
                                            <EditOutlinedIcon />
                                        </FlexBetween>
                                    )}
                                </Box>
                            )}
                        </Dropzone>

                        <a onClick={handleRegister}>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            Register
                        </a>
                    </form>
                    <p>Don't have an account? <a className="a2" onClick={() => setIslogin(!isLogin)}>Sign in!</a></p>
                </div>
            )}
            </Box>
        </Stack>
    )
}

export default LoginPage