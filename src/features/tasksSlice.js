import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Fetch tasks from API
export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
  const response = await axios.get('https://jsonplaceholder.typicode.com/todos');
  return response.data;
});

// Add a new task
export const addTask = createAsyncThunk('tasks/addTask', async (task) => {
  const response = await axios.post('https://jsonplaceholder.typicode.com/todos', task);
  return response.data;
});

// Update task status
export const updateTask = createAsyncThunk('tasks/updateTask', async ({ id, status }) => {
  const response = await axios.put(`https://jsonplaceholder.typicode.com/todos/${id}`, { status });
  return response.data;
});

// Delete task
export const deleteTask = createAsyncThunk('tasks/deleteTask', async (id) => {
  await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);
  return id;
});

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    tasks: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
    
      .addCase(fetchTasks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.tasks = action.payload;
      })
.addCase(fetchTasks.rejected, (state, action) => {
        state.status = 'failed';

        state.error = action.error.message;
 })
      .addCase(addTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const updatedTask = action.payload;
        const index = state.tasks.findIndex(task => task.id === updatedTask.id);
        if (index !== -1) {


    state.tasks[index] = updatedTask;
        }
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
state.tasks = state.tasks.filter(task => task.id !== action.payload);
      });
  },
});

export default tasksSlice.reducer;
