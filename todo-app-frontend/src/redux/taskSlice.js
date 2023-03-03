import { createSlice } from "@reduxjs/toolkit";

export const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: [],
    isCompleted: false,
    taskVal: "",
    editTaskVal: "",
    showModal: false,
    priorityAddToDo: "High",
    addToDoTaskName: undefined,
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
    updateEditTaskVal: (state, action) => {
      state.editTaskVal = action.payload;
    },
    updateShowModal: (state, action) => {
      state.showModal = action.payload;
    },
    updatePriorityAddToDo: (state, action) => {
      state.priorityAddToDo = action.payload;
    },
    updateAddToDoTaskName: (state, action) => {
      state.addToDoTaskName = action.payload;
    },
  },
});

export const {
  updateTasks,
  updateCompletion,
  updateTaskVal,
  updateShowModal,
  updateEditTaskVal,
  updatePriorityAddToDo,
  updateAddToDoTaskName,
} = taskSlice.actions;
export default taskSlice.reducer;
