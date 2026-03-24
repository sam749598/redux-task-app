import TodoApp from "./features/task/TodoApp"

function App() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #0f0c29 0%, #302b63 40%, #24243e 70%, #0f0c29 100%)' }}
    >
      {/* Floating orbs */}
      <div className="absolute top-[-10%] left-[-5%] w-96 h-96 rounded-full opacity-30 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, #7c3aed, transparent)' }} />
      <div className="absolute bottom-[-10%] right-[-5%] w-80 h-80 rounded-full opacity-25 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, #ec4899, transparent)' }} />
      <div className="absolute top-[50%] left-[60%] w-64 h-64 rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, #06b6d4, transparent)' }} />

      <TodoApp />
    </div>
  )
}

export default App