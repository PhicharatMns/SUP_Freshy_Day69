import { Hono } from "hono";
import { submitQa, getQa, deleteQa } from "../controllers/qaController.js";

const qaRoutes = new Hono();

qaRoutes.post("/Qafrom", submitQa);
qaRoutes.get("/select-qa", getQa);
qaRoutes.delete("/delete-qa/:id", deleteQa);

export default qaRoutes;
