'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '~/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import { authAction } from '~/features/auth/authSlice';
import { useAppDispatch } from '~/hooks/useAppDispatch';
import { useAppSelector } from '~/hooks/useAppSelector';
import { clientSessionToken } from '~/lib/https';
import { RootState } from '~/redux/store';
import { LoginBody, LoginBodyType } from '~/schemaValidations/auth.schema';

function LoginForm() {
  const router = useRouter();

  const dispatch = useAppDispatch();
  const response: any = useAppSelector(
    (state: RootState) => state?.auth?.LoginResponse
  );

  const handleError = () => {
    const errors = response?.errors;
    if (errors) {
      errors.forEach((error: any) => {
        form.setError(error.field as 'email' | 'password', {
          type: 'server',
          message: error.message
        });
      });
    }
  };

  const form = useForm<LoginBodyType>({
    resolver: zodResolver(LoginBody),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  // 2. Define a submit handler.
  async function onSubmit(values: LoginBodyType) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    const payload = {
      values,
      onSuccess: () => {
        router.push('/user');
      }
    };
    dispatch(authAction.login(payload));
  }

  useEffect(() => {
    handleError();
  }, [response]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className=' w-full max-w-[500px] space-y-6'
        noValidate
      >
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem className='relative'>
              <FormLabel className='text-[#313624]'>Email</FormLabel>
              <FormControl>
                <Input type='email' {...field} />
              </FormControl>
              <FormMessage className='absolute bottom-[-22px]' />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem className='relative'>
              <FormLabel className='text-[#313624]'>Password</FormLabel>
              <FormControl>
                <Input type='password' {...field} />
              </FormControl>
              <FormMessage className='absolute bottom-[-22px]' />
            </FormItem>
          )}
        />
        <Button type='submit' className='!mt-8 w-full'>
          Đăng nhập
        </Button>
      </form>
    </Form>
  );
}

export default LoginForm;
