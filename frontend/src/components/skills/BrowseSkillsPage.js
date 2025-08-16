import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Chip,
  CircularProgress,
} from '@mui/material';
import { skills as skillsApi } from '../../services/api';

const BrowseSkillsPage = () => {
  const { user } = useSelector((state) => state.auth);
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    skillsApi.getAll().then(res => {
      setSkills(res.data);
      setLoading(false);
    });
  }, []);

  const otherSkills = skills.filter(skill => skill.userId !== user?.id);

  if (loading) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}><CircularProgress /></Box>;
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 6, mb: 8 }}>
      <Typography variant="h3" fontWeight={700} mb={5}>Browse Skills</Typography>
      <Grid container spacing={4}>
        {otherSkills.map(skill => (
          <Grid item key={skill.id} xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h5" fontWeight={600}>{skill.name}</Typography>
                <Box display="flex" gap={1} mb={2}>
                  <Chip label={skill.category} color="primary" variant="outlined" size="small" />
                  <Chip label={skill.proficiencyLevel} color="secondary" variant="outlined" size="small" />
                </Box>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {skill.description}
                </Typography>
                <Button
                  variant="outlined"
                  onClick={() => navigate(`/skills/${skill.id}`)}
                >
                  View Details
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default BrowseSkillsPage; 