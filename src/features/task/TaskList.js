import { useGetTasksQuery, useToggleTaskStatusMutation } from "./tasksApiSlice"



const TaskList=()=>{
    const {data:tasks,isLoading,isError}=useGetTasksQuery();
    const [toggleTask] = useToggleTaskStatusMutation();

    if (isLoading) return <p>Loading tasks...</p>;
    if (isError) return <p>Error loading tasks!</p>;

    return(
        <ul>
            {tasks.map((task)=>(
                <li kry={task.id}>
                    <input 
                      type="checkbox"
                      checked={task.completed}
                      onChange={()=>toggleTask({id:task.id, completed:!task.completed})}
                    />
                    {task.list}
                </li>
            ))}
        </ul>
    )
}