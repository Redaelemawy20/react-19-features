import { useActionState, startTransition } from 'react';
import styles from './styles.module.css';

export default function CounterUseActionState() {
  const initialState = { count: 0 };
  const [state, dispatchAction, isPending] = useActionState(
    counterAction,
    initialState
  );
  //  wen need to call the actions in startTransition
  const handleIncrement = () => {
    startTransition(() => {
      dispatchAction({ type: 'INCREMENT' });
    });
  };

  const handleDecrement = () => {
    startTransition(() => {
      dispatchAction({ type: 'DECREMENT' });
    });
  };

  return (
    <div className={styles.componentContainer}>
      <h2 className={styles.title}>Counter with useActionState</h2>
      <p>Current count: {state?.count}</p>
      <div className={styles.buttonContainer}>
        <button
          onClick={handleDecrement}
          disabled={isPending}
          className={styles.button}
        >
          Decrement
        </button>
        <button
          onClick={handleIncrement}
          disabled={isPending}
          className={styles.button}
        >
          Increment
        </button>
      </div>
      {isPending && <p className={styles.pendingMessage}>Updating...</p>}
    </div>
  );
}

async function counterAction(
  prevState: { count: number },
  action: { type: string }
) {
  // Simulate an API call or async operation
  await new Promise((resolve) => setTimeout(resolve, 500));

  switch (action.type) {
    case 'INCREMENT':
      return { count: prevState.count + 1 };
    case 'DECREMENT':
      return { count: prevState.count - 1 };
    default:
      return prevState;
  }
}
