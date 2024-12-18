import {
  DocumentTextIcon,
  EyeIcon,
  InformationCircleIcon,
  PencilIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import axios from "axios";
import { URL_BACKEND } from "../config";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function ListDocument(props) {
  const [showInfoModal, setShowInfoModal] = useState(false); // State untuk kontrol modal
  const [docInfo, setDocInfo] = useState(null); // State untuk menyimpan informasi dokumen

  const handleDelete = async () => {
    const response = await axios.delete(`${URL_BACKEND}/dokumen/${props.id}`);
    alert(response.data.message);
    window.location.reload();
  };

  const navigate = useNavigate();

  const handleInfoClick = async () => {
    // Ambil informasi dokumen (kapan dibuat dan diupdate)
    const response = await axios.get(`${URL_BACKEND}/dokumen/${props.id}`);
    setDocInfo(response.data.data); // Menyimpan data ke dalam state
    setShowInfoModal(true); // Menampilkan modal
  };

  return (
    <li className="w-full flex md:flex-row flex-col items-center justify-between gap-2 border-2 rounded-xl px-2 py-3 border-black cursor-pointer hover:bg-blue-200 duration-300 ease-in ">
      <div className="flex gap-2 items-center">
        <DocumentTextIcon className="w-10" />
        <p>{props.judul}</p>
      </div>
      <div className="flex gap-4 items-center">
        <EyeIcon
          onClick={() => navigate(`/detail/${props.id}`)}
          className="w-12 cursor-pointer rounded-full p-3 hover:bg-blue-400"
        />
        <PencilIcon
          onClick={props.onClick}
          className="w-12 cursor-pointer rounded-full p-3 hover:bg-blue-400"
        />
        <PencilSquareIcon
          onClick={() => navigate(`/edit-document/${props.id}`)}
          className="w-12 cursor-pointer rounded-full p-3 hover:bg-blue-400"
        />
        <TrashIcon
          onClick={handleDelete}
          className="w-12 cursor-pointer rounded-full p-3 hover:bg-blue-400"
        />
        <InformationCircleIcon
          onClick={handleInfoClick}
          className="w-12 cursor-pointer rounded-full p-3 hover:bg-blue-400"
        />
      </div>

      {/* Modal untuk menampilkan informasi */}
      {showInfoModal && docInfo && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-xl max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">Informasi Dokumen</h2>
            <p>
              <strong>Dibuat Pada:</strong>{" "}
              {new Date(docInfo.createdAt).toLocaleString()}
            </p>
            <p>
              <strong>Diperbarui Pada:</strong>{" "}
              {new Date(docInfo.updatedAt).toLocaleString()}
            </p>
            <button
              onClick={() => setShowInfoModal(false)} // Menutup modal
              className="mt-4 px-6 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600"
            >
              Tutup
            </button>
          </div>
        </div>
      )}
    </li>
  );
}

export default ListDocument;
