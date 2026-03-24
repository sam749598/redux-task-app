import { apiSlice } from "../api/apiSlice";

export const tasksApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getTasks: builder.query({
            query: () => '/tasks',
            providesTags: ['Task'],
        }),
        
        addTask: builder.mutation({
            query: (task) => ({
                url: '/tasks',
                method: 'POST',
                body: task,
            }),
            invalidatesTags: ['Task'],
        }),
       
        deleteTask: builder.mutation({
            query: (id) => ({
                url: `/tasks/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Task'],
        }),
        toggleTaskStatus: builder.mutation({
            query: ({ id, completed }) => ({
                url: `/tasks/${id}`,
                method: 'PATCH',
                body: { completed },
            }),
            async onQueryStarted({ id, completed }, { dispatch, queryFulfilled }) {
                const patchResult = dispatch(
                    apiSlice.util.updateQueryData('getTasks', undefined, (draft) => {
                        const task = draft.find(t => t.id === id);
                        if (task) task.completed = completed;
                    })
                );
                try {
                    await queryFulfilled;
                } catch {
                    patchResult.undo();
                }
            },
        }),
    }),
});


export const { 
    useGetTasksQuery, 
    useAddTaskMutation,     
    useDeleteTaskMutation,  
    useToggleTaskStatusMutation 
} = tasksApiSlice;
