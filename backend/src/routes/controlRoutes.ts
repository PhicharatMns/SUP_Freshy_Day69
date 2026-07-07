import { Hono } from "hono";
import { getControl, updateControl } from "../controllers/controlController.js";

const controlRoutes = new Hono();

controlRoutes.get("/control", getControl);
controlRoutes.put("/control", updateControl);

export default controlRoutes;
