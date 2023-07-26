import { RoutePath } from '@/app/providers/RouterProvider/config/constants';
import { PlanResponse, createPlan, deletePlan, getPlansCollection } from '@/db/plans';
import { useCollection } from 'react-firebase-hooks/firestore';
import { useNavigate } from 'react-router-dom';

export const usePlanData = (planId: string) => {
  const [value, loading, error] = useCollection(getPlansCollection());
  const navigate = useNavigate();
  const plans = value?.docs.map((doc) => ({ id: doc.id, ...doc.data() } as PlanResponse));

  const createNewPlan = async () => {
    const planId = await createPlan('Enter Plan Name');
    if (planId) {
      navigate(`${RoutePath.plan}/${planId.id}`);
    }
  };

  return { plans, deletePlan, createNewPlan, loading, error };
};
