"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { BookOpenCheck } from "lucide-react"
import { toast } from "sonner"
import type { User } from "@/types"
import axios from "axios"

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

const DEMO_CREDENTIALS = {
  username: "login-user-1",
  password: "password123",
}

interface LoginPageProps {
  onLogin: (user: User) => void
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const response = await axios.post(`${BACKEND_URL}/auth/login`, {
        username,
        password,
      })

      if (response.status === 200) {
        onLogin(response.data)
        toast.success("Login successful!", {
          description: "You are now logged in.",
        })
      }
    } catch (error) {
      console.error("Login error:", error)
      toast.error("Invalid credentials", {
        description: "Please check your username and password.",
      })
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-white">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 flex flex-col items-center">
          <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mb-4">
            <BookOpenCheck className="w-6 h-6 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold text-center text-black">Welcome to Quizo</CardTitle>
          <p className="text-sm text-gray-600 text-center">Sign in to manage your quizzes</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="border-gray-300 focus:border-black"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="border-gray-300 focus:border-black"
              />
            </div>
            <Button type="submit" className="w-full bg-black text-white hover:bg-gray-800">
              Sign In
            </Button>
          </form>

          <div className="mt-6 p-4 bg-gray-100 rounded-lg">
            <p className="text-sm font-medium text-center mb-2 text-black">Demo Credentials</p>
            <p className="text-sm text-gray-600">
              Username: {DEMO_CREDENTIALS.username}
              <br />
              Password: {DEMO_CREDENTIALS.password}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

