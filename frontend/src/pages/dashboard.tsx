"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Plus, MoreVertical, PencilIcon, Trash2Icon, LogOut } from "lucide-react"
import type { User, Quiz } from "@/types"
import { format, isValid, parseISO } from "date-fns"

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

interface DashboardProps {
  user: User
  onLogout: () => void
  onEditQuiz: (quizId: string) => void
}

export function Dashboard({ user, onLogout, onEditQuiz }: DashboardProps) {
  const [quizzes, setQuizzes] = useState<Quiz[]>([])

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/quizzes`)
      .then((response) => {
        setQuizzes(response.data)
      })
      .catch((error) => {
        console.error("Error fetching quizzes:", error)
      })
  }, [])

  const handleDeleteQuiz = (quizId: string) => {
    axios
      .delete(`${BACKEND_URL}/quizzes/${quizId}`)
      .then(() => {
        setQuizzes(quizzes.filter((quiz) => quiz.id !== quizId))
      })
      .catch((error) => {
        console.error("Error deleting quiz:", error)
      })
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <header className="bg-white shadow-sm w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-black">Welcome, {user.name}</h1>
            <p className="text-sm text-gray-600">Manage your quizzes</p>
          </div>
          <div className="flex items-center gap-4">
            <Button onClick={() => onEditQuiz("new")} className="text-white gap-2 bg-black hover:bg-gray-800">
              <Plus className="w-4 h-4" />
              Create Quiz
            </Button>
            <Button variant="outline" onClick={onLogout} className="gap-2 border-gray-300 hover:bg-gray-100">
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {quizzes.map((quiz, index) => {
            const createdAt = quiz.createdAt ? parseISO(quiz.createdAt) : null
            const formattedDate =
              createdAt && isValid(createdAt) ? format(createdAt, "MMM d, yyyy") : "Date not available"

            return (
              <Card
                key={quiz.id}
                className="relative bg-white border border-gray-200 hover:shadow-md transition-all duration-300"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg font-bold text-black hover:text-gray-600 transition-colors">
                      {quiz.title}
                    </CardTitle>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-gray-100">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="bg-black text-white">
                        <DropdownMenuItem onClick={() => onEditQuiz(quiz.id)} className="hover:bg-white hover:text-black">
                          <PencilIcon className="w-4 h-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDeleteQuiz(quiz.id)}
                          className="text-red-600 hover:bg-red-50"
                        >
                          <Trash2Icon className="w-4 h-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">{quiz.description}</p>
                  <p className="text-xs text-gray-400">Created on {formattedDate}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </main>
    </div>
  )
}

