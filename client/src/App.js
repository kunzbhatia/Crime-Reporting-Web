import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import HomePage from "scenes/homePage/HomePage";
import LoginPage from "scenes/loginPage/LoginPage";
import ProfilePage from "scenes/profilePage/ProfilePage";
import EditProfile from "scenes/profilePage/EditProfile";
import CreatePost from "scenes/createPost/CreatePost.jsx";
import CrimeArticles from "scenes/crimeArticles/CrimeArticles.jsx";
import CatArticles from "scenes/CatArticles/CatArticles.jsx";
import ContactUs from "scenes/contact/ContactUs.jsx";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme.js";
import PostPage from "./scenes/postPage.jsx/PostPage";
import Search from "scenes/search/Search.jsx";
import Analysis from "scenes/crimeAnalysis/Analysis.jsx";


function App() {

  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state) => state.token));

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/" element={<HomePage />}/>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/profile/:userId" element={isAuth ? <ProfilePage /> : <Navigate to="/" />} />
            <Route path="/articles" element=<CrimeArticles/>/>
            <Route path="/articles/:cat" element=<CatArticles/>/>
            <Route path="/article/:articleId" element=<PostPage/>/>
            <Route path="/search/:name" element=<Search/>/>
            <Route path="/contactUs" element=<ContactUs/>/>
            <Route path="/analysis" element={isAuth ? <Analysis/> :<Navigate to="/" />}/>
            <Route path="/editProfile" element={isAuth ? <EditProfile/> :<Navigate to="/" />}/>
            <Route path="/create" element={isAuth ? <CreatePost />  : <Navigate to="/" />}/>
            <Route path="/edit-profile" element={isAuth ? <EditProfile /> : <Navigate to="/" />} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  )
}

export default App;
