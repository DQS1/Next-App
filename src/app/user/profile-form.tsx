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
import { userAction } from '~/features/user/userSlice';
import { useAppDispatch } from '~/hooks/useAppDispatch';
import { useAppSelector } from '~/hooks/useAppSelector';
import { RootState } from '~/redux/store';
import {
  AccountResType,
  UpdateMeBody,
  UpdateMeBodyType
} from '~/schemaValidations/account.schema';

type ProfileForm = AccountResType['data'];

function ProfileForm({ profile }: { profile: ProfileForm }) {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const loading = useAppSelector(
    (state: RootState) => state?.user?.getUserLoading
  );

  const form = useForm<UpdateMeBodyType>({
    resolver: zodResolver(UpdateMeBody),
    defaultValues: {
      name: profile.name
    }
  });

  // 2. Define a submit handler.
  async function onSubmit(values: UpdateMeBodyType) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    const payload = {
      values,
      onSuccess: () => {
        router.refresh();
      }
    };
    dispatch(userAction.updateUser(payload));
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className=' w-full max-w-[500px] space-y-6'
        noValidate
      >
        <FormItem>
          <FormLabel>Email</FormLabel>
          <FormControl>
            <Input type='email' value={profile.email} readOnly />
          </FormControl>
        </FormItem>
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem className='relative'>
              <FormLabel className='text-[#313624]'>Name</FormLabel>
              <FormControl>
                <Input type='text' {...field} />
              </FormControl>
              <FormMessage className='absolute bottom-[-22px]' />
            </FormItem>
          )}
        />
        <Button disabled={loading} type='submit' className='!mt-8 w-full'>
          {loading && <ReloadIcon className='mr-2 h-4 w-4 animate-spin' />}
          Submit
        </Button>
      </form>
    </Form>
  );
}

export default ProfileForm;
