import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks, deleteTask } from '../features/tasksSlice';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.tasks);
  const status = useSelector((state) => state.tasks.status);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchTasks());
    }
  }, [dispatch, status]);

  const handleDelete = (id) => {
    dispatch(deleteTask(id));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-4">To-Do List</h1>
      <div className="text-center mb-4">
        <Link to="/add" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">
          Add Task
        </Link>
      </div>
      <ul className="space-y-4">
        {tasks.map((task) => (
          <li key={task.id} className="p-4 border rounded shadow-md bg-white">
            <h3 className="text-xl font-semibold">{task.title}</h3>
            <p>{task.description}</p>
            <p>Status: {task.status}</p>



            <div className="flex space-x-4">
              <Link
                to={`/edit/${task.id}`}

                
                className="text-blue-500 hover:text-blue-700"
              >
                Edit
              </Link>
              <button
                onClick={() => handleDelete(task.id)}
                className="text-red-500 hover:text-red-700"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
