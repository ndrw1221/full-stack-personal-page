import React, { useState, useEffect } from 'react';

// const people = [
//     {
//       username: 'Leslie Alexander',
//       id: 'leslie.alexander@example.com',
//     },
//     {
//       username: 'Michael Foster',
//       id: 'michael.foster@example.com',
//     },
//     {
//       username: 'Dries Vincent',
//       id: 'dries.vincent@example.com',
//     },
//     {
//       username: 'Lindsay Walton',
//       id: 'lindsay.walton@example.com',
//     },
//     {
//       username: 'Courtney Henry',
//       id: 'courtney.henry@example.com',
//     },
//     {
//       username: 'Tom Cook',
//       id: 'tom.cook@example.com',
//     },
// ]
  
export default function Users() {

    const [users, setUsers] = useState([]);

  // Fetch users from the backend when the component mounts
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/v1/users');
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const data = await response.json();
        setUsers(data); // Update the state with the fetched users
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchUsers();
    console.log(users);
  }, []); // The empty dependency array means this effect runs once on mount

    return (
        <ul role="list" className="divide-y mx-60 mt-16 divide-gray-100">
        {users.map((user) => (
            <li key={user.id} className="flex justify-between gap-x-6 py-5">
            <div className="flex min-w-0 gap-x-4">
                <div className="flex min-w-0 flex-auto items-center gap-x-4">
                <p className="mt-1 truncate text-xs leading-5 text-gray-500">{user.id}</p>
                <p className="text-sm font-semibold leading-6 text-gray-900">{user.name}</p>
                </div>
            </div>
            </li>
        ))}
        </ul>
    )
}
  