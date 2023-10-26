import express from "express";
import { verifieToken } from "../middlewares/auth.js";

import { signup, allPlayers, deletePlayer, putPlayer, sign, findPlayerById, updatePlayer } from "../controllers/player.controller.js";

const router = express.Router()

router.post("/signup", signup);

router.post("/sign", sign);

router.get("/all", allPlayers);

router.get("/detail/:id", findPlayerById);


router.delete("/delete/:id", deletePlayer);

router.put("/update/:id", putPlayer );

export default router;