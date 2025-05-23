import { useState } from 'react';
import styles from './styles.module.css';

export default function UseOptimistic() {
  const [username, setUsername] = useState('');
  const [users, setUsers] = useState<string[]>(['John', 'Jane', 'Jim', 'Jill']);
  const [isLoading, setIsLoading] = useState(false);
  const handleAddUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    await createUser(username);
    setUsers([...users, username]);
    setUsername('');
    setIsLoading(false);
  };
  return (
    <div className={styles.componentContainer}>
      <h2 className={styles.title}>Without Optimistic</h2>
      <form onSubmit={handleAddUser}>
        <input
          type="text"
          className={styles.inputField}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button
          type="submit"
          disabled={isLoading}
          className={styles.button}
          //   onClick={handleAddUser}
        >
          {isLoading ? 'Adding...' : 'Add User'}
        </button>
      </form>
      <h2>Users</h2>
      <div className={styles.userList}>
        {users.map((user) => (
          <div key={user}>{user}</div>
        ))}
      </div>
    </div>
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
