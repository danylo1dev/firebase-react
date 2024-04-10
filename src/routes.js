import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./components/index";
import Header from "./components/header";
import Footer from "./components/footer";
import Cars from "./components/cars/Cars";
import LoginPage from "./components/loginPage";
import Upload from "./components/upload";

const routers = () => (
  <BrowserRouter>
    <Header />
    <main role="main" className="container">
      <Routes>
        <Route exact path="/" element={Home} />
        <Route exact path="/cars" element={<Cars />} />
        <Route exact path="/login" element={<LoginPage />} />
        <Route exact path="/upload" element={<Upload />} />
      </Routes>
    </main>
    <Footer />
  </BrowserRouter>
);

export default routers;
