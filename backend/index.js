import express from "express";
import figlet from "figlet";
import cookieParser from "cookie-parser";
import configs from "./configs/index.configs.js";
import Db_Connect from "./services/connectDb.js";
import frontendRoute from "./routes/v2/index.routes.v2.js";
import apiRoutes from "./routes/v1/index.routes.v1.js";

const app = express();

// Connect Database...
const db_URI =
  configs.ENV === "development" ? configs.DB_URI : configs.MONGODB_URI;
Db_Connect(db_URI);

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});
app.use(express.static("public"));

//view engine
app.set("view engine", "ejs");

// Frontend entrypoint...
app.use("/", frontendRoute);

// Apis entry point...
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
});
