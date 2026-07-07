import { Hono } from "hono";
import { submitQa, getQa } from "../controllers/qaController.js";
const qaRoutes = new Hono();
qaRoutes.post("/Qafrom", submitQa);
qaRoutes.get("/select-qa", getQa);
export default qaRoutes;
