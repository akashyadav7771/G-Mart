import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";
import express from "express";
import { Server } from "socket.io";
import connectCloudinary from "./configs/cloudnary.js";
import connectDB from "./configs/db.js";
import { stripeWebhooks } from "./controllers/orderController.js";
import addressRouter from "./routes/addressRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import productRouter from "./routes/productRoute.js";
import sellerRouter from "./routes/sellerRoute.js";
import supportRouter from "./routes/supportRoute.js";
import userRouter from "./routes/userRoute.js";

const app = express();
const port = process.env.PORT || 4000;


await connectDB();
await connectCloudinary();




// Allow multiple origin
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "https://g-mart-blond.vercel.app",
];

app.post("/stripe", express.raw({ type: "application/json" }), stripeWebhooks);

// Middleware configurationm
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: allowedOrigins, credentials: true }));

app.get("/", (req, res) => res.send("API is Working!! Perfectfully "));
app.use("/api/user", userRouter);
app.use("/api/seller", sellerRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/address", addressRouter);
app.use("/api/order", orderRouter);
app.use("/api/support", supportRouter);


const server = app.listen(port, () => {
  console.log(`Server is runing on http://localhost:${port}`);
});

//socket oi
export const io = new Server(server,{
  cors: {
    origin: "http://localhost:5173",
  },
})
io.on("connection", (socket) => {
  console.log(" User Connected:", socket.id);

  socket.on("joinRoom", (roomId) => {
    socket.join(roomId);

    console.log(`User joined room: ${roomId}`);
  });
  socket.on("sendMessage", (data)=>{
    console.log("Message Received:", data);
    io.to(data.roomId).emit("receiveMessage", data)
  })

  socket.on("disconnect", (reason) => {
    console.log(" User Disconnected",reason);
  });
});

