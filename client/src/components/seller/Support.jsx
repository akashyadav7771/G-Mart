import { useEffect, useState } from "react";
import socket from "../../context/socket.js";

const Support = () => {

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {

    socket.emit("joinRoom", "akash-room");

    socket.on("receiveMessage", (data) => {

    if(data.sender === "customer"){
        setMessages((prev) => [...prev, data]);

    }


    });

    return () => {
      socket.off("receiveMessage");
    };

  }, []);

const sendReply = () => {

  if (!input.trim()) return;

  const msgData = {
    roomId: "akash-room",
    sender: "admin",
    message: input,
  };

  socket.emit("sendMessage", msgData);

  setMessages((prev) => [...prev, msgData]);

  setInput("");

};

  return (

  <div className=" flex bg-gradient-to-br from-sky-50 via-white to-violet-50 w-full max-w-4xl h-[92vh] shadow-2xl overflow-hidden flex">

    {/* Sidebar */}
    <div className="w-72 bg-white border-r border-gray-200">

      <div className="p-5 border-b border-gray-200">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent">
          Support Center
        </h1>

        <p className="text-sm text-gray-500 mt-1">
          Live Customer Conversations
        </p>
      </div>

      <div className="p-3">
        <div className="bg-white rounded-2xl p-3 border border-gray-200 shadow-sm hover:shadow-md hover:bg-slate-50 transition-all duration-300 cursor-pointer">

          <div className="flex items-center gap-3">

            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-violet-500 to-blue-500 flex items-center justify-center text-white font-semibold">
              A
            </div>

            <div>
              <h3 className="font-medium text-gray-800">
                Akash Yadav
              </h3>

              <p className="text-xs text-green-500">
                ● Online
              </p>
            </div>

          </div>

        </div>
      </div>

    </div>

    <div className="flex-1 flex flex-col">

      <div className="h-16 px-6 flex items-center justify-between bg-white border-b border-gray-200">

        <div>
          <h2 className="text-lg font-semibold text-gray-800">
            Customer Support
          </h2>

          <p className="text-xs text-green-500">
            ● Active Now
          </p>
        </div>

       

      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">

        {messages.map((msg, index) => (

          <div
            key={index}
            className={`flex ${
              msg.sender === "admin"
                ? "justify-end"
                : "justify-start"
            }`}
          >

            <div
              className={`max-w-[220px] px-4 py-2 rounded-2xl shadow-sm ${
                msg.sender === "admin"
                  ? "bg-gradient-to-r from-violet-500 to-blue-500 text-white"
                  : "bg-white border border-gray-200 text-gray-700"
              }`}
            >

              <p className="text-sm">
                {msg.message}
              </p>

              <p className="text-[10px] opacity-70 mt-1">
                Just now
              </p>

            </div>

          </div>

        ))}

      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-200 bg-white">

        <div className="flex gap-3">

          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Reply to customer..."
            className="flex-1 px-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-violet-400"
          />

          <button
            onClick={sendReply}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-violet-500 to-blue-500 text-white font-medium hover:scale-105 transition-all duration-300 shadow-md"
          >
            Send
          </button>

        </div>

      </div>

    </div>

  </div>
);
};


export default Support;