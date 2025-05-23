import { useState } from 'react';
import styles from './styles.module.css';

export default function UseOptimistic() {
  const [username, setUsername] = useState('');
  const [users, setUsers] = useState<string[]>(['John', 'Jane', 'Jim', 'Jill']);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAddUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!username.trim()) return;

    const newUser = username;
    const previousUsers = [...users];

    setUsers([...users, newUser]);
    setUsername('');
    setIsLoading(true);
    setError(null);

    try {
      await createUser(newUser);
    } catch (error) {
      setUsers(previousUsers);
      setError('Failed to add user. Please try again.');
      console.error('Error adding user:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.componentContainer}>
      <h2 className={styles.title}>With Optimistic Updates</h2>
      {error && <div className={styles.error}>{error}</div>}
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
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate a 10% chance of API failure for demonstration
      if (Math.random() < 0.1) {
        reject(new Error('Network error'));
      } else {
        resolve(username);
      }
    }, 5000);
  });
};
