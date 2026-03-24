import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";



const taskAdapter=createEntityAdapter();

const taskSlice=createSlice({
    name:"tasks",
    initialState:taskAdapter.getInitialState(),
    reducers:{
        taskAdded:taskAdapter.addOne,
        taskDelete:taskAdapter.removeOne,
        taskUpdate:taskAdapter.updateOne
    }
});


export const {taskAdded,taskDelete,taskUpdate}=taskSlice.actions;
export const {slectAll:selectAllTasks}=taskAdapter.getSelectors;
export default taskSlice.reducer;

