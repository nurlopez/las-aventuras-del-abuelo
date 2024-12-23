import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import BoardGame from "./pages/BoardGame";



function App() {
    return (
        <BrowserRouter basename="/las-aventuras-del-abuelo">
            <Routes>
                {/* The home route: */}
                <Route path="/" element={<HomePage />} />

                {/* The Bukit Selidang page: */}
                <Route path="/bukit-selidang" element={<BoardGame />} />

                {/* You can add more routes for future trips here: */}
                {/* <Route path="/some-other-trip" element={<SomeOtherTrip />} /> */}
                {/* <Route path="/some-future-trip" element={<SomeFutureTrip />} /> */}
            </Routes>
        </BrowserRouter>
    );
}

export default App;
