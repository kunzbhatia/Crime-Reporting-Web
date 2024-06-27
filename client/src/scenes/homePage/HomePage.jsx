import React, { useEffect, useState } from 'react'
import Navbar from 'components/Navbar'
import { Box, Divider, Stack, Typography, useMediaQuery } from '@mui/material'
import ReadMore from 'components/ReadMore'
import MyImage from '../../testimg2.jpg'
import AllCrimeCard from './AllCrimeCard'
import { useSelector, useDispatch } from 'react-redux'
import AllCat from './AllCat'
import Info from "../../Info.png"
import AuthorCard from 'components/AuthorCard'
import Footer from 'components/Footer'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'
import { setPosts } from 'state';

const HomePage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const isAuth = Boolean(useSelector((state) => state.token));
  const posts = useSelector((state) => state.posts);
  const mode = useSelector(state => state.mode);
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const featuredPosts = posts?.slice(0, 4);
  const [topAuthors, setTopAuthors] = useState([]);

  const locationUpdate = async (latitude, longitude) => {
    if (latitude && longitude) {
      const userData = await fetch(`https://crime-reporting-app-server.vercel.app/users/${user?._id}`, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ longitude, latitude }),
      });
      const loggedIn = await userData.json();
      //console.log(loggedIn);
    }
  }

