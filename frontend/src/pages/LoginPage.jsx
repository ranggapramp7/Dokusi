import React, { useState } from "react";
import background from "../assets/background.png";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import { URL_BACKEND } from "../config";

const LoginPage = () => {
  const navigate = useNavigate()
  const [name, setName] = useState()

  const handleSubmit = () =>{
    const login = async () =>{
      const response = await axios.post(`${URL_BACKEND}/user`, {name})
      await Cookies.set("user",response.data.data.name, { expires: 1 })
    }
    login()
    setTimeout(() => {
      navigate("/")
    },1000)
  }
  return (
    <section className="h-screen w-full relative">
      <img
        src={background}
        alt=""
        draggable={false}
        className="absolute top-0 left-0 w-full h-full object-cover -z-10"
      />
      <div className="max-container px-8">
        <div className="flex flex-col items-center justify-center gap-32">
          <img
            src="/dokusi.png"
            alt="logo"
            className="w-[40rem] mx-auto mt-10"
          />
          <div className="bg-white/60 opacity-80 backdrop-blur-sm mx-auto rounded-2xl p-10">
            <div className="flex flex-col gap-5">
              <input
              value={name}
              onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="Masukan nama"
                className="px-4 py-2 w-full rounded-lg border border-gray-300 focus:outline-none focus:border-green-1 focus:ring-green-1"
              />
              
                <button onClick={handleSubmit} className="px-4 py-2 w-full text-gray-950 bg-green-1 shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-lg border border-green-1 focus:outline-none focus:border-green-1 focus:ring-green-1">
                  Start
                </button>
              
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
