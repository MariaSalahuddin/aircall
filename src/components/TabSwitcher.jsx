import { Tabs, Tab, Box, Typography } from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

export default function TabSwitcher({ currentTab, handleChange }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
      {/* Logo Area */}
      <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
        <WhatsAppIcon fontSize="large" sx={{ color: 'green' }} />
        <Typography variant="h6" sx={{ ml: 1 }}>Aircall</Typography>
      </Box>

      {/* Tabs Area */}
      <Tabs value={currentTab} onChange={handleChange} centered>
        <Tab label="All Calls" />
        <Tab label="Archived Calls" />
      </Tabs>
    </Box>
  );
}
