import LoginForm from '~/app/(auth)/login/login-form';

function LoginPage() {
  return (
    <div>
      <h1 className='text-center text-xl font-semibold'>Đăng nhập</h1>
      <div className='flex w-full justify-center'>
        <LoginForm />
      </div>
    </div>
  );
}

export default LoginPage;
