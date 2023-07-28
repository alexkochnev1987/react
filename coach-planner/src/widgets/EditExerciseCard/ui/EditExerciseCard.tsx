import { Box, Button, Card, CardHeader, Grid } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useEffect, useRef, useState } from 'react';
import SubmitDialog from '../../../components/dialogs/exercise-dialog/submit-dialog';
import { EditContent } from '@/features/EditContent/ui/Edit-content';
import { deleteDialogContent, editContentFieldArray, editTagsFieldArray } from '../lib/constants';
import { EditTags } from '@/features/EditTags/ui/EditTags';
import { DrawExercise } from '@/features/DrawExercise/ui/DrawExercise';
import { ExerciseForPage } from '@/service/parseExerciseResponse';
import { useExerciseStore } from '@/service/store.service';

export const EditExerciseCard = ({ exercise }: { exercise: ExerciseForPage }) => {
  const [openSubmit, setOpenSubmit] = useState(false);
  const { deleteExercise, updateExercise } = useExerciseStore();
  const boxRef = useRef<HTMLDivElement>(null);
  const [konva, setKonva] = useState(0);

  useEffect(() => {
    if (boxRef.current) setKonva(boxRef.current?.getBoundingClientRect().width);
  }, [boxRef.current]);

  return (
    <Card>
      <SubmitDialog
        content={deleteDialogContent}
        open={openSubmit}
        submit={deleteExercise}
        onClose={() => {
          setOpenSubmit(false);
        }}
      />
      <CardHeader
        title={
          <EditContent
            label={'Exercise name'}
            callback={(value) => updateExercise(value, 'name')}
            value={exercise.name}
          />
        }
        action={
          <Button onClick={() => setOpenSubmit(true)} color="error">
            <DeleteForeverIcon />
          </Button>
        }
      />
      <Grid container padding={1} spacing={2}>
        <Grid item xs={12} paddingRight={1}>
          <Box ref={boxRef}>{konva && <DrawExercise exercise={exercise} widthKonva={konva} />}</Box>
        </Grid>
        {editContentFieldArray.map(({ field, label }) => (
          <Grid item xs={12} key={field}>
            <EditContent
              callback={(value) => updateExercise(value, field)}
              value={exercise[field]}
              label={label}
            />
          </Grid>
        ))}

        {editTagsFieldArray.map(({ field, defaultTags, label }) => (
          <Grid item xs={12} key={field}>
            <EditTags
              callback={(value) => updateExercise(value, field)}
              defaultTags={defaultTags}
              tags={exercise[field]}
              placeholder={label}
            />
          </Grid>
        ))}
      </Grid>
    </Card>
  );
};
