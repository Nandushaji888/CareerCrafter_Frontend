import React from "react";
import SearchInput from "./SearchInput";
import Conversations from "./Conversations";
const Sidebar = () => {
  return (
    <div className="border-r w-[350px] border-slate-500 p-4 gap-2 flex flex-col">
      <SearchInput />
      <div className="divider px-3"></div>
      <Conversations />
    </div>
  );
};

export default Sidebar;
