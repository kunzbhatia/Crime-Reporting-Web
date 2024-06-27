import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Stack, Typography, Box, Divider, useTheme, useMediaQuery, Button, InputBase, IconButton, Select, MenuItem, FormControl } from '@mui/material'
import { Search, DarkMode, Menu, LightMode, Notifications, Close } from '@mui/icons-material'
import FlexBetween from './FlexBetween'
import { useNavigate } from 'react-router-dom'
import { setMode, setLogout } from 'state'
import DeleteButton from './DeleteButton';
import NotificationCard from './NotificationCard'

const Navbar = () => {
    const isAuth = Boolean(useSelector((state) => state.token));
    const { palette } = useTheme();
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
    const neutralLight = palette.neutral.light;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const fullName = `${user?.firstName} ${user?.lastName}`;
    const token = useSelector((state) => state.token)
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
    const notifications = user?.notification;
    const [searchValue, setSearchValue] = useState('');
    const handleInputChange = (event) => {
        setSearchValue(event.target.value); // Update the state with the input value
    };

    const handleDeleteUser = async () => {
        const response = await fetch(`https://crime-reporting-app-server.vercel.app/users/${user._id}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` }
        });
        dispatch(setLogout());
        navigate("/login");
    }

    return (
        <Box position='flex'>
            <Box width="100%"
                p="1rem 3%" textAlign="center" display="flex"
                justifyContent="space-between" position="sticky" top="0"
            >
                <Box display="flex" gap="2rem" alignItems="center">
                    <Typography fontWeight="bold" fontSize="32px" color={palette.mode === "dark" ? "#fff" : "black"} position='relative' onClick={() => navigate("/")}
                        sx={{
                            "&:hover": {
                                color: palette.primary.dark,
                                cursor: "pointer"
                            }
                        }}
                    >
                        <div>Secure<span style={{ color: "red", fontSize: "1.2rem" }}>Spot</span></div>
                    </Typography>
                    {isNonMobileScreens && (
                        <FlexBetween backgroundColor={neutralLight} borderRadius="9px" gap="3rem" padding="0.1rem 1rem" height="2.45rem" >
                            <InputBase placeholder='Search....' value={searchValue} onChange={handleInputChange}/>
                            <IconButton onClick={()=>(navigate(`/search/${searchValue}`))}>
                                <Search/>
                            </IconButton>
                        </FlexBetween>
                    )}
                </Box>


                {isNonMobileScreens ? (
                    <FlexBetween gap="1rem">
                        <IconButton onClick={() => dispatch(setMode())}>
                            {palette.mode === "dark" ? (
                                <DarkMode sx={{ fontSize: "25px" }} />
                            ) : (
                                <LightMode sx={{ color: palette.neutral.dark, fontSize: "25px" }} />
                            )}
                        </IconButton>
                        <Box m={0} position="relative">
                        <IconButton onClick={() => isAuth ? setIsNotificationOpen(!isNotificationOpen) : alert("Login to get Notifications")}>
                            <Notifications sx={{ fontSize: "25px" }} />
                        </IconButton>
                        {notifications?.length>0 && <Box>
                            <Typography variant="h6" sx={{ position: "absolute", top: "-5px", right: "0px", backgroundColor: "red", color: "#fff", borderRadius: "50%", width: "20px", height: "21px", textAlign: "center"}}>{notifications?.length}</Typography>
                        </Box>}
                        </Box>
                        <Typography variant='h5' margin={1} sx={{
                            "&:hover": {
                                cursor: "pointer"
                            }
                        }} onClick={()=>navigate("/articles")}>
                            Crime
                        </Typography>
                        <Typography variant='h5' margin={1} sx={{
                            "&:hover": {
                                cursor: "pointer"
                            }
                        }}
                            onClick={isAuth ? () => navigate("/create") : () => alert("Login to create post.")}>
                            Report Crime
                        </Typography>
                        {isAuth ? (<FormControl variant='standard' value={fullName}>
                            <Select
                                value={fullName}
                                sx={{
                                    backgroundColor: neutralLight,
                                    width: "200px",
                                    borderRadius: "0.25rem",
                                    p: "0.25rem 1rem",
                                    "& .MuiSvgIcon-root": {
                                        pr: "0.25rem",
                                        width: "3rem"
                                    },
                                    "& .MuiSelect-select:focus": {
                                        backgroundColor: neutralLight
                                    }
                                }}
                                input={<InputBase />}
                            >
                                <MenuItem value={fullName}>
                                    <Typography>{fullName}</Typography>
                                </MenuItem>
                                <MenuItem onClick={()=>navigate(`/analysis`)}>
                                    <Typography>Crime Analysis</Typography>
                                </MenuItem>
                                <MenuItem onClick={()=>navigate(`/profile/${user._id}`)}>
                                    <Typography>User Profile</Typography>
                                </MenuItem>
                                <MenuItem onClick={()=>navigate(`/editProfile`)}>
                                    <Typography>Edit Profile</Typography>
                                </MenuItem>
                                <DeleteButton onDelete={handleDeleteUser} />
                                <MenuItem onClick={() => dispatch(setLogout())}>
                                    Log Out
                                </MenuItem>
                            </Select>
                        </FormControl>
                        ) : (
                            <Button onClick={isAuth ? () => {dispatch(setLogout())} : () => navigate("/login")}
                                sx={{
                                    backgroundColor: "#FBF6EA",
                                    borderRadius: "2rem",
                                    color: "black",
                                    padding: ".5rem 3rem",
                                    "&:hover": {
                                        color: palette.primary.dark
                                    }
                                }}
                            >
                                Login
                            </Button>)}

                    </FlexBetween>
                ) : (
                    <IconButton onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}>
                        <Menu />
                    </IconButton>
                )}

            </Box>
            {isNotificationOpen && (<Box
                position="fixed"
                right="0"
                bottom="0"
                height="100%"
                zIndex="10"
                minWidth="350px"
                maxWidth="400px"
                backgroundColor={palette.background.alt}
                p="0.6rem 1rem"
            >
                <Box display="flex" justifyContent="space-between" mt={2} pb={2} alignItems="center">
                    <Typography fontSize="20px">
                        Notifications
                    </Typography>
                    <IconButton onClick={() => setIsNotificationOpen(!isNotificationOpen)}>
                        <Close />
                    </IconButton>
                </Box>
                <Divider />
                <Box mt={3}>
                    {
                        notifications?.length > 0 ? notifications.map((notification) => (
                            <NotificationCard _id={notification?.postId} notificationId={notification?._id} title={notification?.title} image={notification?.imgUrl} author={notification?.author} />
                        )) : (<Typography>No new updates</Typography>)
                    }
                </Box>
            </Box>)}
            {!isNonMobileScreens && isMobileMenuToggled && (<Box
                position="fixed"
                right="0"
                bottom="0"
                height="100%"
                zIndex="7"
                maxWidth="300px"
                minWidth="200px"
                backgroundColor={palette.background.alt}
                p="0.6rem 1rem"
            >
                <Box display="flex" justifyContent="space-between" mt={2} pb={2} alignItems="center">
                    <Typography fontSize="20px">
                        Menu
                    </Typography>
                    <IconButton onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}>
                        <Close />
                    </IconButton>
                </Box>
                <Divider />
                <FlexBetween display="flex" flexDirection="column" justifyContent="center" alignItems="center" gap="2rem" mt={3}>
                    <IconButton onClick={() => dispatch(setMode())}>
                        {palette.mode === "dark" ? (
                            <DarkMode sx={{ fontSize: "25px" }} />
                        ) : (
                            <LightMode sx={{ color: palette.neutral.dark, fontSize: "25px" }} />
                        )}
                    </IconButton>
                    <IconButton onClick={() => setIsNotificationOpen(!isNotificationOpen)}>
                        <Notifications sx={{ fontSize: "25px" }} />
                    </IconButton>
                    <Typography variant='h5' margin={1} sx={{
                        "&:hover": {
                            cursor: "pointer"
                        }
                    }}>
                        Crime
                    </Typography>
                    <Typography variant='h5' margin={1} sx={{
                        "&:hover": {
                            cursor: "pointer"
                        }
                    }}
                        onClick={isAuth ? () => navigate("/create") : () => alert("Login to create post.")}>
                        Report Crime
                    </Typography>
                    <Button onClick={isAuth ? () => dispatch(setLogout()) : () => navigate("/login")}
                        sx={{
                            backgroundColor: "#FBF6EA",
                            borderRadius: "2rem",
                            color: "black",
                            padding: ".5rem 3rem",
                            "&:hover": {
                                color: palette.primary.dark
                            }
                        }}
                    >
                        {isAuth ? "Logout" : "Login"}
                    </Button>
                </FlexBetween>

            </Box>)}

        </Box>
    )
}

export default Navbar