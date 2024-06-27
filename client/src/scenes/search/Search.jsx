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

const Search = () => {
    const { name } = useParams();
    const [post, setPost] = useState([]);
    const token = useSelector(state=>state.token);

    const fetchCatPosts = async()=>{
        const response = await fetch(`https://crime-reporting-app-server.vercel.app/posts/search?q=${name}`, {
            method: "GET",
            headers:{ Authorization: `Bearer ${token}`},
        });
        const res = await response.json();
        setPost(res);
    }


    useEffect(()=>{
        fetchCatPosts();
    },[name,token]) //eslint-disable

    const [currentPage, setCurrentPage] = useState(1);
    const articlesPerPage = 6;

    if(post.length <= 0)
        return "No Records Found for the search"

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
            <Box padding="1rem">
                <Typography variant="h2" sx={{ fontFamily: "Sen", fontSize: "2rem", fontWeight: 700, letterSpacing: "-0.055rem", lineHeight: "3rem", paddingLeft:"2rem"}}>Report Related To Search</Typography>
                <Box width="90%" paddingTop="3rem" display="flex" flexDirection="column" gap="3rem">
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

export default Search