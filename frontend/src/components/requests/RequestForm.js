import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Grid,
  Alert,
  Snackbar,
  CircularProgress,
  Divider,
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import api from '../../services/api';
import SendIcon from '@mui/icons-material/Send';
import CancelIcon from '@mui/icons-material/Cancel';

const RequestForm = ({ skillId, skillName, skillOwner, onRequestSent }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    message: '',
    proposedSchedule: new Date(),
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDateChange = (newDate) => {
    setFormData({
      ...formData,
      proposedSchedule: newDate,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await api.post('/requests', {
        skillId,
        message: formData.message,
        proposedSchedule: formData.proposedSchedule.toISOString(),
      });
      
      setSuccess(true);
      setFormData({
        message: '',
        proposedSchedule: new Date(),
      });
      
      if (onRequestSent) {
        onRequestSent();
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to send request');
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSuccess(false);
  };

  return (
    <Paper elevation={3} sx={{
      p: 4,
      borderRadius: 4,
      border: '2px solid',
      borderColor: 'accent.main',
      boxShadow: '0 8px 32px rgba(244, 63, 94, 0.10)',
      background: (theme) => theme.palette.background.accentGradient,
      transition: 'all 0.3s cubic-bezier(.4,2,.6,1)',
      '&:hover': {
        boxShadow: '0 16px 48px rgba(244, 63, 94, 0.15)',
        transform: 'scale(1.01) translateY(-2px)',
      },
    }}>
      <Box component="form" onSubmit={handleSubmit}>
        <Typography variant="h5" fontWeight={800} gutterBottom color="primary.contrastText">
          Request Skill: {skillName}
        </Typography>
        <Typography variant="body2" color="primary.contrastText" gutterBottom>
          Send a request to {skillOwner} to arrange a skill exchange session.
        </Typography>
        <Divider sx={{ my: 2, borderColor: 'accent.main' }} />
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              multiline
              rows={4}
              placeholder="Explain why you're interested in this skill and what you hope to learn..."
              required
              variant="outlined"
              sx={{
                background: '#fff',
                borderRadius: 2,
                boxShadow: '0 2px 8px rgba(124, 58, 237, 0.05)',
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateTimePicker
                label="Proposed Date & Time"
                value={formData.proposedSchedule}
                onChange={handleDateChange}
                slotProps={{ textField: { fullWidth: true, required: true, sx: { background: '#fff', borderRadius: 2 } } }}
                minDateTime={new Date()}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
              <Button
                type="submit"
                variant="contained"
                disabled={loading}
                startIcon={<SendIcon />}
                sx={{
                  py: 1.5,
                  px: 4,
                  fontWeight: 700,
                  fontSize: '1.1rem',
                  background: (theme) => theme.palette.background.gradient,
                  color: '#fff',
                  boxShadow: '0 4px 16px rgba(124, 58, 237, 0.15)',
                  '&:hover': {
                    background: (theme) => theme.palette.background.vibrantGradient,
                    boxShadow: '0 8px 32px rgba(244, 63, 94, 0.20)',
                  },
                }}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : 'Send Request'}
              </Button>
              <Button
                variant="outlined"
                onClick={() => navigate(-1)}
                startIcon={<CancelIcon />}
                sx={{
                  py: 1.5,
                  px: 4,
                  fontWeight: 700,
                  fontSize: '1.1rem',
                  borderColor: 'accent.main',
                  color: 'accent.main',
                  background: '#fff',
                  '&:hover': {
                    background: (theme) => theme.palette.background.accentGradient,
                    color: '#fff',
                  },
                }}
              >
                Cancel
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
      {error && (
        <Alert severity="error" sx={{ mt: 2, fontWeight: 700, fontSize: '1.1rem', borderRadius: 2 }}>
          {error}
        </Alert>
      )}
      <Snackbar
        open={success}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        sx={{
          '& .MuiAlert-root': {
            background: (theme) => theme.palette.background.secondaryGradient,
            color: '#fff',
            fontWeight: 700,
            fontSize: '1.1rem',
          },
        }}
      >
        <Alert severity="success" onClose={handleCloseSnackbar} icon={false} sx={{ borderRadius: 2 }}>
          🎉 Request sent successfully!
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default RequestForm; 