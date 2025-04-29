import { useEffect, useState } from 'react';
import { getCalls, archiveCall, unarchiveCall } from '../services/callApi.js';
import CallList from '../components/CallList.jsx';
import CallDetailsModal from '../components/CallDetailsModal.jsx';
import TabSwitcher from '../components/TabSwitcher.jsx';
import axios from 'axios';
import { Container, CircularProgress, Typography } from '@mui/material';

export default function ActivityFeed() {
  const [calls, setCalls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCall, setSelectedCall] = useState(null);
  const [tab, setTab] = useState(0); // 0 = All Calls , 1 = Archived
  const isArchivedTab = tab === 1;
//fetch updated calls
  const fetchCalls = async () => {
    setLoading(true);
    try {
      const res = await getCalls();
      setCalls(res.data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCalls();
  }, []);
// for archiving and un archiving calls
  const handleArchive = async (call) => {
    try {
      call.is_archived ? await unarchiveCall(call.id) : await archiveCall(call.id);
      fetchCalls();
    } catch (err) {
      console.error('Archiving failed', err);
    }
  };

  //for archive all and un archive all button
  const handleBulkArchiveToggle = async () => {
    const shouldArchive = !isArchivedTab;

    try {
      await Promise.all(
        filteredCalls.map((call) => {
          return shouldArchive
            ? archiveCall(call.id)
            : unarchiveCall(call.id);
        })
      );
      await fetchCalls(); // Refresh after all calls finish
    } catch (error) {
      console.error('Failed to archive/unarchive calls:', error);
    }
  };

  const filteredCalls = calls.filter(call => call.is_archived === (tab === 1));

  return (
    <Container sx={{ mt: 4 }}>
      <TabSwitcher currentTab={tab} handleChange={(e, val) => setTab(val)} />
      {loading ? (
        <CircularProgress sx={{ mt: 4 }} />
      ) : filteredCalls.length === 0 ? (
        <Typography sx={{ mt: 4 }}>No calls to show.</Typography>
      ) : (



<CallList
  calls={filteredCalls}
  onSelect={setSelectedCall}
  onArchive={handleArchive}
  onBulkArchiveToggle={handleBulkArchiveToggle}
  isArchivedTab={isArchivedTab}
/>

      )}
      <CallDetailsModal open={!!selectedCall} call={selectedCall} handleClose={() => setSelectedCall(null)} />
    </Container>
  );
}