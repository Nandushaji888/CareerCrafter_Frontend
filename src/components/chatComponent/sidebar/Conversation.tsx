import React from "react";

const Conversation = () => {
  return (
    <>
    <div
      className={`flex gap-4 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer`}
      >
      <div className={`avatar "online" `}>
        <div className="w-12 rounded-full">
          <img src="/profile.png" alt="user avatar" />
        </div>
      </div>

      <div className="flex flex-col flex-1">
        <div className="flex gap-3 justify-between">
          <p className="font-bold text-gray-200">Test1</p>
          {/* <span className="text-xl">🎃</span> */}
        </div>
      </div>
    </div>
      <div className="divider opacity-25 px-8 my-0 py-0 h-1" />
      </>
  );
};

export default Conversation;
