import express from "express";
import http from "http";
import { Server } from "socket.io";
import figlet from "figlet";
import cookieParser from "cookie-parser";
import configs from "./configs/index.configs.js";
import Db_Connect from "./services/connectDb.js";
import apiRoutes from "./routes/v1/index.routes.v1.js";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerOptions from "./services/swaggerOptions.js";
import redis from "./Redis/client.js";
import connectRedis from "./Redis/connectRedis.js";
import "./jobs/autoAppointmantStatusUpdate.job.js";

const app = express();
const server = http.createServer(app); // Create HTTP server
const io = new Server(server, {
  cors: {
    origin:
      configs.ENV === "development"
        ? "http://localhost:5173"
        : "https://medicon-za1z.vercel.app",
    credentials: true,
  },
});

app.set("trust proxy", true);

app.set("io", io); // Attach io to app instance (to use in controllers)

// Connect Database...
const db_URI =
  configs.ENV === "development" ? configs.DB_URI : configs.MONGODB_URI;
Db_Connect(db_URI);
connectRedis();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static("public"));

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

// CORS
const corsOrigin =
  configs.ENV === "development"
    ? "http://localhost:5173"
    : "https://medicon-za1z.vercel.app";

app.use(
  cors({
    origin: corsOrigin,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);

if (configs.ENV !== "development") {
  app.use((req, res, next) => {
    if (req.method === "OPTIONS") {
      return res.status(200).end();
    }
    next();
  });
}

// Swagger
const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Routes
app.use("/api/v1", apiRoutes);

// Socket.IO connection
io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);
});

server.listen(configs.PORT, (err) => {
  if (err) {
    figlet("E r r o r  t o  c o n n e c t  s e r v e r  !❌❌❌", (err, data) => {
      console.log(data || "Something went wrong in figlet...");
    });
  } else {
    figlet(`S e r v e r   o n  p o r t : ${configs.PORT}`, (err, data) => {
      console.log(data || "Server connected");
    });
  }
});

export default app;