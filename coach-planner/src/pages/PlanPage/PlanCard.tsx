import { FC } from 'react';
import { PlanResponse } from '@/db/plans';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Card,
  CardActionArea,
  CardHeader,
  Grid,
  IconButton,
  Link,
  Typography,
} from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { RoutePath } from '@/app/providers/RouterProvider/config/constants';
import { DescriptionField } from '@/shared/ui/DescriptionField';
import { parseDate } from '@/shared/lib/parseDate';
import { getEventsCollectionRef } from '@/db/events';
import { useCollection } from 'react-firebase-hooks/firestore';

interface PlanCardProps {
  plan: PlanResponse;
  openDialog: (id: string) => void;
}

const PlanCard: FC<PlanCardProps> = ({ plan, openDialog }) => {
  const [myEvents, loading, error] = useCollection(getEventsCollectionRef(plan.id));
  const navigate = useNavigate();

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card>
        <Box display={'flex'}>
          <Box display={'flex'} sx={{ justifyContent: 'center', alignItems: 'center' }}>
            <IconButton onClick={() => openDialog(plan.id)} color="error">
              <DeleteForeverIcon />
            </IconButton>
          </Box>
          <CardActionArea onClick={() => navigate(RoutePath.plan + RoutePath.main + plan.id)}>
            <Typography
              variant="h4"
              textAlign={'start'}
              flex={1}
              sx={{ color: (t) => t.palette.primary.main }}
            >
              {plan.name || 'NAME NOT FOUND'}
            </Typography>
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
