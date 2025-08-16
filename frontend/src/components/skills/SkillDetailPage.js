import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  Container,
  Typography,
  Box,
  Grid,
  Button,
  Chip,
  Avatar,
  Divider,
  Alert,
  Paper,
  Card,
  CircularProgress,
  Dialog,
} from '@mui/material';
import EventIcon from '@mui/icons-material/Event';
import PersonIcon from '@mui/icons-material/Person';
import StarIcon from '@mui/icons-material/Star';
import CategoryIcon from '@mui/icons-material/Category';
import RequestForm from '../requests/RequestForm';
import api from '../../services/api';

const SkillDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const [skill, setSkill] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [requestFormOpen, setRequestFormOpen] = useState(false);

  useEffect(() => {
    fetchSkillDetails();
  }, [id]);

  const fetchSkillDetails = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await api.get(`/skills/${id}`);
      setSkill(response.data);
    } catch (err) {
      setError('Failed to load skill details.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleRequestClick = () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: `/skills/${id}` } });
      return;
    }
    setRequestFormOpen(true);
  };

  const handleRequestFormClose = () => {
    setRequestFormOpen(false);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Alert severity="error" sx={{ mb: 4 }}>
          {error}
        </Alert>
        <Button variant="outlined" onClick={() => navigate('/skills')}>
          Back to Skills
        </Button>
      </Container>
    );
  }

  if (!skill) {
    return (
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Alert severity="warning">Skill not found.</Alert>
        <Button variant="outlined" onClick={() => navigate('/skills')} sx={{ mt: 2 }}>
          Back to Skills
        </Button>
      </Container>
    );
  }

  const isOwnSkill = user?.id === skill.userId;

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Box sx={{ mb: 4 }}>
        <Button
          variant="outlined"
          onClick={() => navigate(-1)}
          sx={{ mb: 3 }}
        >
          Back
        </Button>
        
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Box
              sx={{
                borderRadius: 4,
                overflow: 'hidden',
                boxShadow: (theme) => theme.shadows[2],
                height: 240,
                backgroundColor: (theme) => theme.palette.primary.main + '0A',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography
                variant="h1"
                sx={{
                  fontSize: '4rem',
                  fontWeight: 800,
                  color: (theme) => theme.palette.primary.main + '4D',
                }}
              >
                {skill.name?.charAt(0)?.toUpperCase() || 'S'}
              </Typography>
            </Box>
            
            <Box sx={{ mt: 4 }}>
              <Typography variant="h3" fontWeight={700} gutterBottom>
                {skill.name}
              </Typography>
              
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
                <Chip
                  icon={<CategoryIcon />}
                  label={skill.category || 'Programming'}
                  color="primary"
                  variant="outlined"
                />
                <Chip
                  label={skill.proficiencyLevel || 'Intermediate'}
                  color="secondary"
                  variant="outlined"
                />
              </Box>
              
              <Typography variant="body1" paragraph>
                {skill.description}
              </Typography>
              
              <Grid container spacing={3} sx={{ mt: 2 }}>
                <Grid item xs={12} sm={6}>
                  <Paper sx={{ p: 3, borderRadius: 3, border: '1px solid', borderColor: 'divider' }}>
                    <Typography variant="h6" gutterBottom fontWeight={600}>
                      What You'll Learn
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {skill.learningOutcomes || 'Skills and knowledge outcomes from learning this skill.'}
                    </Typography>
                  </Paper>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <Paper sx={{ p: 3, borderRadius: 3, border: '1px solid', borderColor: 'divider' }}>
                    <Typography variant="h6" gutterBottom fontWeight={600}>
                      Prerequisites
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {skill.prerequisites || 'No specific prerequisites needed.'}
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>
            </Box>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Card sx={{ borderRadius: 3, overflow: 'hidden', position: 'sticky', top: 100 }}>
              <Box
                sx={{
                  p: 3,
                  background: (theme) => theme.palette.background.gradient,
                }}
              >
                <Typography variant="h5" fontWeight={700} color="white">
                  Skill Details
                </Typography>
              </Box>
              
              <Box sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar sx={{ mr: 2 }}>
                    {skill.user?.username?.charAt(0).toUpperCase() || <PersonIcon />}
                  </Avatar>
                  <Box>
                    <Typography variant="subtitle1" fontWeight={600}>
                      {skill.user?.username || 'Anonymous'}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Skill Provider
                    </Typography>
                  </Box>
                </Box>
                
                <Divider sx={{ my: 2 }} />
                
                <Box sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <StarIcon color="warning" sx={{ mr: 1 }} />
                    <Typography variant="body1" fontWeight={500}>
                      {skill.proficiencyLevel || 'Intermediate'} Level
                    </Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <EventIcon color="primary" sx={{ mr: 1 }} />
                    <Typography variant="body1" fontWeight={500}>
                      {skill.estimatedTime || '1-2 hours'} Session
                    </Typography>
                  </Box>
                </Box>
                
                <Divider sx={{ my: 2 }} />
                
                {isAuthenticated ? (
                  isOwnSkill ? (
                    <Alert severity="info" sx={{ mb: 2 }}>
                      This is your own skill listing
                    </Alert>
                  ) : (
                    <Button
                      variant="contained"
                      fullWidth
                      size="large"
                      onClick={handleRequestClick}
                      sx={{
                        py: 1.5,
                        background: (theme) => theme.palette.background.gradient,
                      }}
                    >
                      Request to Learn
                    </Button>
                  )
                ) : (
                  <Button
                    variant="contained"
                    fullWidth
                    size="large"
                    onClick={handleRequestClick}
                    sx={{
                      py: 1.5,
                      background: (theme) => theme.palette.background.gradient,
                    }}
                  >
                    Sign in to Request
                  </Button>
                )}
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Box>
      
      <Dialog
        open={requestFormOpen}
        onClose={handleRequestFormClose}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            boxShadow: (theme) => theme.shadows[4],
          },
        }}
      >
        <Box sx={{ p: 3 }}>
          <RequestForm
            skillId={skill.id}
            skillName={skill.name}
            skillOwner={skill.user?.username}
            onRequestSent={handleRequestFormClose}
          />
        </Box>
      </Dialog>
    </Container>
  );
};

export default SkillDetailPage; 