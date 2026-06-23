import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../context/AppContext";
import socket from "../context/socket";





const SupportWidget = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);
  const { token } = useContext(AppContext);
  const [liveChat, setLiveChat] = useState(false);
  const [roomId, setRoomId] = useState("");



const sendMessage = async () => {
  if (!input.trim()) return;

  const userMessage = input;

  setMessages((prev) => [
    ...prev,
    {
      sender: "user",
      text: userMessage,
    },
  ]);

  setInput("");
  setIsTyping(true);

  try {

    // Human Support Mode
    if (liveChat) {
      socket.emit("sendMessage", {
        roomId:"akash-room",
        sender: "customer",
        message: userMessage,
      });

      setIsTyping(false);
      return;
    }

    // AI mode
    axios.defaults.withCredentials = true;
    const { data } = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/support/chat`,
      
      {
        message: userMessage,
      },
      {
        headers: { token },
      }
    );

    // human chat Request
    if (data.humanSupport) {
  console.log("Room ID:", data.roomId);
      setLiveChat(true);
      setRoomId(data.roomId);
    }

    setMessages((prev) => [
      ...prev,
      {
        sender: "bot",
        text: data.reply,
      },
    ]);

  } catch (error) {
    console.log(error);
  } finally {
    setIsTyping(false);
  }
};



  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, isTyping]);

     useEffect(()=>{

    socket.on("connect",()=>{
      console.log("Connected", socket.id);
      
    })
    return  ()=>socket.off("disconnect")
  },[])


  useEffect(()=>{
    socket.emit("joinRoom","akash-room")
  },[])


  useEffect(() => {

  socket.on("receiveMessage",(data) => {
if(data.sender==="admin")
      setMessages(prev => [...prev,data,
            {
          sender: data.sender,
          text: data.message,
        }]);

    }
  );

  return () => {
    socket.off("receiveMessage");
  };

}, []);


  const faqQuestions = [
    " Where is my order?",
    " How can I cancel my order?",
    " How do I download my invoice?",
    " When will I get my refund?",
    " Talk to Human Agent",
  ];

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 h-16 w-16 rounded-full bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 text-white shadow-[0_10px_40px_rgba(139,92,246,0.6)] hover:scale-110 transition-all duration-300 flex items-center justify-center text-2xl"
      >
        💬
      </button>

      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-[400px] h-[650px] rounded-3xl border border-white/20 bg-white/10 backdrop-blur-xl shadow-[0_20px_80px_rgba(0,0,0,0.25)] overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 text-white p-5">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center text-xl">
                🤖
              </div>

              <div>
                <h2 className="font-bold text-lg">Support AI</h2>

                <p className="text-sm text-white/80">
                  Online • Instant Support
                </p>
              </div>
            </div>
          </div>
          <div className="p-3 flex flex-wrap gap-2"></div>

          {/* Messages */}
          <div className="h-[500px] overflow-y-auto p-4 bg-slate-50">
            {faqQuestions.map((question, index) => (
              <button
                key={index}
                onClick={() => setInput(question)}
                className="px-3 py-2 text-xs font-medium rounded-full
      bg-gradient-to-r from-violet-100 to-indigo-100
      hover:from-violet-200 hover:to-indigo-200
      transition-all duration-300"
              >
                {question}
              </button>
            ))}
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex mb-4 ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm shadow-md ${
                    msg.sender === "user"
                      ? "bg-gradient-to-r from-violet-600 to-indigo-600 text-white"
                      : "bg-white text-gray-800 border"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start mb-4">
                <div className="bg-white border px-4 py-3 rounded-2xl shadow">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                  </div>
                </div>
                <div ref={messagesEndRef}></div>
              </div>
            )}
          </div>

          {/* input  */}
          <div className="absolute bottom-0 left-0 right-0 bg-white border-t p-3">
            <div className="flex items-center gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask anything..."
                className="flex-1 px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-violet-500"
              />

              <button
                onClick={sendMessage}
                className="px-5 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-medium hover:scale-105 transition"
              >
                ➤
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SupportWidget;
