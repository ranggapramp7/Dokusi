import React, { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import iconBack from "../assets/back-sign.png";
import iconPlus from "../assets/plus-sign.png";
import { URL_BACKEND } from "../config";
import axios from "axios";
import ListDocument from "./ListDocument";

export default function AllDocument() {
  const [searchParams] = useSearchParams();
  const title = searchParams.get("title") || "";
  const [allDokumen, setAllDokumen] = useState([]);
  const navigation = useNavigate();
  
  useEffect(() => {
    const fetchAllDokumen = async () => {
      try {
        const res = await axios.get(`${URL_BACKEND}/dokumen`);
        let filteredData = res.data.data;

        if (title) {
          // If title is provided, filter the data
          filteredData = filteredData.filter((item) =>
            item.judul.toLowerCase().includes(title.toLowerCase())
          );
        }

        setAllDokumen(filteredData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchAllDokumen();
  }, [title]);

  return (
    <section className="py-16 px-20 h-[75vh] overflow-auto flex flex-col">
      <div className="flex-grow">
        {!allDokumen ? (
          <p>loading....</p>
        ) : (
          <ul className="flex flex-col gap-4">
            {allDokumen.map((dokumen, idx) => {
              return (
                <ListDocument
                  judul={dokumen.judul}
                  id={dokumen._id}
                  content={dokumen.content}
                  onClick={() => {
                    navigation(`/edit/${dokumen._id}`);
                  }}
                  key={idx}
                />
              );
            })}
          </ul>
        )}
      </div>

      {/* Kontainer untuk ikon berada di bawah */}
      <div className="flex justify-between mt-6">
        <Link to={"/"} className="flex items-center">
          <img src={iconBack} alt="icon-back" className="w-10 md:w-[5.25rem]" />
        </Link>
        <Link to={"/create-document"} className="flex items-center">
          <img src={iconPlus} alt="icon-plus" className="w-10 md:w-[5.25rem]" />
        </Link>
      </div>
    </section>
  );
}
