import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { updateTask } from '../features/tasksSlice';

const EditTaskPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [task, setTask] = useState({
    id: '',
    title: '',
    description: '',
    status: 'pending',
  });

  useEffect(() => {
    
    

    setTask({ id, title: 'Task Example', description: 'Description', status: 'pending' });
  },
   [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateTask({ id: task.id, status: task.status }));
    navigate('/');
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Edit Task</h1>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-4">
        <h3 className="text-xl font-semibold">{task.title}</h3>
        <p>{task.description}</p>
        <select
          name="status"
          value={task.status}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
        >
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Update Task
        </button>
      </form>
    </div>
  );
};

export default EditTaskPage;
