import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import axios from "axios";
import { URL_BACKEND } from "../config";
import { ArrowDownIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import jsPDF from "jspdf";

function DetailPage() {
  const { id } = useParams();
  const [data, setData] = useState();
  const reportTemplateRef = useRef(null);
  const navigate = useNavigate(); // Initialize navigate function

  const handleDownload = () => {
    const doc = new jsPDF({
      format: "a4",
      unit: "px",
    });

    // Adding the fonts.
    doc.setFont("Inter-Regular", "normal");

    doc.html(reportTemplateRef.current, {
      async callback(doc) {
        await doc.save("document");
      },
    });
  };

  const handleBack = () => {
    navigate("/manage"); // Navigate back to the manage page
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`${URL_BACKEND}/dokumen/${id}`);
      const data = response.data.data;
      setData(data);
    };
    fetchData();
  }, [id]);

  return (
    <>
      <Navbar />
      <main className="max-container mx-auto p-5">
        {data && (
          <>
            <div className="flex justify-between items-center mb-5">
              {/* Back Button */}
              <button
                onClick={handleBack}
                className="flex items-center px-5 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                <ArrowLeftIcon className="w-5 h-5 mr-2" />
                Kembali
              </button>

              {/* Download Button */}
              <button
                onClick={handleDownload}
                className="flex items-center px-5 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
              >
                <ArrowDownIcon className="w-5 h-5 mr-2" />
                Download
              </button>
            </div>

            <h1 className="font-bold text-3xl text-center my-5">{data.judul}</h1>

            <div
              ref={reportTemplateRef}
              className="min-h-screen bg-white p-10"
              dangerouslySetInnerHTML={{ __html: data.content }}
            ></div>
          </>
        )}
      </main>
    </>
  );
}

export default DetailPage;
