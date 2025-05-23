import { useActionState, useOptimistic, useState } from 'react';
import styles from './styles.module.css';

interface User {
  id: number;
  name: string;
}
interface OptimisticUser extends User {
  pending?: boolean;
}

export default function UseOptimistic() {
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
  const handleAddUser = async (prevState: unknown, formData: FormData) => {
    const username = formData.get('username') as string;
    if (!username.trim()) return;
    try {
      console.log('sending');
      setError(null);
      console.log('adding optimistic user');
      addOptimisticUser({
        id: Math.floor(Math.random() * 1000000), // integer number
        name: username,
        pending: true,
      });
      console.log('creating user');
      await createUser(username);
      console.log('user created');
      setConfirmedUsers((prev) => [
        ...prev,
        { id: prev.length + 1, name: username },
      ]);
    } catch (error) {
      console.log('error');
      setError('Failed to add user. Please try again.');
      console.log(error);
    }
  };
  const [state, formAction, isPending] = useActionState(handleAddUser, null);

  return (
    <div className={styles.componentContainer}>
      <h2 className={styles.title}>
        With Optimistic Updates - using form action
      </h2>
      {error && <div className={styles.error}>{error}</div>}
      <form action={formAction}>
        <input type="text" name="username" className={styles.inputField} />
        <button type="submit" className={styles.button} disabled={isPending}>
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
