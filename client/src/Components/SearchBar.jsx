import React from "react";
import { MdClose } from "react-icons/md";

const SearchBar = ({ value, onChange, onClear }) => {
  return (
    <div className="w-full max-w-xs flex items-center px-4 bg-sky-100/70 rounded-md shadow-sm border border-blue-600/30 focus-within:border-blue-600 transition-all duration-200">
      <input
        type="text"
        placeholder="Search..."
        className="w-full text-sm bg-transparent py-[11px] text-[#1E293B] placeholder:text-[#94A3B8] outline-none"
        value={value}
        onChange={onChange}
      />
      {value && (
        <button
          onClick={onClear}
          className="text-gray-500 hover:text-blue-600 transition-colors"
        >
          <MdClose size={18} />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
