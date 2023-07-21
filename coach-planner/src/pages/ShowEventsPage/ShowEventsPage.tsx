import { ShowCalendar } from '../../components/Calendar/Show-calendar';
import { Box, CardHeader } from '@mui/material';
import { EditContent } from '../../features/EditContent/ui/Edit-content';

import { useEventsData } from './useEventsData';
import { HandleDataWrapper } from '../PageWrappers/HandleDataWrapper';

const ShowEventsPage = () => {
  const { editPlanName, calendar, loading, error } = useEventsData();

  return (
    <HandleDataWrapper loading={loading} error={error}>
      <Box display={'flex'} flexDirection={'column'} flex={1}>
        {calendar && (
          <CardHeader title={<EditContent label={'Plan name'} callback={editPlanName} value={calendar.name} />} />
        )}
        <Box flex={1} position={'relative'}>
          <Box
            sx={{
              position: 'absolute',
              left: 0,
              top: 0,
              width: '100%',
              height: '100%',
              overflow: 'hidden',
            }}
          >
            {calendar && <ShowCalendar planId={calendar.id} />}
          </Box>
        </Box>
      </Box>
    </HandleDataWrapper>
  );
};

export default ShowEventsPage;
