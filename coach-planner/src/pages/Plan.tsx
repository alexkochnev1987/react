import React, { useState } from 'react';
import { createPlan, deletePlan, plansCollection } from '../db/plans';
import { useCollection } from 'react-firebase-hooks/firestore';
import { NavLink, Outlet } from 'react-router-dom';
import { Button, IconButton, Link } from '@mui/material';
import { RouteNames } from '../router/routes';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { SubmitDialog } from '../components/dialogs/exercise-dialog/submit-dialog';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
const deleteDialogContent = {
  title: 'Вы хотите удалить план',
  message: 'План будет удалено безвозвратно',
  submit: 'Подтвердить',
  cancel: 'Отмена',
};

export const Plan = () => {
  const [user] = useAuthState(auth);
  const [plans] = useCollection(plansCollection);
  const [openDialog, setOpenDialog] = useState(false);
  const [planId, setPlanId] = useState('');
  const deleteMyPlan = () => {
    setOpenDialog(false);
    deletePlan(planId);
  };

  const createMyPlan = () => {
    if (user) createPlan(user.uid, 'My plan');
  };

  return (
    <div style={{ height: '100vh' }}>
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
              <Link component={NavLink} to={RouteNames.plan + '/' + x.id}>
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
      <Button onClick={createMyPlan}>Create new plan</Button>
      <Outlet />
    </div>
  );
};
