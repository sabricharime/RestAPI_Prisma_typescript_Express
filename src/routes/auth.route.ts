import { Router } from "express";
import { auth } from "../controllers/auth.controller";
import { verifyUser } from "../middlewares/user.protectRoutes";

const authRoute = Router();
authRoute.post("/register", auth.register);
authRoute.post("/login", auth.login);
authRoute.post("/logout", (req, res) => {
  res.cookie("jwt", "").send("logged out ");
});

authRoute.get("/me",verifyUser ,  auth.getMyprofile);

export default authRoute;
