import { Card, CardContent, Box, Typography, IconButton } from '@mui/material';
import ArchiveIcon from '@mui/icons-material/Archive';
import UnarchiveIcon from '@mui/icons-material/Unarchive';
import PhoneForwardedIcon from '@mui/icons-material/PhoneForwarded';
import PhoneCallbackIcon from '@mui/icons-material/PhoneCallback';
import PhoneMissedIcon from '@mui/icons-material/PhoneMissed';
import { format } from 'date-fns';

export default function CallItem({ call, onSelect, onArchive }) {
  // Format the call time "12:30 PM"
  const formattedTime = format(new Date(call.created_at), 'hh:mm a');

  return (
    <Card sx={{ marginBottom: 2, cursor: 'pointer' }} onClick={() => onSelect(call)}>
      <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

        {call.call_type == "answered" && call.direction == "inbound" && <PhoneCallbackIcon  sx={{ marginRight: 2, color:'green' }} />}
        {call.call_type == "answered" && call.direction == "outbound" && <PhoneForwardedIcon  sx={{ marginRight: 2, color:'green' }} />}
        {call.call_type == "missed" && <PhoneMissedIcon  sx={{ marginRight: 2, color:'red' }} />}

        {/* Call details */}
        <Box sx={{ flexGrow: 1 }}>
                 <Typography variant="subtitle1" fontWeight="bold">
                   {call.from || 'Unknown recipient'}
                 </Typography>
                  {call.call_type == "answered" && <Typography variant="body2" color="text.secondary">
                                    was on call with {call.to || 'Unknown caller'}
                                  </Typography> }

                  {call.call_type == "missed" && <Typography variant="body2" color="text.secondary">
                   tried to call on {call.to || 'Unknown caller'}
                 </Typography> }
               </Box>

        {/* Call time */}
        <Typography sx={{ marginRight: 2, color: 'grey.500', }}>
          {formattedTime}
        </Typography>

        {/* Archive/Unarchive button */}
        <IconButton onClick={(e) => { e.stopPropagation(); onArchive(call); }}>
          {call.is_archived ? <UnarchiveIcon sx={{ marginRight: 2, color:'red' }}/> : <ArchiveIcon sx={{ marginRight: 2, color:'green' }} />}
        </IconButton>
      </CardContent>
    </Card>
  );
}
