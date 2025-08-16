import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  Box,
  Container,
  Typography,
  Tabs,
  Tab,
  Paper,
  Divider,
  Card,
  CardContent,
  Button,
  Grid,
  Chip,
  Avatar,
  CircularProgress,
  Alert,
} from '@mui/material';
import { format } from 'date-fns';
import api from '../../services/api';

const RequestsPage = () => {
  const { user } = useSelector((state) => state.auth);
  const [tabValue, setTabValue] = useState(0);
  const [requests, setRequests] = useState({
    requestsMade: [],
    requestsReceived: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [actionLoading, setActionLoading] = useState(null);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await api.get('/requests');
      setRequests(response.data);
    } catch (err) {
      setError('Failed to load requests. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleStatusUpdate = async (requestId, status) => {
    setActionLoading(requestId);
    try {
      await api.put(`/requests/${requestId}`, { status });
      fetchRequests();
    } catch (err) {
      console.error(err);
      setError('Failed to update request status');
    } finally {
      setActionLoading(null);
    }
  };

  const handleCancelRequest = async (requestId) => {
    setActionLoading(requestId);
    try {
      await api.delete(`/requests/${requestId}`);
      fetchRequests();
    } catch (err) {
      console.error(err);
      setError('Failed to cancel request');
    } finally {
      setActionLoading(null);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'warning';
      case 'accepted':
        return 'success';
      case 'rejected':
        return 'error';
      case 'completed':
        return 'info';
      default:
        return 'default';
    }
  };

  // Format date
  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), 'MMM d, yyyy h:mm a');
    } catch (e) {
      return 'Invalid date';
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Typography variant="h3" fontWeight={700} sx={{ mb: 1 }}>
        Skill Requests
      </Typography>
      <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
        Manage your incoming and outgoing skill exchange requests
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 4 }}>
          {error}
        </Alert>
      )}

      <Paper sx={{ borderRadius: 3, boxShadow: (theme) => theme.shadows[0] }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          sx={{
            '& .MuiTabs-indicator': {
              height: 3,
              borderRadius: 1.5,
              background: (theme) => theme.palette.background.gradient,
            },
          }}
        >
          <Tab 
            label="Requests Received" 
            sx={{ 
              fontSize: '1rem', 
              fontWeight: 600,
              py: 2,
              px: 4,
              '&.Mui-selected': {
                color: 'primary.main',
              },
            }} 
          />
          <Tab 
            label="Requests Made" 
            sx={{ 
              fontSize: '1rem', 
              fontWeight: 600,
              py: 2,
              px: 4,
              '&.Mui-selected': {
                color: 'primary.main',
              },
            }} 
          />
        </Tabs>
        <Divider />

        <Box sx={{ p: { xs: 2, md: 4 } }}>
          {tabValue === 0 && (
            <Box>
              <Typography variant="h6" sx={{ mb: 3 }}>
                Requests Others Have Sent to You
              </Typography>
              
              {requests.requestsReceived.length === 0 ? (
                <Typography color="text.secondary" sx={{ py: 4, textAlign: 'center' }}>
                  You haven't received any skill requests yet.
                </Typography>
              ) : (
                <Grid container spacing={3}>
                  {requests.requestsReceived.map((request) => (
                    <Grid item xs={12} key={request.id}>
                      <Card sx={{ 
                        borderRadius: 2,
                        boxShadow: (theme) => theme.shadows[1],
                        border: '1px solid',
                        borderColor: 'divider',
                      }}>
                        <CardContent sx={{ p: 3 }}>
                          <Grid container spacing={2}>
                            <Grid item xs={12} md={8}>
                              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <Avatar 
                                  sx={{ mr: 2, width: 40, height: 40 }}
                                >
                                  {request.requester?.username?.charAt(0).toUpperCase()}
                                </Avatar>
                                <Box>
                                  <Typography variant="subtitle1" fontWeight={600}>
                                    {request.requester?.username} wants to learn {request.skill?.name}
                                  </Typography>
                                  <Typography variant="body2" color="text.secondary">
                                    Requested on {formatDate(request.createdAt)}
                                  </Typography>
                                </Box>
                              </Box>
                              
                              <Typography variant="body1" sx={{ mb: 2 }}>
                                "{request.message}"
                              </Typography>
                              
                              <Typography variant="body2" sx={{ mb: 2 }}>
                                <Box component="span" fontWeight={600}>Proposed time:</Box> {formatDate(request.proposedSchedule)}
                              </Typography>
                              
                              <Chip 
                                label={request.status || 'Pending'} 
                                color={getStatusColor(request.status || 'pending')} 
                                size="small" 
                                sx={{ textTransform: 'capitalize' }}
                              />
                            </Grid>
                            
                            <Grid item xs={12} md={4}>
                              <Box sx={{ 
                                display: 'flex', 
                                flexDirection: { xs: 'row', md: 'column' }, 
                                gap: 2, 
                                justifyContent: { xs: 'flex-start', md: 'flex-end' },
                                alignItems: { xs: 'center', md: 'flex-end' },
                                height: '100%',
                              }}>
                                {request.status === 'pending' && (
                                  <>
                                    <Button
                                      variant="contained"
                                      color="success"
                                      disabled={actionLoading === request.id}
                                      onClick={() => handleStatusUpdate(request.id, 'accepted')}
                                      sx={{ minWidth: 100 }}
                                    >
                                      {actionLoading === request.id ? (
                                        <CircularProgress size={24} color="inherit" />
                                      ) : (
                                        'Accept'
                                      )}
                                    </Button>
                                    <Button
                                      variant="outlined"
                                      color="error"
                                      disabled={actionLoading === request.id}
                                      onClick={() => handleStatusUpdate(request.id, 'rejected')}
                                      sx={{ minWidth: 100 }}
                                    >
                                      {actionLoading === request.id ? (
                                        <CircularProgress size={24} color="inherit" />
                                      ) : (
                                        'Decline'
                                      )}
                                    </Button>
                                  </>
                                )}
                                
                                {request.status === 'accepted' && (
                                  <Button
                                    variant="outlined"
                                    color="success"
                                    disabled={actionLoading === request.id}
                                    onClick={() => handleStatusUpdate(request.id, 'completed')}
                                  >
                                    {actionLoading === request.id ? (
                                      <CircularProgress size={24} color="inherit" />
                                    ) : (
                                      'Mark as Completed'
                                    )}
                                  </Button>
                                )}
                              </Box>
                            </Grid>
                          </Grid>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              )}
            </Box>
          )}

          {tabValue === 1 && (
            <Box>
              <Typography variant="h6" sx={{ mb: 3 }}>
                Requests You Have Sent to Others
              </Typography>
              
              {requests.requestsMade.length === 0 ? (
                <Typography color="text.secondary" sx={{ py: 4, textAlign: 'center' }}>
                  You haven't sent any skill requests yet.
                </Typography>
              ) : (
                <Grid container spacing={3}>
                  {requests.requestsMade.map((request) => (
                    <Grid item xs={12} key={request.id}>
                      <Card sx={{ 
                        borderRadius: 2,
                        boxShadow: (theme) => theme.shadows[1],
                        border: '1px solid',
                        borderColor: 'divider',
                      }}>
                        <CardContent sx={{ p: 3 }}>
                          <Grid container spacing={2}>
                            <Grid item xs={12} md={8}>
                              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <Avatar 
                                  sx={{ mr: 2, width: 40, height: 40 }}
                                >
                                  {request.skill?.user?.username?.charAt(0).toUpperCase()}
                                </Avatar>
                                <Box>
                                  <Typography variant="subtitle1" fontWeight={600}>
                                    Request to learn {request.skill?.name} from {request.skill?.user?.username}
                                  </Typography>
                                  <Typography variant="body2" color="text.secondary">
                                    Sent on {formatDate(request.createdAt)}
                                  </Typography>
                                </Box>
                              </Box>
                              
                              <Typography variant="body1" sx={{ mb: 2 }}>
                                "{request.message}"
                              </Typography>
                              
                              <Typography variant="body2" sx={{ mb: 2 }}>
                                <Box component="span" fontWeight={600}>Proposed time:</Box> {formatDate(request.proposedSchedule)}
                              </Typography>
                              
                              <Chip 
                                label={request.status || 'Pending'} 
                                color={getStatusColor(request.status || 'pending')} 
                                size="small" 
                                sx={{ textTransform: 'capitalize' }}
                              />
                            </Grid>
                            
                            <Grid item xs={12} md={4}>
                              <Box sx={{ 
                                display: 'flex',
                                justifyContent: { xs: 'flex-start', md: 'flex-end' },
                                alignItems: { xs: 'center', md: 'flex-end' },
                                height: '100%',
                              }}>
                                {request.status === 'pending' && (
                                  <Button
                                    variant="outlined"
                                    color="error"
                                    disabled={actionLoading === request.id}
                                    onClick={() => handleCancelRequest(request.id)}
                                  >
                                    {actionLoading === request.id ? (
                                      <CircularProgress size={24} color="inherit" />
                                    ) : (
                                      'Cancel Request'
                                    )}
                                  </Button>
                                )}
                              </Box>
                            </Grid>
                          </Grid>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              )}
            </Box>
          )}
        </Box>
      </Paper>
    </Container>
  );
};

export default RequestsPage; 