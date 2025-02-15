# Quizo - Quiz Management System

Quizo is a quiz management system that allows users to create, update, delete, and manage quizzes.

## Built With

**Frontend:** React, TypeScript, ShadCN UI  
**Backend:** TypeScript, Node.js, PostgreSQL, Prisma  
**Database:** PostgreSQL

## Getting Started

## Use deployement links:
Vercel link: https://gradesway-assignment-new.vercel.app/
Render link: https://gradesway-assignment.onrender.com

### Prerequisites

Ensure you have the following installed on your system:
- Node.js (v18+ recommended)
- PostgreSQL (Ensure a running PostgreSQL instance)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/quizo.git
   cd quizo
2. **Install Dependencies**
   ***backend*** 
   ```bash
     cd backend
     npm install
   
3. ***frontend*** 
   ```bash
     cd quizo-frontend
     npm install
4. **Configure Environment Variables**
   create a .env file in backend directory
   ```bash
     DATABASE_URL="your_neondb_url"
5. ***Run Database Migrations***
   ```bash
   cd backend
   npx prisma generate
   npx prisma migrate dev --name init

6. ***Start the developement server***
   ***backend*** 
   ```bash
     cd backend
     npm run dev
  ***frontend***
  ```bash
     cd quizo-frontend
     npm run dev
  
   
  
