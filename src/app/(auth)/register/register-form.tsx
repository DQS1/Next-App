'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { ReloadIcon } from '@radix-ui/react-icons';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
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
import { handleErrorApi } from '~/lib/utils';
import { RootState } from '~/redux/store';
import {
  RegisterBody,
  RegisterBodyType
} from '~/schemaValidations/auth.schema';

function RegisterForm() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const response: any = useAppSelector(
    (state: RootState) => state?.auth?.registerAccountResponse
  );

  const loading = useAppSelector(
    (state: RootState) => state?.auth?.registerAccountLoading
  );

  const form = useForm<RegisterBodyType>({
    resolver: zodResolver(RegisterBody),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  });

  const handleError = () => {
    const error = response?.errors.slice(0, 1)[0];
    console.log('🚀 ~ handleError ~ error:', error);
    if (error) {
      form.setError('email', {
        type: 'server',
        message: error.message
      });
    }
  };

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof RegisterBody>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    const payload = {
      values,
      onSuccess: () => {
        router.push('/user');
      }
    };
    dispatch(authAction.registerAccount(payload));
  }

  useEffect(() => {
    handleErrorApi({
      error: response,
      setError: form.setError
    });
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
          name='name'
          render={({ field }) => (
            <FormItem className='relative'>
              <FormLabel className='text-[#313624]'>Tên</FormLabel>
              <FormControl>
                <Input type='text' {...field} />
              </FormControl>
              <FormMessage className='absolute bottom-[-22px]' />
            </FormItem>
          )}
        />
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
        <FormField
          control={form.control}
          name='confirmPassword'
          render={({ field }) => (
            <FormItem className='relative'>
              <FormLabel className='text-[#313624]'>ConfirmPassword</FormLabel>
              <FormControl>
                <Input type='password' {...field} />
              </FormControl>
              <FormMessage className='absolute bottom-[-22px]' />
            </FormItem>
          )}
        />
        <Button disabled={loading} type='submit' className='!mt-8 w-full'>
          {loading && <ReloadIcon className='mr-2 h-4 w-4 animate-spin' />}
          Đăng kí
        </Button>
      </form>
    </Form>
  );
}

export default RegisterForm;
