import { useState } from 'react';
import { LoginPage } from '@/pages/login';
import { Dashboard } from '@/pages/dashboard';
import { CreateEditQuiz } from '@/pages/create-edit-quiz';
import { User } from '@/types';
import { Toaster } from 'sonner';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [editingQuiz, setEditingQuiz] = useState<string | null>(null);

  if (!user) {
    return (
      <>
        <LoginPage onLogin={setUser} />
        <Toaster />
      </>
    );
  }

  return (
    <>
      {editingQuiz ? (
        <CreateEditQuiz
          quizId={editingQuiz}
          onClose={() => setEditingQuiz(null)}
          user={user}
        />
      ) : (
        <Dashboard
          user={user}
          onLogout={() => setUser(null)}
          onEditQuiz={setEditingQuiz}
        />
      )}
      <Toaster />
    </>
  );
}

export default App;

// export default function App() {
//   return (
//     <div className="bg-blue-500 text-white text-3xl font-bold p-5">
//       Tailwind is working!
//     </div>
//   );
// }