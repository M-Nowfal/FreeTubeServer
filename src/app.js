import express from "express";
import cors from "cors";
import { 
  addHistory, clearHistory, 
  createAccount, getHistory, 
  login, removeHistory 
} from "./controller.js";

export const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  methods: ["POST", "GET", "DELETE"]
}));
app.use(express.json());

app.post("/api/create", createAccount);
app.post("/api/login", login);

app.get("/api/history", getHistory);
app.post("/api/history", addHistory);
app.delete("/api/history", removeHistory);

app.delete("/api/clear", clearHistory);
