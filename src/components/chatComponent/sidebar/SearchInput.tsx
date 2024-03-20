import React, { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";

const SearchInput = () => {
  const [search,setSearch] =useState("")
  return (
    <form className="flex items-center gap-3  mb-2">
      <input
        type="text"
        placeholder="Search…"
        className="input input-bordered rounded-full px-3 py-2"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button type="submit" className="btn btn-circle rounded-full p-2 bg-sky-500 text-white">
        <IoSearchSharp className="w-6 h-6 outline-none" />
      </button>
    </form>
  );
};

export default SearchInput;
