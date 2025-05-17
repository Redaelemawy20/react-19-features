import { useActionState } from 'react';
import styles from './styles.module.css';

export default function FormUseActionState() {
  const [state, formAction, isPending] = useActionState(sendEmail, null);
  console.log(state);
  return (
    <div className={styles.componentContainer}>
      <h2 className={styles.title}>Form with useActionState</h2>
      <form action={formAction}>
        <input
          type="text"
          name="name"
          className={styles.inputField}
          placeholder="Name"
        />
        <input
          type="email"
          name="email"
          className={styles.inputField}
          placeholder="Email"
        />
        <div className={styles.buttonContainer}>
          <button type="submit" disabled={isPending} className={styles.button}>
            Submit
          </button>
        </div>
        {isPending && <p className={styles.pendingMessage}>Sending...</p>}
      </form>
    </div>
  );
}

async function sendEmail(state: unknown, formData: FormData) {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const name = formData.get('name');
  const email = formData.get('email');
  console.log(name, email);
  return { success: true };
}
