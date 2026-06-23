
// import axios from "axios";
import { io } from "socket.io-client";

// const backendUrl = import.meta.env.VITE_BACKEND_URL;
// axios.defaults.baseURL = backendUrl;

const socket = io("http://localhost:4000");

export default socket;