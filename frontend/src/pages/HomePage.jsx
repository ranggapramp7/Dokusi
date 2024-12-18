import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Cookies from "js-cookie"
import { useNavigate } from "react-router-dom";
const HomePage = () => {
  const navigate= useNavigate()
  useEffect(() => {
    const user = Cookies.get("user")
    if(!user){
      navigate("/login")
    }else{
      return
    }
  },[])
  return (
    <>
      <Navbar />
      <main className="max-container">
        <Hero />
      </main>
    </>
  );
};

export default HomePage;
