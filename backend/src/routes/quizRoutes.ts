import { Request, Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

// Middleware to get the logged-in teacher's ID
const getTeacherId = (req: Request): number => {
  // Replace this with real user handling logic
  return 1;//since we are not using jwt 
};

// Create Quiz
router.post("/", async (req: Request, res: any) => {
  const { title, description } = req.body;
  const teacherId = getTeacherId(req);

  if (!title || !description) {
    return res.status(400).json({ error: "Title and description are required" });
  }

  const quiz = await prisma.quiz.create({ data: { title, description, teacherId } });
  res.json(quiz);
});

// Get all quizzes created by the logged-in teacher
router.get("/", async (req, res) => {
  const teacherId = getTeacherId(req);
  const quizzes = await prisma.quiz.findMany({ where: { teacherId } });
  res.json(quizzes);
});

// Get a single quiz
router.get("/:id", async (req: Request, res: any) => {
  const quiz = await prisma.quiz.findUnique({ where: { id: Number(req.params.id) } });
  if (!quiz) return res.status(404).json({ error: "Quiz not found" });
  res.json(quiz);
});

// Update a quiz
router.put("/:id", async (req, res) => {
  const { title, description } = req.body;
  const quiz = await prisma.quiz.update({
    where: { id: Number(req.params.id) },
    data: { title, description },
  });
  res.json(quiz);
});

// Delete a quiz
router.delete("/:id", async (req, res) => {
  await prisma.quiz.delete({ where: { id: Number(req.params.id) } });
  res.json({ message: "Quiz deleted" });
});

export default router;
