import Navbar from 'components/Navbar'
import React from 'react'
import { useSelector } from 'react-redux';
import { Bar, Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import { Typography, Box, Divider } from '@mui/material';
import Footer from 'components/Footer';
import AllCrimeCard from 'scenes/homePage/AllCrimeCard';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

const Analysis = () => {
    const data = useSelector((state) => state.posts)
    const navigate = useNavigate();

    if (!data || data.length === 0) {
        return (
            <>
                <Navbar />
                <h2>Loading...</h2>
            </>
        );
    }
    const featuredPosts = data?.slice(0, 3);
    const categoryCounts = data.reduce((acc, curr) => {
        if (acc[curr.category]) {
            acc[curr.category]++;
        } else {
            acc[curr.category] = 1;
        }
        return acc;
    }, {});

    const categories = Object.keys(categoryCounts);
    const postCounts = Object.values(categoryCounts);

    // Create the dataset for the bar chart
    const chartData = {
        labels: categories,
        datasets: [
            {
                label: 'Number of Posts per Category',
                data: postCounts,
                fill: false,
                backgroundColor: '#0071bd',
                borderColor: '#0071bd',
                borderWidth: 1,
            }
        ]
    }

    //console.log(chartData);

    const options = {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }


    return (
        <>
            <Navbar />
            <Box display="flex" flexDirection="column" alignItems="center" margin="1rem">
                <Typography variant='h3' margin="2rem" mb="2rem">Analysis of crime happened in recent time</Typography>
                <Divider sx={{ width: "55%", marginBottom: "2rem" }} />
                <div style={{ height: '450px', width: '800px' }}>
                    <Bar
                        data={chartData}
                        options={{
                            maintainAspectRatio: true,
                            scales: {
                                x: {
                                    type: 'category', // Use 'category' scale for x-axis
                                    title: {
                                        display: true,
                                        text: 'Category',
                                    },
                                },
                                y: {
                                    beginAtZero: true,
                                    title: {
                                        display: true,
                                        text: 'Number of Posts',
                                    },
                                },
                            },
                        }}
                    />
                </div>
            </Box>
            <Box display="flex" mb="4rem" gap="5rem">
                <Box display="flex" flexDirection="column" margin="0rem 4rem" width="50%" >
                    <Typography variant='h1' sx={{ fontFamily: 'Sen', fontWeight: 900 }}>An overview showing the stats of Crimes</Typography>
                    <Box display="flex" flexDirection="row" mt="3rem">
                        <Typography variant='h4' sx={{ fontFamily: 'Sen', fontWeight: 700, width: "50%" }}>Category</Typography>
                        <Typography variant='h4' sx={{ fontFamily: 'Sen', fontWeight: 700, width: "50%" }}>Number of Cases</Typography>
                    </Box>
                    {categories.map((category, index) => (
                        <>
                            <Box display="flex" flexDirection="row" justifyContent="space-evenly" margin="2rem 0.2rem">
                                <Typography variant='h5' sx={{ fontFamily: 'Inter', fontWeight: 900, width: "50%", textTransform: "capitalize" }}>{category}</Typography>
                                <Typography variant='h5' sx={{ fontFamily: 'Inter', fontWeight: 900, width: "50%" }}> {postCounts[index]}</Typography>
                            </Box>
                            <Divider sx={{ width: "75%" }} />
                        </>
                    ))}
                </Box>
                <Box width="30%">
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                        <Typography sx={{
                            fontFamily: "Sen", fontWeight: 700, fontSize: "1.75rem"
                        }}>
                            Top Crime Reports
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
            </Box>
            <Footer />
        </>
    )
}

export default Analysis