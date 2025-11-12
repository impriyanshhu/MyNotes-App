import React, { useState, useEffect } from "react";
import SearchBar from "./SearchBar.jsx";
import Profile from "./Profile.jsx";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/ContextProvider.jsx";
import { MdMenu, MdClose } from "react-icons/md";
import favicon from '../assets/favicon.png'

const Navbar = ({ onSearchNote, handleClearSearch }) => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();

  const onLogout = () => {
    navigate("/login");
  };

  useEffect(() => {
    if (onSearchNote) onSearchNote(searchQuery);
  }, [searchQuery]);

  return (
    <nav className="bg-gray-100/90 px-4 sm:px-6 py-2 shadow-md border-b border-[#2563EB]/30">

      <div className="hidden sm:flex sm:items-center sm:justify-between">
        <h2 className="text-2xl font-extrabold tracking-tight drop-shadow-sm text-blue-600">
          <img src={favicon} alt="" className="w-[30px] hover:scale-105 inline-block mr-1 transition-transform duration-300"/>
          <span className="inline-block text-sky-700">
            My
          </span>
          <span className="inline-block text-blue-600">Notes</span>
        </h2>

        <SearchBar
          value={searchQuery}
          onChange={({ target }) => setSearchQuery(target.value)}
          onClear={() => {
            setSearchQuery("");
            handleClearSearch();
          }}
        />

        <Profile onLogout={onLogout} />
      </div>

      <div className="sm:hidden">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-extrabold tracking-tight drop-shadow-sm text-blue-600">
            <span className=" text-sky-700">
              My
            </span>
            <span className="text-blue-600">Notes</span>
          </h2>

          <button
            className="  text-blue-600 text-2xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <MdClose /> : <MdMenu />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="mt-3 h-9 flex flex-row gap-2 justify-between">
          <SearchBar
            value={searchQuery}
            onChange={({ target }) => setSearchQuery(target.value)}
            onClear={() => {
              setSearchQuery("");
              handleClearSearch();
            }}
          />
          <div className="mt-0">
            <Profile onLogout={onLogout} />
          </div>

        </div>
      )}

    </nav>
  );
};


export default Navbar;
