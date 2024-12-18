import React, { useState } from "react";
import {
  HomeIcon,
  FolderIcon,
  Bars3Icon,
  XMarkIcon,
  MagnifyingGlassIcon,
  ArrowDownLeftIcon,
  GifIcon,
  BackwardIcon,
  ArrowLeftIcon,
} from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const handleOpen = () => {
    setIsOpen(!isOpen);
  };
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/manage/keyword?title=" + search);
    // console.log("search")
    // alert("search")
  };
  return (
    <header className="bg-green-3 relative">
      <nav className="container mx-auto px-8 py-6">
        <div className="flex items-center justify-between">
          <Link to={"/"}>
            <img src="/dokusi.png" alt="logo" width={150} />
          </Link>
          <div className="hidden lg:block">
            <div className="flex gap-8 items-center">
              <Link to={"/"} className="flex gap-3">
                <HomeIcon className="h-6 w-6 text-gray-800" />
                <span className="text-gray-800 hover:underline">Home</span>
              </Link>
              <Link to={"/manage"} className="flex gap-3">
                <FolderIcon className="h-6 w-6 text-gray-800" />
                <span className="text-gray-800 hover:underline">Manajemen Dokumen</span>
              </Link>
              <Link to={"/login"} className="flex gap-3">
                <ArrowLeftIcon className="h-6 w-6 text-gray-800" />
                <span className="text-gray-800 hover:underline font-bold">Logout</span>
              </Link>
            </div>
          </div>
          <form className="relative hidden lg:block" onSubmit={handleSubmit}>
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <MagnifyingGlassIcon className="w-5 h-5 text-gray-400" />
            </span>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              placeholder="Cari Dokumen..."
              className="pl-10 pr-4 py-2 rounded-lg border bg-green-50 border-gray-300 focus:outline-none focus:border-green-1 focus:ring-green-1"
            />
          </form>
          <div className="lg:hidden">
            <Bars3Icon className="h-8 w-8 text-black-1" onClick={handleOpen} />
          </div>
        </div>
      </nav>
      <div
        className={`fixed top-0 right-0 w-full z-20 lg:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } duration-500 transition-all`}
      >
        <div className="absolute top-0 right-0 w-4/5 h-screen bg-green-3 px-10 py-32">
          <XMarkIcon
            className="absolute top-8 right-8 h-8 w-8 text-black-1"
            onClick={handleOpen}
          />
          <div className="flex flex-col gap-8">
            <Link to={"/"} className="flex gap-3">
              <HomeIcon className="h-6 w-6 text-gray-800" />
              <span className="text-gray-800 hover:underline">Home</span>
            </Link>
            <Link to={"/manage"} className="flex gap-3">
              <FolderIcon className="h-6 w-6 text-gray-800" />
              <span className="text-gray-800 hover:underline">
                Manajemen Dokumen
              </span>
            </Link>
            <form className="relative" onSubmit={handleSubmit}>
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <MagnifyingGlassIcon className="w-5 h-5 text-gray-400" />
              </span>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                type="text"
                placeholder="search..."
                className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-300 focus:outline-none focus:border-green-1 focus:ring-green-1"
              />
            </form>
          </div>
        </div>
      </div>
    </header>
  );
}
