import { Button, Grid } from '@mui/material';
import SubmitDialog from '../../components/dialogs/exercise-dialog/submit-dialog';
import { usePlanData } from './usePlanData';
import { HandleDataWrapper } from '../PageWrappers/HandleDataWrapper';
import { useState } from 'react';
import PlanCard from './PlanCard';
const deleteDialogContent = {
  title: 'Caution: Deletion Permanently Removes the Plan!',
  message:
    'Clicking the button below will result in the permanent deletion of the plan. This action cannot be undone. Make sure you want to proceed with this irreversible action before clicking the button.',
  submit: 'Accept',
  cancel: 'Cancel',
};

const PlanPage = () => {
  const buttonText = 'Create plan';
  const [isOpen, setIsOpen] = useState(false);
  const [planId, setPlanId] = useState('');
  const { plans, deletePlan, createNewPlan, loading, error } = usePlanData(planId);
  const closeDialog = () => setIsOpen(false);
  const openDialog = (id: string) => {
    setPlanId(id);
    setIsOpen(true);
  };

  const onSubmit = () => {
    deletePlan(planId);
    closeDialog();
  };

  return (
    <HandleDataWrapper loading={loading} error={error}>
      <Grid container spacing={2} p={1}>
        <Grid item xs={12}>
          <Button variant="outlined" onClick={createNewPlan}>
            {buttonText}
          </Button>
        </Grid>

        {plans && plans.map((x) => <PlanCard plan={x} openDialog={openDialog} key={x.id} />)}
      </Grid>
      <SubmitDialog
        content={deleteDialogContent}
        open={isOpen}
        submit={onSubmit}
        onClose={closeDialog}
      />
    </HandleDataWrapper>
  );
};

export default PlanPage;
