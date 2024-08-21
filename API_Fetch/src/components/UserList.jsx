// src/components/UserList.js
import React, { useState, useEffect } from 'react';

export default function UserList(){
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

  if (loading) return <div className="text-center text-blue-500">Loading...</div>;
  if (error) return <div className="text-center text-red-500">Error: {error}</div>;

  return (
    <>
    <div className="max-w-lg mx-auto p-4">
      <h1 className="text-xl font-bold mb-4 text-gray-800">User List</h1>
      <ul className="list-disc pl-5">
        {users.map(user => (
          <li key={user.id} className="py-1 text-gray-700 hover:bg-gray-200 rounded-md px-2">
            {user.name}
          </li>
        ))}
      </ul>
    </div>
    </>
  );
};

// export default UserList;
