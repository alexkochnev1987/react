import { NavLink } from 'react-router-dom';
import { Button, IconButton, Link } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { SubmitDialog } from '../../components/dialogs/exercise-dialog/submit-dialog';
import { RoutePath } from '@/app/providers/RouterProvider/config/constants';
import { usePlanData } from './usePlanData';
import { HandleDataWrapper } from '../PageWrappers/HandleDataWrapper';
const deleteDialogContent = {
  title: 'Вы хотите удалить план',
  message: 'План будет удалено безвозвратно',
  submit: 'Подтвердить',
  cancel: 'Отмена',
};

const PlanPage = () => {
  const { plans, isOpen, closeDialog, openDialog, deleteMyPlan, loading, error } = usePlanData();
  return (
    <HandleDataWrapper loading={loading} error={error}>
      <SubmitDialog content={deleteDialogContent} open={isOpen} submit={deleteMyPlan} onClose={closeDialog} />
      {plans &&
        plans.map((x) => (
          <span key={x.id}>
            <Button>
              <Link component={NavLink} to={RoutePath.plan + RoutePath.main + x.id}>
                {x.name}
              </Link>
            </Button>
            <IconButton color="error" onClick={() => openDialog(x.id)}>
              <DeleteForeverIcon />
            </IconButton>
          </span>
        ))}
    </HandleDataWrapper>
  );
};

export default PlanPage;
