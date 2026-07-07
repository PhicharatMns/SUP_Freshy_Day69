import { Hono } from "hono";
import { insertIg, selectIg, nextPopup, deleteIg } from "../controllers/igMyController.js";

const igMyRoutes = new Hono();

igMyRoutes.post("/insert-ig", insertIg);
igMyRoutes.get("/select-ig", selectIg);
igMyRoutes.get("/next-popup", nextPopup);
igMyRoutes.delete("/delete-ig/:id", deleteIg);

export default igMyRoutes;
