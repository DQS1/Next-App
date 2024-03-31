import RegisterForm from '~/app/(auth)/register/register-form';

function RegisterPage() {
  return (
    <div>
      <h1 className='text-center text-xl font-semibold'>Đăng kí</h1>
      <div className='flex w-full justify-center'>
        <RegisterForm />
      </div>
    </div>
  );
}

export default RegisterPage;
