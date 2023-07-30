import { PlanResponse, getPlanDocRef, updatePlan } from '@/db/plans';
import { AllDrawType } from '@/features/DrawExercise/lib/helpers';
import { Timestamp } from 'firebase/firestore';
import { useDocument } from 'react-firebase-hooks/firestore';
import { useParams } from 'react-router-dom';

export const useEventsData = () => {
  const params = useParams();
  const id = params.id as string;
  const [value, loading, error] = useDocument(getPlanDocRef(id));

  const calendar = value ? ({ id: value.id, ...value?.data() } as PlanResponse) : undefined;
  const editPlanName = (
    name: string | string[] | AllDrawType | undefined | Timestamp | boolean,
  ) => {
    if (name && typeof name === 'string') updatePlan(id, name);
  };
  return { editPlanName, calendar, loading, error };
};
