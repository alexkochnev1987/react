import { FirebaseError } from '@/widgets/FirebaseError';
import { CenteredLoader } from '@/shared/ui/CenteredLoader';
import { FirestoreError } from 'firebase/firestore';
import { FC, ReactNode } from 'react';
import { SerializedError } from '@reduxjs/toolkit';

interface HandleDataWrapperProps {
  children?: ReactNode;
  loading: boolean;
  error: FirestoreError | undefined | string | null;
}

export const HandleDataWrapper: FC<HandleDataWrapperProps> = ({ loading, error, children }) => {
  if (loading) {
    return <CenteredLoader />;
  }
  if (error instanceof FirestoreError) {
    return <FirebaseError message={error.message} />;
  }

  if (typeof error === 'string') {
    return <FirebaseError message={error} />;
  }

  return <>{children}</>;
};
