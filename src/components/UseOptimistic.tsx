import { startTransition, useOptimistic, useState } from 'react';
import styles from './styles.module.css';

interface User {
  id: number;
  name: string;
}
interface OptimisticUser extends User {
  pending?: boolean;
}

export default function UseOptimistic() {
  const [username, setUsername] = useState('');
  const [confirmedUsers, setConfirmedUsers] = useState<User[]>([
    { id: 1, name: 'John' },
    { id: 2, name: 'Jane' },
    { id: 3, name: 'Jim' },
    { id: 4, name: 'Jill' },
  ]);
  const [error, setError] = useState<string | null>(null);

  const [optimisticUsers, addOptimisticUser] = useOptimistic<
    OptimisticUser[],
    OptimisticUser
  >(confirmedUsers, (state, newUser) => [...state, newUser]);

  const handleAddUser = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    startTransition(async () => {
      if (!username.trim()) return;
      console.log('sending');
      const newUser = username.trim();
      setUsername('');
      setError(null);
      console.log('adding optimistic user');
      addOptimisticUser({
        id: optimisticUsers.length + 1,
        name: newUser,
        pending: true,
      });
      console.log('creating user');
      await createUser(newUser);
      console.log('user created');
      setConfirmedUsers((prev) => [
        ...prev,
        { id: prev.length + 1, name: newUser },
      ]);
    });
  };

  return (
    <div className={styles.componentContainer}>
      <h2 className={styles.title}>With Optimistic Updates</h2>
      {error && <div className={styles.error}>{error}</div>}
      <form>
        <input
          type="text"
          className={styles.inputField}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button type="submit" className={styles.button} onClick={handleAddUser}>
          Add User
        </button>
      </form>
      <h2>Users</h2>
      <div className={styles.userList}>
        {optimisticUsers.map((user) => (
          <div key={user.id} style={{ opacity: user.pending ? 0.5 : 1 }}>
            {user.name}
          </div>
        ))}
      </div>
    </div>
  );
}

// simulate create user api call
const createUser = (username: string) => {
  console.log('creating user in api');
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate a 10% chance of API failure for demonstration
      if (Math.random() < 0.1) {
        reject(new Error('Network error'));
      } else {
        console.log('user created in api');
        resolve(username);
      }
    }, 5000);
  });
};
