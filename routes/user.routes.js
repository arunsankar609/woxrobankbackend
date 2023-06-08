import express from "express";
import { createUser,login,getUserById, updateAmount,getAmount } from "../controllers/user.controller.js";

const router = express.Router();

router.route("/signup").post(createUser);
router.route("/login").post(login);
router.route("/userbyid").get(getUserById);
router.route("/addamount").post(updateAmount)

router.get("/getamount/:id",getAmount)



export default router