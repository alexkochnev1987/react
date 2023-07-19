import { useState } from 'react';
import { deletePlan, getPlansCollection } from '../db/plans';
import { useCollection } from 'react-firebase-hooks/firestore';
import { NavLink } from 'react-router-dom';
import { Button, IconButton, Link } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { SubmitDialog } from '../components/dialogs/exercise-dialog/submit-dialog';

import { RoutePath } from '@/app/providers/RouterProvider/config/constants';
import { useAppSelector } from '@/store/hooks';
import { selectUser } from '@/store/slices/userSlice';
import { getEventsCollectionLink } from '@/db/events';
const deleteDialogContent = {
  title: 'Вы хотите удалить план',
  message: 'План будет удалено безвозвратно',
  submit: 'Подтвердить',
  cancel: 'Отмена',
};

const Plan = () => {
  const userUiid = useAppSelector(selectUser);
  const [plans, loading, error] = useCollection(getPlansCollection(userUiid));
  const [openDialog, setOpenDialog] = useState(false);
  const [planId, setPlanId] = useState('');
  const deleteMyPlan = () => {
    setOpenDialog(false);
    deletePlan(userUiid, planId);
  };

  return (
    <>
      <SubmitDialog
        content={deleteDialogContent}
        open={openDialog}
        submit={deleteMyPlan}
        onClose={() => {
          setOpenDialog(false);
        }}
      />
      {plans &&
        plans.docs.map((x) => (
          <span key={x.id}>
            <Button>
              <Link component={NavLink} to={RoutePath.plan + RoutePath.main + x.id}>
                {(x.data() as { name: string }).name}
              </Link>
            </Button>
            <IconButton
              color="error"
              onClick={() => {
                setPlanId(x.id);
                setOpenDialog(true);
              }}
            >
              <DeleteForeverIcon />
            </IconButton>
          </span>
        ))}
    </>
  );
};

export default Plan;
