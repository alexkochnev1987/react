import { FC } from 'react';
import { PlanResponse, getPlanDocRef } from '@/db/plans';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardHeader,
  Grid,
  IconButton,
  Link,
} from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { RoutePath } from '@/app/providers/RouterProvider/config/constants';
import { DescriptionField } from '@/shared/ui/DescriptionField';
import { parseDate } from '@/shared/lib/parseDate';
import { useCollection, useDocument } from 'react-firebase-hooks/firestore';
import { getEventsCollectionLink } from '@/db/events';

interface PlanCardProps {
  plan: PlanResponse;
  openDialog: (id: string) => void;
}

const PlanCard: FC<PlanCardProps> = ({ plan, openDialog }) => {
  const [myEvents, loading, error] = useCollection(getEventsCollectionLink(plan.id));
  const navigate = useNavigate();

  return (
    <Grid item xs={4}>
      <Card>
        <Box display={'flex'}>
          <Box display={'flex'} sx={{ justifyContent: 'center', alignItems: 'center' }}>
            <IconButton onClick={() => openDialog(plan.id)} color="error">
              <DeleteForeverIcon />
            </IconButton>
          </Box>
          <CardActionArea onClick={() => navigate(RoutePath.plan + RoutePath.main + plan.id)}>
            <CardHeader title={plan.name} />
            <Box display={'flex'} justifyContent={'space-between'}>
              <DescriptionField label="Created" data={parseDate(plan.create?.toDate())} />
              {plan.modify && (
                <DescriptionField label="Modify" data={parseDate(plan.modify?.toDate())} />
              )}
            </Box>
            <DescriptionField label="Total trainings" data={`${myEvents?.docs?.length}`} />
          </CardActionArea>
        </Box>
      </Card>
    </Grid>
  );
};

export default PlanCard;
