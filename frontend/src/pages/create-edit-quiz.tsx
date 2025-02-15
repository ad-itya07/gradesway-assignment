"use client"

import type React from "react"

import { useState, useEffect } from "react"
import axios from "axios"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft } from "lucide-react"
import type { User } from "@/types"
import { toast } from "sonner"

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

interface CreateEditQuizProps {
  quizId: string
  onClose: () => void
  user: User
}

export function CreateEditQuiz({ quizId, onClose }: CreateEditQuizProps) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const isEditing = quizId !== "new"

  useEffect(() => {
    if (isEditing) {
      axios
        .get(`${BACKEND_URL}/quizzes/${quizId}`)
        .then((response) => {
          const quiz = response.data
          setTitle(quiz.title)
          setDescription(quiz.description)
        })
        .catch((error) => {
          toast.error("Error fetching quiz data", { description: error.message })
        })
    }
  }, [isEditing, quizId])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!title.trim() || !description.trim()) {
      toast.error("Validation Error", {
        description: "Please fill in all required fields.",
      })
      return
    }

    const quizData = { title, description }

    if (isEditing) {
      axios
        .put(`${BACKEND_URL}/quizzes/${quizId}`, quizData)
        .then(() => {
          toast.success("Quiz updated successfully!")
          onClose()
        })
        .catch((error) => {
          toast.error("Error updating quiz", { description: error.message })
        })
    } else {
      axios
        .post(`${BACKEND_URL}/quizzes`, { ...quizData, createdAt: new Date() })
        .then(() => {
          toast.success("Quiz created successfully!")
          onClose()
        })
        .catch((error) => {
          toast.error("Error creating quiz", { description: error.message })
        })
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <header className="bg-white shadow-sm w-full">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={onClose} className="gap-2 hover:bg-gray-100">
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-black">{isEditing ? "Edit Quiz" : "Create New Quiz"}</h1>
              <p className="text-sm text-gray-600">
                {isEditing ? "Update your quiz details" : "Create a new quiz for your students"}
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Quiz Title</Label>
            <Input
              id="title"
              placeholder="Enter quiz title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="border-gray-300 focus:border-black"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Enter quiz description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="min-h-[200px] border-gray-300 focus:border-black"
            />
          </div>
          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={onClose} className="border-gray-300 hover:bg-gray-100">
              Cancel
            </Button>
            <Button type="submit" className="bg-black text-white hover:bg-gray-800">
              {isEditing ? "Update Quiz" : "Create Quiz"}
            </Button>
          </div>
        </form>
      </main>
    </div>
  )
}

