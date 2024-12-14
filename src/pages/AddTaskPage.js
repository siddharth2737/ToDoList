import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../features/tasksSlice';
import { useNavigate } from 'react-router-dom';

const AddTaskPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [task, setTask] = useState({
    title: '',
    description: '',
    status: 'pending',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addTask(task));
    navigate('/');
  };

  return (
    <div>
      <h1>Add New Task</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={task.title}
          onChange={handleChange}
          placeholder="Task Title"
        />



        <textarea
          name="description"
          value={task.description}

                     onChange={handleChange}
          placeholder="Task Description"

        />
        <select name="status" value={task.status} onChange={handleChange}>
          <option value="pending">Pending</option>

          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
          
        </select>
        <button type="submit">Add Task</button>
      </form>
    </div>
  );
};

export default AddTaskPage;