const getPosts = async() => {
  const articles = await fetch("https://crime-reporting-app-server.vercel.app/posts", {
            method: "GET",
            headers: { "Content-type": "application/json" },
        });
        const posts = await articles.json();
        if (posts) {
            dispatch(setPosts({ posts }));
            navigate("/")
        }
      }

  const getAuthors = async () => {
    const authorData = await fetch(`https://crime-reporting-app-server.vercel.app/posts/topAuthors`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` }
    });
    const authors = await authorData.json();
    setTopAuthors(authors);
    //console.log(authors);
  }
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      locationUpdate(position?.coords?.latitude, position?.coords?.longitude);
    })
    getAuthors();
    getPosts();
  }, [])


  return (
    <Stack direction="column">
      <Box>
        <Navbar />
      </Box>
      {/*Top Section*/}

      <Box position="relative">
        <Box sx={{ position: "relative" }}>
          <img src={posts[1]?.picturePath[0]?.url || MyImage} style={{ objectFit: "cover" }} alt='userImage' width="100%" height={"500rem"} />
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background: "radial-gradient(80.99% 71.93% at 75.66% 19.72%, rgba(0, 0, 0, 0.00) 0%, rgba(0, 0, 0, 0.60) 100%)",
              filter: "blur(2px)",
            }}
          >
          </Box>
          <Box position="absolute"
            sx={{ top: 0, left: 0 }} ml={isNonMobileScreens ? "5rem" : "1rem"} mt={isNonMobileScreens ? "4rem" : "4rem"}>
            <Typography variant='h5' fontFamily="Inter" textTransform="uppercase" fontWeight={500} color="#fff">Latest Reports</Typography>
            <Typography variant='h2' mt={2} width={isNonMobileScreens ? "60%" : "80%"} color="#fff" sx={{
              fontFamily: "Sen",
              fontSize: isNonMobileScreens ? "3.5rem" : "2rem",
              fontStyle: "normal",
              fontWeight: "700",
              lineHeight: isNonMobileScreens ? "4rem" : "3.2rem", /* 114.286% */
              letterSpacing: "-0.125rem"
            }}>
              {posts[1]?.title}
            </Typography>
            {isNonMobileScreens && (<><Typography color="#fff" mt={2}>
              By <span style={{ color: "#FFD050" ,cursor:"pointer" }} onClick={()=>( isAuth ? navigate(`/profile/${posts[2]?.userId}`) : alert("Login/Signup to Checkout writer's profile"))}>{`${posts[1]?.firstName} ${posts[1]?.lastName}` || "James West"}</span> | {moment.unix((new Date(posts[1]?.createdAt)) / 1000).format("DD/MM/YYYY")}
            </Typography>
              <Typography width="50%" color="#fff" mt={2}>
                {posts[1]?.description.slice(0, 250) + "...."}
              </Typography></>)}
            <ReadMore nav={`/article/${posts[1]?._id}`} />
          </Box>
        </Box>

      </Box>

      {/*Featured & Crime  Section*/}
      <Stack direction={isNonMobileScreens ? "row" : "column"} padding="3rem 6.5rem" gap="3rem">
        <Box width="60%">
          <Typography sx={{
            fontFamily: "Sen", fontWeight: 700, fontSize: "1.75rem"
          }}>
            Featured Post
          </Typography>
          <Box padding="1.2rem">
            <img src={posts[2]?.picturePath[0]?.url || MyImage} style={{ objectFit: "cover", cursor: "pointer", width: "40.8125rem", height: "22rem" }} alt='userImage' />
            <Typography mt={2}>
              By <span style={{ color: mode === "dark" ? "#FFD050" : "#592EA9",cursor:"pointer" }} onClick={()=>( isAuth ? navigate(`/profile/${posts[2]?.userId}`) : alert("Login/Signup to Checkout writer's profile"))}>{`${posts[2]?.firstName} ${posts[2]?.lastName}` || "James West"}</span> | {moment.unix((new Date(posts[2]?.createdAt)) / 1000).format("DD/MM/YYYY")}
            </Typography>
            <Typography width="90%" mt={2} mb={2} sx={{ fontFamily: "Sen", fontWeight: 600, lineHeight: "2.5rem", fontSize: "1.75rem", fontStyle: "normal" }}>
              {posts[2]?.title || "A 13-year-old girl was allegedly raped iMumbai Crime: 40-Year-Old Cleaner Slits Throat Of Trainee Air Hostess In Andheri After She 'Yelled' At Him"}
            </Typography>
            <ReadMore nav={`/article/${posts[2]?._id}`} />
          </Box>
        </Box>
        <Box width="30%">
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
            <Typography sx={{
              fontFamily: "Sen", fontWeight: 700, fontSize: "1.75rem"
            }}>
              All Crime Articles
            </Typography>
            <Typography onClick={() => navigate("/articles")} sx={{ "&:hover": { cursor: "pointer", color: "#FFD050" } }} >
              View All
            </Typography>
          </Box>{
            featuredPosts.map((post) => (
              <AllCrimeCard _id={post?._id}
                author={`${post?.firstName} ${post?.lastName}`}
                title={post?.title}
                time={moment.unix((new Date(post?.createdAt)) / 1000).format("DD/MM/YYYY")} />
            ))
          }
        </Box>
      </Stack>

      {/*category*/}
      <AllCat />



      {/* About Us Section*/}
      <Box position="relative" margin="7rem 6.5rem" sx={{ width: "77rem", height: "25rem" }}>
        <Box position="absolute" sx={{ top: 0, right: 0, backgroundColor: "#FFD050", width: "60rem", height: "5rem" }}>
        </Box>
        <Box position="absolute" sx={{ top: 0, right: 0, backgroundColor: "#592EA9", width: "20rem", height: "5rem", zIndex: 1 }}></Box>
        <Box position="absolute" sx={{
          backgroundColor: mode === "dark" ? "#4C4C4C" : "#F4F0F8",
          width: "100%",
          height: "100%",
          zIndex: 3,
          marginTop: "1.5rem", right: 0
        }}>
          <Box mt="6rem" marginLeft="5rem" mr="5rem"
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: "5rem"
            }}>
            <Box display="flex" flexDirection="column" gap="1.2rem" width="50%">
              <Typography sx={{
                fontWeight: 600, fontSize: "1rem", fontFamily: "Inter", lineHeight: "1.25rem",
                letterSpacing: "0.1875rem", textTransform: "uppercase"
              }}>
                About US
              </Typography>
              <Typography sx={{ fontWeight: 700, fontSize: "1.5rem" }}>
                We are a community of content writers who share their learnings
              </Typography>
              <Typography sx={{ fontWeight: 300, fontSize: "1rem", fontFamily: "Inter" }}>
                At SecureSpot, we are committed to fostering safer neighborhoods by providing a platform for individuals to report crimes and suspicious activities. Our mission is to empower you to take an active role in promoting public safety.
              </Typography>
            </Box>
            <Box display="flex" flexDirection="column" gap="1.2rem" width="40%">
              <Typography sx={{
                fontWeight: 600, fontSize: "1rem", fontFamily: "Inter", lineHeight: "1.25rem",
                letterSpacing: "0.1875rem", textTransform: "uppercase"
              }}>
                Our mision
              </Typography>
              <Typography sx={{ fontWeight: 700, fontSize: "1.2rem" }}>
                Creating valuable content for creatives all around the world
              </Typography>
              <p styles={{ fontWeight: 400, fontSize: "1rem", lineHeight: "1.75rem", fontFamily: "Inter" }}>
                Our mission is to empower you to take an active role in promoting public safety. Together, we can make our communities more secure and resilient. Join us in building a safer future for all.
              </p>
            </Box>
          </Box>
        </Box>
      </Box>

      {/*Info*/}
      <Box margin="3rem 6.5rem" mr={23} position="relative">
        <Box sx={{ width: "50rem", height: "30rem" }} display="flex">
          <img src={Info} styles={{ objectFit: "fill" }} width="100%" height="100%" />
        </Box>
        <Box position="absolute" sx={{ width: "35rem", height: "24rem", bottom: 0, right: 0, padding: "4.5rem" }} backgroundColor={mode === "dark" ? "#000" : "#FFF"}>
          <Typography sx={{ fontFamily: "Inter", textTransform: "uppercase", fontSize: ".7rem", fontWeight: 600, letterSpacing: "0.1875rem" }}>Why we Started</Typography>
          <Typography variant='h1' mt="1rem" sx={{ fontFamily: "Sen", fontSize: "2rem", fontWeight: 700, letterSpacing: "-0.125rem" }}>It started out as a simple idea and evolved into our passion</Typography>
          <Typography mt=".8rem" mb="1rem">The primary objective is to enhance the safety of the community by providing a means for residents to report criminal activities, suspicious behavior, or incidents promptly. This enables law enforcement agencies to respond quickly and address potential threats.</Typography>
          <ReadMore text="Join Us" nav="/login" />
        </Box>
      </Box>

      {/*Author Lists*/}
      <Box margin="0rem 3rem 7rem 3rem" display="flex" flexDirection="column">
        <Typography textAlign="center" variant='h2' sx={{ padding: "2rem", fontFamily: "Sen", fontWeight: 700, fontSize: "1.75rem" }}
        > List of Authors</Typography>
        <Box alignItems="center" justifyContent="center" display="flex" gap="4rem">
          {topAuthors.length < 3 && (
            <>
              <AuthorCard />
              <AuthorCard />
            </>
          )
          }
          {
            topAuthors.length && (topAuthors.map((author) => (
              <AuthorCard _id={author?._id}
                name={author?.name}
                number={author?.postCount}
                image={author?.image}
              />
            )))
          }
        </Box>
      </Box>

      {/*Testimonial */}
      <Box backgroundColor="#FBF6EA" height="30rem" margin={15} mt={0} display="flex" flexDirection="row" gap="5rem" color="#000" padding="5rem">
        <Box width="30%" display="flex" flexDirection="column" gap="1rem" pr="3rem">
          <Typography variant='cap1' sx={{ fontFamily: "Inter", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1875rem" }}>TESTIMONIALS</Typography>
          <Typography variant='h2' sx={{ fontFamily: "Sen", fontWeight: 700, letterSpacing: "-0.125rem" }}>What people say about our blog</Typography>
          <Typography variant='body1' sx={{ fontFamily: "Inter", fontWeight: 400, lineHeight: "1.5rem" }}></Typography>
        </Box>
        <Divider sx={{ backgroundColor: "#000", width: "0.05rem" }} />
        <Box width="70%" p="1rem 5rem" >
          <Typography variant='h4' sx={{ fontFamily: "Sen", fontWeight: 700, letterHeight: "1.5rem" }}>"Thank you for providing this platform to keep our community safe!           
"Grateful for a quick response from the police. This reporting system works!"</Typography>
          <Box display="flex" gap={2} alignItems="center" mt={15}>
            <img src={MyImage} width={50} height={50} style={{ borderRadius: "50%" }} />
            <Box>
              <Typography variant='h5' sx={{ fontFamily: "Sen", fontWeight: 700 }}>Deepanshu</Typography>
              <Typography variant='body1'>Mumbai,Maharashtra</Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      <Footer />
    </Stack>
  )
}

export default HomePage