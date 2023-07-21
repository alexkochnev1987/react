import { PlanResponse, deletePlan, getPlansCollection } from '@/db/plans';
import { useUserUiid } from '@/shared/hooks/useUserUiid';
import { useState } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';

export const usePlanData = () => {
  const userUiid = useUserUiid();
  const [value, loading, error] = useCollection(getPlansCollection(userUiid));
  const plans = value?.docs.map((doc) => ({ id: doc.id, ...doc.data() } as PlanResponse));
  const [isOpen, setIsOpen] = useState(false);
  const [planId, setPlanId] = useState('');
  const deleteMyPlan = () => {
    deletePlan(userUiid, planId);
    setIsOpen(false);
  };
  const closeDialog = () => setIsOpen(false);
  const openDialog = (id: string) => {
    setPlanId(id);
    setIsOpen(true);
  };

  return { plans, isOpen, closeDialog, openDialog, deleteMyPlan, loading, error };
};
