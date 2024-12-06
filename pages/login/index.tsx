import { ClerkProvider } from '@clerk/nextjs';
import SignInForm from '../../src/components/SignInForm/SignInForm';

const Login = () => {
  return (
    <ClerkProvider publishableKey={process.env.NEXTPUBLIC_CLERK_PUBLISHABLE_KEY}>
      <SignInForm />
    </ClerkProvider>
  );
};

export default Login;
