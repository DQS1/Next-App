'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useAppDispatch } from '~/app/hooks/useAppDispatch';
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
import { registerAction } from '~/features/register/registerSlice';
import {
  RegisterBody,
  RegisterBodyType
} from '~/schemaValidations/auth.schema';

function RegisterForm() {
  const dispatch = useAppDispatch();

  const form = useForm<RegisterBodyType>({
    resolver: zodResolver(RegisterBody),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof RegisterBody>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    dispatch(registerAction.registerAccount(values));
  }
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
        <Button type='submit' className='!mt-8 w-full'>
          Đăng kí
        </Button>
      </form>
    </Form>
  );
}

export default RegisterForm;
