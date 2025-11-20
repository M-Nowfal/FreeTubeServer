import { User } from "./model.js";
import bcryptjs from "bcryptjs";

export const createAccount = async (req, res) => {
  try {
    const { username, password, confirmPassword, history } = req.body;

    if (password.length <= 6)
      return res.status(401).json({ message: "Password is too short" });

    if (password !== confirmPassword)
      return res.status(401).json({ message: "Password do not match" });

    const isExistingUser = await User.findOne({ username });
    if (isExistingUser)
      return res.status(400).json({ message: "Username already exist, use different username" });

    const hashedPassword = await bcryptjs.hash(password, await bcryptjs.genSalt(12));
    await User.create({ username, password: hashedPassword, history });

    res.status(201).json({ message: "Account created successfully!" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user)
      return res.status(404).json({ message: "User not found" });

    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Incorrect password" });

    res.json({ message: "LoggedIn Successfully!", user });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export const getHistory = async (req, res) => {
  try {
    const { username } = req.query;

    const user = await User.findOne({ username });

    if (!user)
      return res.status(404).json({ message: "User not found" });

    res.status(200).json({ history: user.history.reverse() });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export const addHistory = async (req, res) => {
  try {
    const { username, url, title } = req.body;

    const user = await User.findOneAndUpdate(
      { username },
      { $addToSet: { history: { url, title } } },
      { new: true }
    );

    if (!user)
      return res.status(404).json({ message: "User not found" });

    res.status(201).json({ message: "History added", history: user.history.reverse() });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export const removeHistory = async (req, res) => {
  try {
    const { username, url, title } = req.body;
    const user = await User.findOneAndUpdate(
      { username },
      { $pull: { history: { url, title } } },
      { new: true }
    );

    if (!user)
      return res.status(404).json({ message: "User not found" });

    res.status(200).json({ message: "History removed", history: user.history });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export const clearHistory = async (req, res) => {
  try {
    const { username } = req.body;
    const user = await User.findOneAndUpdate(
      { username },
      { $set: { history: [] } },
      { new: true }
    );

    if (!user)
      return res.status(404).json({ message: "User not found" });

    res.status(200).json({ message: "History cleared", user });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
}