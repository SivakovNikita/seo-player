import { ClerkProvider, SignInButton, SignedIn, SignedOut, UserButton, SignUpButton, useSignIn } from '@clerk/nextjs';
import { useRouter } from 'next/router';

const SignInForm = () => {
  const { signIn } = useSignIn();
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    const email = formData.get('email');
    const password = formData.get('password');

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
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">Email</label>
      <input id="email" name="email" placeholder="email" type="email" required />

      <label htmlFor="password">Password</label>
      <input id="password" name="password" placeholder="password" type="password" required />
      <SignInButton forceRedirectUrl="/admin">
        <button type="submit">Sign In</button>
      </SignInButton>
    </form>
  );
};

export default SignInForm;
