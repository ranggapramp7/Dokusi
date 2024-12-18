import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { URL_BACKEND } from "../config";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ArrowLeftIcon } from "@heroicons/react/24/outline"; // Import ArrowLeftIcon

const CreatePage = () => {
  const [form, setForm] = useState({
    judul: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post(`${URL_BACKEND}/dokumen`, {
      judul: form.judul,
    });
    alert("Dokumen dibuat!");
    navigate(`/edit/${response.data.data._id}`);
  };

  const navigate = useNavigate();

  useEffect(() => {
    const user = Cookies.get("user");
    if (!user) {
      navigate("/login");
    } else {
      return;
    }
  }, []);

  // Function to handle the back navigation
  const handleBack = () => {
    navigate("/manage"); // Navigate back to manage page
  };

  return (
    <>
      <Navbar />
      <main className="max-container p-5">
        <div className="flex justify-between items-center mb-5">
          {/* Back Button */}
          <button
            onClick={handleBack}
            className="flex items-center px-5 py-2 bg-blue-400 text-white rounded-lg hover:bg-blue-500"
          >
            <ArrowLeftIcon className="w-5 h-5 mr-2" />
            Kembali
          </button>
        </div>

        <h1 className="text-3xl font-bold text-center my-5">Buat Dokumen Baru</h1>
        <form onSubmit={handleSubmit} className="flex flex-col p-6 gap-4">
          <label className="text-xl font-semibold">Judul Dokumen :</label>
          <input
            className="rounded-xl border border-black bg-opacity-50 outline-none bg-white px-2 py-3"
            value={form.judul}
            onChange={handleChange}
            name="judul"
            type="text"
          />
          <button
            type="submit"
            className="bg-blue-300 mt-10 px-3 py-4 uppercase font-bold rounded-xl hover:bg-blue-400 duration-300 ease-in-out"
          >
            Buat
          </button>
        </form>
      </main>
    </>
  );
};

export default CreatePage;
