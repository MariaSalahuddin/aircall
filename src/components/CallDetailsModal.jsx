import { Dialog, DialogTitle, DialogContent, Typography } from '@mui/material';
import { format } from 'date-fns';


export default function CallDetailsModal({ open, handleClose, call }) {

  if (!call) return null;

  function formatDuration(seconds) {
    if (seconds >= 60) {
      const mins = Math.floor(seconds / 60);
      const secs = seconds % 60;
      return `${mins}m${secs > 0 ? ` ${secs}s` : ''}`;
    }
    return `${seconds}s`;
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Call Details</DialogTitle>
      <DialogContent>
        <Typography><strong>From:</strong> {call.from}</Typography>
        <Typography><strong>To:</strong> {call.to}</Typography>
        <Typography><strong>Type:</strong> {call.call_type}</Typography>
        <Typography><strong>Via:</strong> {call.via}</Typography>
        <Typography><strong>Call Duration:</strong> {formatDuration(call.duration) }</Typography>
        <Typography><strong> Call Time:</strong>   {format(new Date(call.created_at), 'MMMM d, yyyy')} at {format(new Date(call.created_at), 'hh:mm a')}</Typography>
      </DialogContent>
    </Dialog>
  );
}
