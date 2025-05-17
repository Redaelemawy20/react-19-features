import { useActionState } from 'react';

export default function FormUseActionState() {
  const [state, formAction, isPending] = useActionState(sendEmail, null);
  console.log(state);
  return (
    <form action={formAction}>
      <input type="text" name="name" />
      <input type="email" name="email" />
      <button type="submit" disabled={isPending}>
        Submit
      </button>
      {isPending && <p>Sending...</p>}
    </form>
  );
}

async function sendEmail(state: unknown, formData: FormData) {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const name = formData.get('name');
  const email = formData.get('email');
  console.log(name, email);
  return { success: true };
}
