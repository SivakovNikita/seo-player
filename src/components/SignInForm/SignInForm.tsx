import { SignInButton, useSignIn } from '@clerk/nextjs';
import { useRouter } from 'next/router';
import styles from './SignInForm.module.scss';

const SignInForm = () => {
  const { signIn } = useSignIn();
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    const email = String(formData.get('email')) ?? '';
    const password = String(formData.get('password')) ?? '';

    if (!signIn) {
      console.error('signIn is undefined');
      return;
    }

    try {
      const result = await signIn.create({
        identifier: email,
        password,
      });

      if (result.status === 'complete') {
        console.log('User signed in!', result);
        router.push('/admin');
      } else {
        console.log('Additional steps required', result);
      }
    } catch (error) {
      console.error('Sign-in error:', error.errors[0]?.message || error.message);
    }
  };

  return (
    <div className={styles.form_container}>
      <div className={styles.form_wrapper}>
        <h1 className={styles.form_header}>Вход в админ. панель</h1>
        <br></br>
        <form onSubmit={handleSubmit} className={styles.signin_form}>
          <div className={styles.input_wrapper}>
            <label htmlFor="email">Почтовый адрес</label>
            <input
              className={styles.signin_input}
              id="email"
              name="email"
              placeholder="admin@zvuk.com"
              type="email"
              required
            />
          </div>

          <label htmlFor="password">Пароль</label>
          <input
            className={styles.signin_input}
            id="password"
            name="password"
            placeholder="password"
            type="password"
            required
          />
          <SignInButton forceRedirectUrl="/admin">
            <button className={styles.button} type="submit">
              Войти
            </button>
          </SignInButton>
        </form>
      </div>
    </div>
  );
};

export default SignInForm;
