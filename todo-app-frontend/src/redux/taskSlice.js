import { createSlice } from "@reduxjs/toolkit";

export const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: [],
    isCompleted: false,
  },
  reducers: {
    updateTasks: (state, action) => {
      state.tasks = action.payload;
    },
    updateCompletion: (state, action) => {
      state.isCompleted = action.payload;
    },
  },
});

export const { updateTasks, updateCompletion } = taskSlice.actions;
export default taskSlice.reducer;
