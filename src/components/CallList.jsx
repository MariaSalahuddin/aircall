import { Typography, Box, Button  } from '@mui/material';
import CallItem from './CallItem.jsx';
import ArchiveIcon from '@mui/icons-material/Archive';
import UnarchiveIcon from '@mui/icons-material/Unarchive';

// function to format calls by date
const groupCallsByDate = (calls) => {
  return calls.reduce((groups, call) => {
    const date = new Date(call.created_at).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',


    });
    if (!groups[date]) groups[date] = [];
    groups[date].push(call);
    return groups;
  }, {});
};

export default function CallList({ calls, onSelect, onArchive,
    onBulkArchiveToggle,isArchivedTab = false }) {

  const groupedCalls = groupCallsByDate(calls);

   return (
      <Box>
        {/* Bulk Archive/Unarchive Button */}
        <Box sx={{ textAlign: 'right', mb: 2 }}>
          <Button
            variant="contained"
            onClick={onBulkArchiveToggle}
            startIcon={isArchivedTab ? <UnarchiveIcon /> : <ArchiveIcon />}
            sx={{
              backgroundColor: isArchivedTab ? 'red' : 'green',
              color: 'white',
              '&:hover': {
                backgroundColor: isArchivedTab ? '#cc0000' : '#006400',
              },
            }}
          >
            {isArchivedTab ? 'Unarchive All Calls' : 'Archive All Calls'}
          </Button>
        </Box>


        {/* Grouped Calls */}
        {Object.entries(groupedCalls).map(([date, callsForDate]) => (
          <Box key={date} sx={{ mb: 4 }}>
            <Typography
              variant="h6"
              sx={{
                mb: 2,
                fontWeight: 'bold',
                textAlign: 'center',
                color: 'grey.500',
              }}
            >
              {date}
            </Typography>
            {callsForDate.map((call) => (
              <CallItem
                key={call.id}
                call={call}
                onSelect={onSelect}
                onArchive={onArchive}
              />
            ))}
          </Box>
        ))}
      </Box>
    );
}
