import { ClerkProvider } from '@clerk/nextjs';
import SignInForm from '../../src/components/SignInForm/SignInForm';

const Login = () => {
  const PUBLISHABLE_KEY = 'pk_test_ZnVsbC1qb2V5LTgxLmNsZXJrLmFjY291bnRzLmRldiQ';

  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <SignInForm />
    </ClerkProvider>
  );
};

export default Login;
