import express from "express";
import figlet from "figlet";
import cookieParser from "cookie-parser";
import configs from "./configs/index.configs.js";
import Db_Connect from "./services/connectDb.js";
import apiRoutes from "./routes/v1/index.routes.v1.js";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc"; // Corrected import
import swaggerOptions from "./services/swaggerOptions.js";
import redis from "./Redis/client.js";
import connectRedis from "./Redis/connectRedis.js";

const app = express();

// Connect Database...
const db_URI =
  configs.ENV === "development" ? configs.DB_URI : configs.MONGODB_URI;
Db_Connect(db_URI);

connectRedis();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});
app.use(express.static("public"));

// Update CORS configuration for Vercel
const corsOrigin = configs.ENV === "development" 
  ? "http://localhost:5173" 
  : ["https://your-frontend-domain.vercel.app", "https://medicon-frontend.vercel.app"];

app.use(
  cors({
    origin: corsOrigin,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
  })
);

// Update for Vercel deployment
if (configs.ENV !== "development") {
  app.use((req, res, next) => {
    if (req.method === "OPTIONS") {
      return res.status(200).end();
    }
    next();
  });
}

const swaggerDocs = swaggerJSDoc(swaggerOptions); // Correct usage
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// APIs entry point...
app.use("/api/v1", apiRoutes);

app.listen(configs.PORT, (err) => {
  if (err) {
    figlet(
      "E r r o r  t o  c o n n e c t  s e r v e r  !❌❌❌",
      (err, data) => {
        if (err) {
          console.log("Something went wrong in figlet...");
          return;
        }
        console.log(data);
      }
    );
  } else {
    figlet(
      `S e r v e r   c o n n e c t e d   o n  \np o r t :  ${configs.PORT}`,
      (err, data) => {
        if (err) {
          console.log("Something went wrong in figlet...");
          return;
        }
        console.log(data);
      }
    );
  }
}
)

export default app;