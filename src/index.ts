import express, { json, urlencoded } from "express";

import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";
import authRoute from "./routes/auth.route";
import postsRoute from "./routes/posts.route";
import catchErros from "./middlewares/catchErrors";

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials:true
    
  })
);
app.use(urlencoded({ extended: true }));
app.use(json());
app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/posts", postsRoute);

app.use(catchErros);

app.listen(3000, () => {
  console.log("Server Listening on port ", 3000);
});
