import React, { useEffect, useState, useRef } from "react";
import Navbar from "../components/Navbar";
import Cookies from "js-cookie";
import { URL_BACKEND } from "../config";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import socketIOClient from "socket.io-client";
import { useParams } from "react-router-dom";
import axios from "axios";
import debounce from "lodash.debounce";
import { ArrowLeftIcon } from "@heroicons/react/24/outline"; // Import ArrowLeftIcon

const socket = socketIOClient(`${URL_BACKEND}`);

const DoceditPage = () => {
  const [dokumen, setDokumen] = useState({ _id: "", judul: "", content: "" });
  const { id } = useParams();

  const fetchData = async () => {
    const response = await axios.get(`${URL_BACKEND}/dokumen/${id}`);
    const data = response.data.data;
    setDokumen(data);
  };

  const [value, setValue] = useState("");
  const quillRef = useRef(null); // Create a ref for the ReactQuill component

  const navigate = useNavigate();

  useEffect(() => {
    const user = Cookies.get("user");
    if (!user) {
      navigate("/login");
    } else {
      return;
    }
  }, []);

  const formats = [
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "code-block",
    "header",
    "list",
    "script",
    "indent",
    "direction",
    "size",
    "color",
    "background",
    "font",
    "align",
    "clean",
  ];

  const toolbarOptions = [
    ["bold", "italic", "underline", "strike"],
    ["blockquote", "code-block"],
    [{ header: 1 }, { header: 2 }],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ script: "sub" }, { script: "super" }],
    [{ indent: "-1" }, { indent: "+1" }],
    [{ direction: "rtl" }],
    [{ size: ["small", false, "large", "huge"] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ color: [] }, { background: [] }],
    [{ font: [] }],
    [{ align: [] }],
    ["clean"],
  ];

  const modules = {
    toolbar: {
      container: toolbarOptions,
    },
  };

  const updateDocumentContent = async (updatedContent) => {
    try {
      const response = await axios.put(
        `${URL_BACKEND}/dokumen/${dokumen._id}`,
        {
          content: updatedContent,
        }
      );

      if (response.ok) {
        socket.emit("update", response.data.data);
      } else {
        // Handle errors or issues from the server
      }
    } catch (error) {
      console.error("Error updating document content:", error);
    }
  };

  const debouncedUpdateDocument = debounce(updateDocumentContent, 10);
  const handleChange = (content, delta, source, editor) => {
    setDokumen((prevDokumen) => ({ ...prevDokumen, content }));
    debouncedUpdateDocument(content);

    // Save current cursor position
    const selection = editor.getSelection();
    if (selection && quillRef.current) {
      quillRef.current.editor.setSelection(selection);
    }
  };

  useEffect(() => {
    fetchData();

    socket.on(`update`, (updatedDokumen) => {
      setDokumen(updatedDokumen);

      // Restore cursor position after content update
      if (quillRef.current && updatedDokumen.content) {
        quillRef.current.editor.setSelection(updatedDokumen.content.length, 0);
      }
    });

    return () => {
      socket.off(`update`);
    };
  }, [dokumen._id]);

  // Function to handle the save and navigate to manage
  const handleSaveAndNavigate = async () => {
    await updateDocumentContent(dokumen.content); // Ensure document is updated
    navigate("/manage"); // Navigate to manage page
  };

  // Function to handle the back navigation
  const handleBack = () => {
    navigate("/manage"); // Navigate back to manage page
  };

  return (
    <>
      <Navbar />
      <main className="max-container mx-auto p-5">
        {dokumen && (
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

              {/* Save Button */}
              <button
                onClick={handleSaveAndNavigate}
                className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-600"
              >
                Save
              </button>
            </div>

            <h1 className="font-bold text-3xl text-center my-5 ">{dokumen.judul}</h1>
            <ReactQuill
              className="bg-white min-h-screen shadow-lg rounded-xl"
              formats={formats}
              modules={modules}
              theme="snow"
              value={dokumen.content}
              onChange={handleChange}
              preserveWhitespace={true} // Preserve whitespace, including spaces
              ref={quillRef} // Attach the ref to the ReactQuill component
            />
          </>
        )}
      </main>
    </>
  );
};

export default DoceditPage;
