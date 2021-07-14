import express from "express";
import { getUsers, createUser, getUser } from "../repositories/user.repository";
import bcrypt from 'bcrypt';
import { authenticateToken } from "../middleware/authorization";

const router = express.Router();

router.get("/",authenticateToken, async (_req, res) => {
  const response = await getUsers();
  return res.send(response);
});

router.post("/", async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10); //hash password 10 rounds
  req.body.password = hashedPassword;
  const response = await createUser(req.body);
  return res.send(response);
});

router.get("/:id", async (req, res) => {
  const response = await getUser(parseInt(req.params.id));
  if (!response) res.status(404).send({ message: "No user found" });
  return res.send(response);
});

export default router;