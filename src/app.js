import express from "express";
import cors from "cors";
import { 
  addHistory, clearHistory, 
  createAccount, deleteAccount, getHistory, 
  login, removeHistory 
} from "./controller.js";
import { allowed_origin } from "./constant.js";

export const app = express();
app.use(cors({
  origin: allowed_origin,
  methods: ["POST", "GET", "DELETE"]
}));
app.use(express.json());

app.post("/api/create", createAccount);
app.delete("/api/delete", deleteAccount);
app.post("/api/login", login);

app.get("/api/history", getHistory);
app.post("/api/history", addHistory);
app.delete("/api/history", removeHistory);

app.delete("/api/clear", clearHistory);
