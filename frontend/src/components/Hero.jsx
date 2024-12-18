import React from "react";
import iconPlus from "../assets/plus-sign.png";
import { Link } from "react-router-dom";
import jsCookie from "js-cookie";

export default function Hero() {
  return (
    <section className="py-16 px-8 md:px-20 h-[75vh]">
      <div className="flex flex-col gap-10 text-indigo-900">
        <h1 className="text-2xl md:text-4xl lg:text-5xl">
          Hallo, Selamat Datang {jsCookie.get("user")} 😊 
        </h1>
        <div className="flex flex-col gap-4 mb-16">
          <h2 className="font-bold text-3xl md:text-5xl lg:text-6xl lg:leading-[4.50rem] text-indigo-900">
            KOLABORASI SEDERHANA, HASIL LUAR BIASA!
          </h2>
          <p className="text-gray-800 text-base md:text-xl lg:text-2xl">
            Masuki dunia di mana kerjasama tim terasa lebih menyenangkan dan efisien!
          </p>
        </div>
      </div>
      <div className="absolute bottom-0 right-8 md:right-20">
        <Link to={"/create-document"}>
          <img src={iconPlus} alt="icon-plus" className="w-10 md:w-[5.25rem]" />
        </Link>
      </div>
      <div className="absolute -bottom-16">
        <p className="text-gray-600 text-xs">username: {jsCookie.get("user")}</p>
      </div>
    </section>
  );
}
