import { FallbackComponent } from '@/app/providers/ErrorBoundary/FallbackComponent';
import { FirebaseError } from '@/widgets/FirebaseError';
import { CenteredLoader } from '@/shared/ui/CenteredLoader';
import { FirestoreError } from 'firebase/firestore';
import { FC, ReactNode } from 'react';

interface HandleDataWrapperProps {
  children?: ReactNode;
  loading: boolean;
  error: FirestoreError | undefined;
}

export const HandleDataWrapper: FC<HandleDataWrapperProps> = ({ loading, error, children }) => {
  if (loading) {
    return <CenteredLoader />;
  }
  if (error instanceof FirestoreError) {
    return <FirebaseError error={error} />;
  }

  return <>{children}</>;
};
