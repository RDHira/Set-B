import React, { useState, useEffect } from 'react';

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <div className="text-center text-3xl mt-72 font-mono font-bold text-blue-500">Loading...</div>;
  if (error) return <div className="text-center text-4xl mt-72 font-mono font-bold text-red-500">Error: {error}</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center p-4">
      <div className="bg-white shadow-lg rounded-lg max-w-md w-full p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center uppercase font-serif">User List</h1>
        <ul className="space-y-4">
          {users.map(user => (
            <li 
              key={user.id} 
              className="flex items-center space-x-4 p-4 bg-gray-100 rounded-lg shadow hover:shadow-md hover:bg-gray-200 transition duration-300 ease-in-out"
            >
              <div className="flex-shrink-0">
                <div className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-semibold rounded-full h-10 w-10 flex items-center justify-center">
                  {user.name.charAt(0)}
                </div>
              </div>
              <div className="flex-grow">
                <p className="text-lg font-medium text-gray-700">{user.name}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
