import { useActionState, startTransition } from 'react';

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
    <div
      style={{
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        marginTop: '20px',
      }}
    >
      <h2>Counter with useActionState</h2>
      <p>Current count: {state?.count}</p>
      <div style={{ display: 'flex', gap: '10px' }}>
        <button onClick={handleDecrement} disabled={isPending}>
          Decrement
        </button>
        <button onClick={handleIncrement} disabled={isPending}>
          Increment
        </button>
      </div>
      {isPending && <p>Updating...</p>}
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
