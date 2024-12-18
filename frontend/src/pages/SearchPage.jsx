import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import AllDocument from "../components/AllDocument";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie"
const SearchPage = () => {
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
        <AllDocument />
      </main>
    </>
  );
};

export default SearchPage;
