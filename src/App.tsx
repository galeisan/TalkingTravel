import React from 'react';
import { hot } from "react-hot-loader";
import { Routes, Route } from "react-router-dom";
import {MainPage} from "./pages/MainPage";



const App = hot(module)(() => {
    return (
        <Routes>
            <Route path="/" element={<MainPage />}/>
        </Routes>
    );
})

export default App;
