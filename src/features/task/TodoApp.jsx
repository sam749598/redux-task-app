// import { useState } from 'react';
// import { useGetTasksQuery, useAddTaskMutation, useDeleteTaskMutation, useToggleTaskStatusMutation } from './tasksApiSlice';

// const TodoApp = () => {
//   const [newTask, setNewTask] = useState('');
//   const { data: tasks, isLoading } = useGetTasksQuery();
//   const [addTask] = useAddTaskMutation();
//   const [deleteTask] = useDeleteTaskMutation();
//   const [toggleTask] = useToggleTaskStatusMutation();

//   const handleAdd = async (e) => {
//     e.preventDefault();
//     if (!newTask.trim()) return;
//     await addTask({ title: newTask, completed: false });
//     setNewTask('');
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 py-10 px-4">
//       <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        
//         {/* Header */}
//         <div className="bg-indigo-600 p-6">
//           <h1 className="text-2xl font-bold text-white text-center">মডার্ন টাস্ক ম্যানেজার</h1>
//         </div>

//         {/* Input Form */}
//         <form onSubmit={handleAdd} className="p-6 border-b flex gap-2">
//           <input 
//             type="text" 
//             value={newTask}
//             onChange={(e) => setNewTask(e.target.value)}
//             placeholder="add your task..."
//             className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
//           />
//           <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-indigo-700 transition">
//            AddTask
//           </button>
//         </form>

//         {/* Task List */}
//         <div className="p-4 max-h-100 overflow-y-auto">
//           {isLoading ? (
//             <p className="text-center text-gray-500 italic">লোড হচ্ছে...</p>
//           ) : (
//             <ul className="space-y-3">
//               {tasks?.map((task) => (
//                 <li key={task.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-indigo-50 transition group">
//                   <div className="flex items-center gap-3">
//                     <input 
//                       type="checkbox" 
//                       className="w-5 h-5 cursor-pointer accent-indigo-600 rounded"
//                       checked={task.completed} 
//                       onChange={() => toggleTask({ id: task.id, completed: !task.completed })}
//                     />
//                     <span className={`text-lg font-medium ${task.completed ? 'line-through text-gray-400' : 'text-gray-700'}`}>
//                       {task.title}
//                     </span>
//                   </div>
//                   <button 
//                     onClick={() => deleteTask(task.id)}
//                     className="text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition p-2"
//                   >
//                     🗑️
//                   </button>
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TodoApp;





import { useState } from 'react';
import { useGetTasksQuery, useAddTaskMutation, useDeleteTaskMutation, useToggleTaskStatusMutation } from './tasksApiSlice';

const TodoApp = () => {
  const [newTask, setNewTask] = useState('');
  const { data: tasks, isLoading } = useGetTasksQuery();
  const [addTask] = useAddTaskMutation();
  const [deleteTask] = useDeleteTaskMutation();
  const [toggleTask] = useToggleTaskStatusMutation();

  const handleAdd = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!newTask.trim()) return;
    await addTask({ title: newTask, completed: false });
    setNewTask('');
  };

  const completed = tasks?.filter(t => t.completed).length ?? 0;
  const total = tasks?.length ?? 0;
  const progress = total ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="relative z-10 w-full max-w-5xl mx-auto px-4 py-10">

      {/* Top header */}
      <div className="mb-8">
        <p className="text-xs font-semibold text-violet-400 uppercase tracking-widest mb-1">Workspace</p>
        <div className="flex items-end justify-between">
          <h1 className="text-4xl font-black text-white">My Tasks</h1>
          <p className="text-zinc-500 text-sm mb-1">{completed} of {total} completed</p>
        </div>

        {/* Progress bar */}
        <div className="mt-3 h-1 bg-zinc-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-violet-500 rounded-full transition-all duration-700"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Input */}
      <form onSubmit={handleAdd} className="flex gap-3 mb-8">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task..."
          className="flex-1 bg-zinc-900 border border-zinc-700 text-white placeholder-zinc-500 rounded-xl px-5 py-3.5 text-sm focus:outline-none focus:border-violet-500 transition-colors"
        />
        <button
          type="submit"
          className="bg-violet-600 hover:bg-violet-500 active:scale-95 text-white font-bold px-7 py-3.5 rounded-xl transition-all text-sm"
        >
          Add Task
        </button>
      </form>

      {/* Task Grid */}
      {isLoading ? (
        <div className="flex items-center justify-center gap-3 py-20">
          <div className="w-5 h-5 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" />
          <span className="text-zinc-500 text-sm">Loading tasks…</span>
        </div>
      ) : total === 0 ? (
        <div className="text-center py-20">
          <p className="text-5xl mb-3">📋</p>
          <p className="text-zinc-500 text-sm">No tasks yet — add one above</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {tasks?.map((task, index) => (
            <div
              key={task.id}
              className={`group relative flex flex-col justify-between p-5 rounded-2xl border transition-all duration-200 min-h-36 ${
                task.completed
                  ? 'bg-amber-100 border-zinc-800'
                  : 'bg-amber-200 border-zinc-700 hover:border-violet-500/50 hover:bg-zinc-800/80'
              }`}
            >
              {/* Top row: number badge + delete */}
              <div className="flex items-start justify-between mb-4">
                <span className={`text-xs font-bold px-2 py-1 rounded-lg ${
                  task.completed
                    ? 'bg-zinc-800 text-zinc-100'
                    : 'bg-violet-500/15 text-violet-600'
                }`}>
                  #{String(index + 1).padStart(2, '0')}
                </span>

                <button
                  onClick={() => deleteTask(task.id)}
                  className="opacity-0 group-hover:opacity-100 text-zinc-600 hover:text-red-400 transition-all p-1 rounded-lg hover:bg-red-950"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Task title */}
              <p className={`text-sm font-semibold leading-snug flex-1 mb-4 ${
                task.completed ? 'line-through text-zinc-700' : 'text-zinc-900'
              }`}>
                {task.title}
              </p>

              {/* Bottom: checkbox + status */}
              <div className="flex items-center justify-between">
                <span className={`text-xs font-medium ${
                  task.completed ? 'text-zinc-700' : 'text-zinc-500'
                }`}>
                  {task.completed ? 'Done' : 'Pending'}
                </span>

                <button
                  onClick={() => toggleTask({ id: task.id, completed: !task.completed })}
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 shrink-0 ${
                    task.completed
                      ? 'bg-violet-600 border-violet-600 shadow-lg shadow-violet-500/20'
                      : 'border-zinc-600 hover:border-violet-400'
                  }`}
                >
                  {task.completed && (
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 10 8" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M1 4l3 3 5-5" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Footer count */}
      {total > 0 && (
        <p className="text-center text-xs text-zinc-200 mt-8 font-medium">
          {total - completed} task{total - completed !== 1 ? 's' : ''} remaining
        </p>
      )}
    </div>
  );
};

export default TodoApp;