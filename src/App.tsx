import React from 'react';
import { hot } from "react-hot-loader";
import { Routes, Route } from "react-router-dom";
import {MainPage} from "./pages/MainPage";
import {AddCardPage} from "./pages/AddCardPage";
import {GalleryPage} from "./pages/GalleryPage";
import {LoginPage} from "./pages/LogInPage";
import {SignUpPage} from "./pages/SignUpPage";
import {ProfilePage} from "./pages/ProfilePage";
import {GalleryPin} from "./components/GalleryPin";
import {CardPage} from "./pages/CardPage";
import {OtherUserProfilePage} from "./pages/OtherUserProfilePage";




const App = hot(module)(() => {
    return (
            <Routes>
                <Route path="/" element={<MainPage />}/>
                <Route path="/add_card_page" element={<AddCardPage />}/>
                <Route path="/gallery" element={<GalleryPage />}/>
                <Route path="/login" element={<LoginPage />}/>
                <Route path="/signup" element={<SignUpPage />}/>
                <Route path="/profile" element={<ProfilePage />}/>
                <Route path="/pinDetail/:pinId" element={<CardPage />}/>
                <Route path="/userDetail/:userId" element={<OtherUserProfilePage />}/>
            </Routes>
    );
})

export default App;
