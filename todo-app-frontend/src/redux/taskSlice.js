import { createSlice } from "@reduxjs/toolkit";

export const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: [],
    isCompleted: false,
    taskVal: "",
    showModal: false,
  },
  reducers: {
    updateTasks: (state, action) => {
      state.tasks = action.payload;
    },
    updateCompletion: (state, action) => {
      state.isCompleted = action.payload;
    },
    updateTaskVal: (state, action) => {
      state.taskVal = action.payload;
    },
    updateShowModal: (state, action) => {
      state.showModal = action.payload;
    },
  },
});

export const { updateTasks, updateCompletion, updateTaskVal, updateShowModal } =
  taskSlice.actions;
export default taskSlice.reducer;
