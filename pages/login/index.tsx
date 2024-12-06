import { ClerkProvider } from '@clerk/nextjs';
import SignInForm from '../../src/components/SignInForm/SignInForm';

const Login = () => {
  return (
    <ClerkProvider>
      <SignInForm />
    </ClerkProvider>
  );
};

export default Login;
