import { Router, Request, Response } from "express";

const router = Router();

const DEMO_CREDENTIALS = { username: "login-user-1", password: "password123" };

router.post("/login", (req: Request, res: any)  => {
  const { username, password } = req.body;
  console.log(username, password);
  if (username === DEMO_CREDENTIALS.username && password === DEMO_CREDENTIALS.password) {
    res.status(200).json({ username: DEMO_CREDENTIALS.username});
  } else {
    res.status(401).json({ error: "Invalid credentials" });
  }
}) ;

export default router;
