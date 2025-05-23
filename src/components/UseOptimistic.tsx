import { useState } from 'react';

export default function UseOptimistic() {
  const [username, setUsername] = useState('');
  const [users, setUsers] = useState<string[]>(['John', 'Jane', 'Jim', 'Jill']);
  const [isLoading, setIsLoading] = useState(false);
  const handleAddUser = async () => {
    setIsLoading(true);
    await createUser(username);
    setUsers([...users, username]);
    setUsername('');
    setIsLoading(false);
  };
  return (
    <form>
      <h1>Without Optimistic</h1>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button onClick={handleAddUser} disabled={isLoading}>
        {isLoading ? 'Adding...' : 'Add User'}
      </button>
      <br />
      <h2>Users</h2>
      <div>
        {users.map((user) => (
          <div key={user}>{user}</div>
        ))}
      </div>
    </form>
  );
}

// simulate create user api call
const createUser = (username: string) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(username);
    }, 5000);
  });
};
