import {
  Avatar,
  Box,
  Button,
  Card,
  CardHeader,
  CardMedia,
  Chip,
  Grid,
  Tooltip,
} from '@mui/material';
import { red } from '@mui/material/colors';
import { ExpandText } from '@/shared/ui/ExpandText';
import { ExerciseForPage } from '@/service/parseExerciseResponse';
import { usePublicExerciseCard } from './usePublicExercises';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

export const PublicExerciseCard = ({ exercise }: { exercise: ExerciseForPage }) => {
  const { saveAndGoToExercise } = usePublicExerciseCard();
  return (
    <Grid item xs={12}>
      <Card>
        <CardHeader
          title={exercise.name}
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe" src={exercise.coachImage} />
          }
          subheader={exercise.tag?.map((x) => (
            <Chip label={x} key={x} />
          ))}
          action={
            <Box display={{ xs: 'block', sm: 'flex' }} textAlign={'center'}>
              <Box>
                <Tooltip title="Add to exercises and Edit">
                  <Button onClick={() => saveAndGoToExercise(exercise)}>
                    <AddPhotoAlternateIcon />
                  </Button>
                </Tooltip>
              </Box>
            </Box>
          }
        />
        <Grid container padding={1} spacing={1}>
          <Grid item xs={12} sm={8} md={6} lg={6}>
            <CardMedia component="img" width={'100%'} image={exercise.img} alt={exercise.name} />
          </Grid>
          <Grid item xs={12} sm={4} md={6} lg={6}>
            <ExpandText label="Description" text={exercise.description} />
            <ExpandText label="Key points" text={exercise.keyPoints} />
          </Grid>
        </Grid>
      </Card>
    </Grid>
  );
};
