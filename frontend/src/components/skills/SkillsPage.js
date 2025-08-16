import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Box,
  Chip,
  CardActions,
  IconButton,
  Tooltip,
  Avatar,
  CircularProgress,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CategoryIcon from '@mui/icons-material/Category';
import SchoolIcon from '@mui/icons-material/School';
import { skills as skillsApi } from '../../services/api';

const PROFICIENCY_LEVELS = ['beginner', 'intermediate', 'advanced', 'expert'];
const CATEGORIES = [
  'Programming',
  'Design',
  'Music',
  'Language',
  'Business',
  'Other',
];

const SkillsPage = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [skills, setSkills] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    proficiencyLevel: '',
  });

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    setPageLoading(true);
    try {
      const response = await skillsApi.getAll();
      setSkills(response.data);
    } catch (error) {
      console.error('Error fetching skills:', error);
    } finally {
      setPageLoading(false);
    }
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setFormData({
      name: '',
      description: '',
      category: '',
      proficiencyLevel: '',
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await skillsApi.create(formData);
      handleClose();
      fetchSkills();
    } catch (error) {
      console.error('Error creating skill:', error);
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    try {
      await skillsApi.delete(id);
      fetchSkills();
    } catch (error) {
      console.error('Error deleting skill:', error);
    }
  };

  const handleViewDetails = (id) => {
    navigate(`/skills/${id}`);
  };

  const mySkills = skills.filter(skill => skill.userId === user?.id);

  if (pageLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 6, mb: 8 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={5}>
        <Typography variant="h3" fontWeight={700}>My Skills</Typography>
        <Button
          variant="contained"
          onClick={handleOpen}
          size="large"
          sx={{
            background: (theme) => theme.palette.background.gradient,
            py: 1.5,
            px: 3,
            '&:hover': {
              background: (theme) =>
                `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.secondary.dark} 100%)`,
            },
          }}
        >
          Add New Skill
        </Button>
      </Box>

      {mySkills.length === 0 ? (
        <Box sx={{ 
          textAlign: 'center', 
          py: 10, 
          px: 3,
          borderRadius: 4,
          border: '1px dashed',
          borderColor: 'divider',
          backgroundColor: 'rgba(0,0,0,0.01)'
        }}>
          <Typography variant="h5" color="text.secondary" gutterBottom>
            You haven't added any skills yet
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            Share your expertise with the community by adding your first skill
          </Typography>
          <Button
            variant="contained"
            onClick={handleOpen}
            sx={{
              background: (theme) => theme.palette.background.gradient,
              '&:hover': {
                background: (theme) =>
                  `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.secondary.dark} 100%)`,
              },
            }}
          >
            Add Your First Skill
          </Button>
        </Box>
      ) : (
        <Grid container spacing={4}>
          {mySkills.map((skill) => (
            <Grid item key={skill.id} xs={12} sm={6} md={4}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: (theme) => theme.shadows[4],
                  },
                  position: 'relative',
                  overflow: 'visible',
                  borderRadius: 3,
                }}
              >
                <Box
                  sx={{
                    height: 6,
                    width: '100%',
                    background: (theme) => theme.palette.background.gradient,
                    borderRadius: '12px 12px 0 0',
                  }}
                />
                
                <CardContent sx={{ flexGrow: 1, p: 3, pt: 4 }}>
                  <Box sx={{ mb: 2 }}>
                    <Typography gutterBottom variant="h5" component="h2" fontWeight={600}>
                      {skill.name}
                    </Typography>
                    <Box display="flex" gap={1} mb={2}>
                      <Chip 
                        icon={<CategoryIcon />} 
                        label={skill.category || 'Programming'} 
                        color="primary" 
                        variant="outlined"
                        size="small" 
                      />
                      <Chip 
                        icon={<SchoolIcon />}
                        label={skill.proficiencyLevel ? skill.proficiencyLevel.charAt(0).toUpperCase() + skill.proficiencyLevel.slice(1) : 'Intermediate'} 
                        color="secondary" 
                        variant="outlined"
                        size="small" 
                      />
                    </Box>
                  </Box>
                  
                  <Typography variant="body2" color="text.secondary" paragraph sx={{ mb: 4 }}>
                    {skill.description.length > 120
                      ? `${skill.description.substring(0, 120)}...` 
                      : skill.description}
                  </Typography>
                </CardContent>
                
                <CardActions sx={{ p: 3, pt: 0, display: 'flex', justifyContent: 'space-between' }}>
                  <Button
                    startIcon={<VisibilityIcon />}
                    size="small"
                    variant="outlined"
                    color="primary"
                    onClick={() => handleViewDetails(skill.id)}
                  >
                    View Details
                  </Button>
                  
                  <Tooltip title="Delete Skill">
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => handleDelete(skill.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      <Dialog 
        open={open} 
        onClose={handleClose} 
        maxWidth="sm" 
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            boxShadow: (theme) => theme.shadows[3],
          }
        }}
      >
        <DialogTitle>
          <Typography variant="h5" fontWeight={600}>Add New Skill</Typography>
        </DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <TextField
              fullWidth
              label="Skill Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              margin="normal"
            />
            <TextField
              fullWidth
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              multiline
              rows={4}
              margin="normal"
              placeholder="Describe your skill, what you can teach others, and what they'll learn..."
            />
            <TextField
              fullWidth
              select
              label="Category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              margin="normal"
            >
              {CATEGORIES.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              fullWidth
              select
              label="Proficiency Level"
              name="proficiencyLevel"
              value={formData.proficiencyLevel}
              onChange={handleChange}
              required
              margin="normal"
            >
              {PROFICIENCY_LEVELS.map((level) => (
                <MenuItem key={level} value={level}>
                  {level.charAt(0).toUpperCase() + level.slice(1)}
                </MenuItem>
              ))}
            </TextField>
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 3 }}>
            <Button onClick={handleClose} variant="outlined">Cancel</Button>
            <Button
              type="submit"
              variant="contained"
              disabled={loading}
              sx={{
                background: (theme) => theme.palette.background.gradient,
                '&:hover': {
                  background: (theme) =>
                    `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.secondary.dark} 100%)`,
                },
              }}
            >
              {loading ? <CircularProgress size={24} /> : 'Add Skill'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Container>
  );
};

export default SkillsPage; 