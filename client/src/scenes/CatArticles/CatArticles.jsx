import React, { useState, useEffect } from 'react'
import Navbar from 'components/Navbar'
import { Box, Typography, Pagination, Stack } from '@mui/material'
import MyImage from "testimg2.jpg"
import ReadMore from 'components/ReadMore'
import CrimeCard from 'scenes/crimeArticles/CrimeCard'
import Footer from 'components/Footer'
import AllCat from 'scenes/homePage/AllCat'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import moment from 'moment'

const CatArticles = () => {
    const { cat } = useParams();
    const [post, setPost] = useState([]);
    const token = useSelector(state=>state.token);

    const fetchCatPosts = async()=>{
        const response = await fetch(`https://crime-reporting-app-server.vercel.app/posts/category/${cat}`, {
            method: "GET",
            headers:{ Authorization: `Bearer ${token}`},
        });
        const res = await response.json();
        setPost(res);
    }


    useEffect(()=>{
        fetchCatPosts();
    },[cat,token]) //eslint-disable

    

    const [currentPage, setCurrentPage] = useState(1);
    const articlesPerPage = 6;

    if(post.length <= 0)
        return "No Crime Found of such Category"

    const indexOfLastArticle = currentPage * articlesPerPage;
    const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
    const currentArticles = post.slice(indexOfFirstArticle, indexOfLastArticle);

    const paginate = (e, value) => {
        setCurrentPage(value);
        window.scrollTo({ top: 600, behavior: "smooth" });
    }

    return (
        <Box>
            <Navbar />
            <Box display="flex" justifyContent="space-between" sx={{ background: "rgba(76, 76, 76, 0.54)", width: "100%", height: "30rem" }}>
                <Box padding="5rem 5rem" display="flex" flexDirection="column" gap=".7rem" width="50%">
                    <Typography sx={{ fontFamily: "Inter", fontSize: "1rem", fontWeight: 500, letterSpacing: "0.1875rem", lineHeight: "1.25rem" }}> Featured Article</Typography>
                    <Typography variant='h1' sx={{ fontFamily: "Sen", fontSize: "2rem", fontWeight: 700, letterSpacing: "-0.125rem", lineHeight: "3rem" }}> {currentArticles[0]?.title || "Step-by-step guide to choosing great font pairs" }</Typography>
                    <Typography variant='h6' sx={{ fontFamily: "Inter", fontSize: "0.845rem", fontWeight: 500, color: "#FFD050", lineHeight: "1.25rem" }}><span>{`${currentArticles[0]?.firstName} ${currentArticles[0]?.lastName}` || "James West"}</span> | {moment.unix((new Date(currentArticles[0]?.createdAt)) / 1000).format("DD/MM/YYYY")}</Typography>
                    <Typography sx={{ fontFamily: "Inter", fontSize: "1rem", fontWeight: 400, lineHeight: "1.75rem" }}>{currentArticles[0]?.description?.slice(0,150) + "   ...." ||"Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident."}</Typography>
                    <Box>
                        <ReadMore nav={`/article/${currentArticles[0]?._id}`}/>
                    </Box>

                </Box>
                <Box display="flex" padding="5rem 3rem" sx={{ width: "40rem" }}>
                    <img src={currentArticles[0]?.picturePath[0]?.url || MyImage} alt='ArticleImage' width="100%" style={{ objectFit: "cover" }} />
                </Box>
            </Box>
            <Box padding="5rem">
                <Typography variant="h2" sx={{ fontFamily: "Sen", fontSize: "2rem", fontWeight: 700, letterSpacing: "-0.055rem", lineHeight: "3rem" }}>{cat} Incidents</Typography>
                <Box width="90%" paddingTop="5rem" display="flex" flexDirection="column" gap="3rem">
                    {
                        currentArticles.map((post) => (
                            <CrimeCard _id={post?._id} cat={post?.category} title={post?.title} desc={(post?.description).slice(0, 150) + "  ....."} image={post?.picturePath[0]?.url} />
                        ))
                    }
                </Box>
            </Box>
            {post.length > 6 &&
                <Stack mt="10px" mb="100px" justifyContent="center" alignItems="center">
                    <Pagination
                        color="standard"
                        shape="rounded"
                        defaultPage={1}
                        count={Math.ceil(post.length / 9)}
                        page={currentPage}
                        onChange={paginate}
                        size="large"
                    />
                </Stack>
            }
            <AllCat />
            <Box height="5rem"></Box>
            <Footer />
        </Box>
    )
}

export default CatArticles