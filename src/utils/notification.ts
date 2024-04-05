'use client';
import { toast } from '~/components/ui/use-toast';

const notificationProps = {
  duration: 3000
};

export const showSuccessNotification = (message: string) => {
  toast({
    description: message,
    ...notificationProps
  });
};

export const showErrorNotification = (message: string) => {
  toast({
    description: message,
    variant: 'destructive',
    ...notificationProps
  });
};

export const showInfoNotification = (message: string) => {
  toast({
    description: message,
    ...notificationProps
  });
};
