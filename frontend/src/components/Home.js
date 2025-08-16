import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Box,
  Paper,
  Stack,
  Divider,
  Avatar,
  Chip,
  CardActions,
  CircularProgress,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import GroupIcon from '@mui/icons-material/Group';
import SchoolIcon from '@mui/icons-material/School';
import StarIcon from '@mui/icons-material/Star';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import PersonIcon from '@mui/icons-material/Person';
import CategoryIcon from '@mui/icons-material/Category';
import { skills as skillsApi } from '../services/api';

const FeatureCard = ({ icon, title, description }) => (
  <Paper
    elevation={0}
    sx={{
      p: 4,
      height: '100%',
      borderRadius: 4,
      border: '1px solid',
      borderColor: 'divider',
      position: 'relative',
      overflow: 'hidden',
      transition: 'all 0.3s ease',
      '&:hover': {
        transform: 'translateY(-10px)',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.08)',
        borderColor: 'primary.main',
      },
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '4px',
        background: (theme) => theme.palette.background.gradient,
        borderRadius: '4px 4px 0 0',
      }
    }}
  >
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 70,
        height: 70,
        borderRadius: 3,
        mb: 3,
        background: (theme) => theme.palette.background.gradient,
        boxShadow: '0 10px 20px rgba(99, 102, 241, 0.2)',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'rotate(5deg) scale(1.1)',
        }
      }}
    >
      {icon}
    </Box>
    <Typography variant="h5" fontWeight={700} gutterBottom>
      {title}
    </Typography>
    <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7 }}>
      {description}
    </Typography>
  </Paper>
);

const Home = () => {
  const [featuredSkills, setFeaturedSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchFeaturedSkills = async () => {
      setLoading(true);
      try {
        const response = await skillsApi.getAll();
        setFeaturedSkills(response.data.slice(0, 6)); // Get first 6 skills
      } catch (error) {
        console.error('Error fetching featured skills:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedSkills();
  }, []);

  const features = [
    {
      icon: <SwapHorizIcon sx={{ fontSize: 36, color: '#fff' }} />,
      title: 'Skill Exchange',
      description: 'Share your expertise and learn from others in a collaborative environment designed to maximize learning outcomes.',
    },
    {
      icon: <GroupIcon sx={{ fontSize: 36, color: '#fff' }} />,
      title: 'Vibrant Community',
      description: 'Join our thriving community of passionate learners and skilled professionals from diverse backgrounds.',
    },
    {
      icon: <SchoolIcon sx={{ fontSize: 36, color: '#fff' }} />,
      title: 'Continuous Growth',
      description: 'Expand your knowledge and develop new skills at your own pace through personalized learning paths.',
    },
    {
      icon: <StarIcon sx={{ fontSize: 36, color: '#fff' }} />,
      title: 'Recognition & Rewards',
      description: "Get recognized for your expertise and contribute to others' development while building your professional profile.",
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <Box
        sx={{
          pt: { xs: 8, md: 14 },
          pb: { xs: 10, md: 16 },
          position: 'relative',
          overflow: 'hidden',
          background: (theme) => `linear-gradient(135deg, ${theme.palette.primary.dark}15 0%, ${theme.palette.primary.light}15 100%)`,
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundImage: 'radial-gradient(circle at 20% 30%, rgba(99, 102, 241, 0.15) 0%, transparent 40%), radial-gradient(circle at 80% 70%, rgba(14, 165, 233, 0.15) 0%, transparent 40%)',
            zIndex: 0,
          }
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Grid container spacing={8} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  position: 'relative',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: -30,
                    left: -40,
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    background: (theme) => theme.palette.background.gradient,
                    opacity: 0.1,
                    filter: 'blur(30px)',
                  }
                }}
              >
                <Typography
                  component="h1"
                  variant="h2"
                  sx={{
                    fontWeight: 800,
                    mb: 3,
                    fontSize: { xs: '2.5rem', md: '3.5rem' },
                    background: (theme) => theme.palette.background.gradient,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    animation: 'fadeInUp 0.8s forwards',
                    '@keyframes fadeInUp': {
                      '0%': {
                        opacity: 0,
                        transform: 'translateY(20px)',
                      },
                      '100%': {
                        opacity: 1,
                        transform: 'translateY(0)',
                      },
                    },
                  }}
                >
                  Share Skills,<br />
                  Grow Together
                </Typography>
                <Typography 
                  variant="h5" 
                  color="text.secondary" 
                  paragraph
                  sx={{
                    lineHeight: 1.7,
                    animation: 'fadeInUp 0.8s 0.2s forwards',
                    opacity: 0,
                    '@keyframes fadeInUp': {
                      '0%': {
                        opacity: 0,
                        transform: 'translateY(20px)',
                      },
                      '100%': {
                        opacity: 1,
                        transform: 'translateY(0)',
                      },
                    },
                  }}
                >
                  Connect with others to exchange knowledge and expertise in our vibrant skill-sharing platform that empowers personal and professional growth.
                </Typography>
                <Stack 
                  direction={{ xs: 'column', sm: 'row' }} 
                  spacing={2} 
                  sx={{ 
                    mt: 5,
                    animation: 'fadeInUp 0.8s 0.4s forwards',
                    opacity: 0,
                    '@keyframes fadeInUp': {
                      '0%': {
                        opacity: 0,
                        transform: 'translateY(20px)',
                      },
                      '100%': {
                        opacity: 1,
                        transform: 'translateY(0)',
                      },
                    },
                  }}
                >
                  {!isAuthenticated ? (
                    <>
                      <Button
                        component={RouterLink}
                        to="/register"
                        variant="contained"
                        size="large"
                        sx={{
                          py: 1.8,
                          px: 4,
                          fontSize: '1rem',
                          background: (theme) => theme.palette.background.gradient,
                          fontWeight: 600,
                        }}
                      >
                        Get Started — It's Free
                      </Button>
                      <Button
                        component={RouterLink}
                        to="/login"
                        variant="outlined"
                        size="large"
                        sx={{ py: 1.8, px: 4, fontSize: '1rem', fontWeight: 600 }}
                      >
                        Sign In
                      </Button>
                    </>
                  ) : (
                    <Button
                      component={RouterLink}
                      to="/skills"
                      variant="contained"
                      size="large"
                      endIcon={<ArrowForwardIcon />}
                      sx={{
                        py: 1.8,
                        px: 4,
                        fontSize: '1rem',
                        background: (theme) => theme.palette.background.gradient,
                      }}
                    >
                      Browse Skills
                    </Button>
                  )}
                </Stack>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  position: 'relative',
                  animation: 'fadeIn 1s 0.5s forwards',
                  opacity: 0,
                  '@keyframes fadeIn': {
                    '0%': {
                      opacity: 0,
                    },
                    '100%': {
                      opacity: 1,
                    },
                  },
                }}
              >
                <Box
                  component="img"
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1742&q=80"
                  alt="People collaborating"
                  sx={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: 8,
                    boxShadow: (theme) => theme.shadows[3],
                    transition: 'all 0.5s ease',
                    '&:hover': {
                      transform: 'scale(1.02)',
                      boxShadow: (theme) => theme.shadows[4],
                    }
                  }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    top: -20,
                    right: -20,
                    width: 100,
                    height: 100,
                    borderRadius: '50%',
                    background: (theme) => theme.palette.background.accentGradient,
                    opacity: 0.1,
                    filter: 'blur(40px)',
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 10 }}>
        <Box textAlign="center" mb={8}>
          <Typography
            variant="h3"
            fontWeight={700}
            sx={{ 
              mb: 2,
              background: (theme) => theme.palette.background.gradient,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              display: 'inline-block' 
            }}
          >
            Why Choose SkillSwap?
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 700, mx: 'auto', lineHeight: 1.7 }}>
            Our platform makes it easy to connect, share knowledge, and grow your skills through a vibrant community of experts
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid 
              item 
              xs={12} 
              sm={6} 
              md={3} 
              key={index}
              sx={{
                animation: `fadeInUp 0.6s ${0.2 + index * 0.1}s forwards`,
                opacity: 0,
                '@keyframes fadeInUp': {
                  '0%': {
                    opacity: 0,
                    transform: 'translateY(30px)',
                  },
                  '100%': {
                    opacity: 1,
                    transform: 'translateY(0)',
                  },
                },
              }}
            >
              <FeatureCard {...feature} />
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Featured Skills Section */}
      <Box sx={{ py: 10, backgroundColor: (theme) => `${theme.palette.primary.dark}05` }}>
        <Container maxWidth="lg">
          <Box mb={8}>
            <Typography 
              variant="h3" 
              fontWeight={700} 
              sx={{ 
                mb: 2,
                background: (theme) => theme.palette.background.gradient,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                display: 'inline-block'
              }}
            >
              Featured Skills
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 700, lineHeight: 1.7 }}>
              Discover the most popular skills shared by our community of experts and enthusiasts
            </Typography>
          </Box>

          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
              <CircularProgress />
            </Box>
          ) : featuredSkills.length === 0 ? (
            <Box 
              sx={{ 
                textAlign: 'center', 
                py: 8, 
                borderRadius: 4, 
                border: '1px dashed', 
                borderColor: 'divider' 
              }}
            >
              <Typography variant="h5" color="text.secondary" gutterBottom>
                No skills available yet
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                Be the first to share your expertise with the community
              </Typography>
              <Button
                component={RouterLink}
                to={isAuthenticated ? "/skills" : "/register"}
                variant="contained"
                sx={{
                  background: (theme) => theme.palette.background.gradient,
                }}
              >
                {isAuthenticated ? 'Add Your Skills' : 'Get Started'}
              </Button>
            </Box>
          ) : (
            <Grid container spacing={4}>
              {featuredSkills.map((skill, index) => (
                <Grid 
                  item 
                  key={skill.id} 
                  xs={12} 
                  sm={6} 
                  md={4}
                  sx={{
                    animation: `fadeInUp 0.6s ${0.2 + index * 0.1}s forwards`,
                    opacity: 0,
                    '@keyframes fadeInUp': {
                      '0%': {
                        opacity: 0,
                        transform: 'translateY(30px)',
                      },
                      '100%': {
                        opacity: 1,
                        transform: 'translateY(0)',
                      },
                    },
                  }}
                >
                  <Card
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      overflow: 'hidden',
                      borderRadius: 4,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: (theme) => theme.shadows[4],
                      },
                    }}
                  >
                    <Box
                      sx={{
                        height: 8,
                        width: '100%',
                        background: (theme) => theme.palette.background.gradient,
                      }}
                    />
                    <CardContent sx={{ flexGrow: 1, p: 3 }}>
                      <Box sx={{ mb: 2 }}>
                        <Chip
                          icon={<CategoryIcon />}
                          label={skill.category || 'Programming'}
                          size="small"
                          color="primary"
                          variant="outlined"
                          sx={{ mr: 1, mb: 1 }}
                        />
                        <Chip
                          icon={<SchoolIcon />}
                          label={skill.proficiencyLevel ? skill.proficiencyLevel.charAt(0).toUpperCase() + skill.proficiencyLevel.slice(1) : 'Intermediate'}
                          size="small"
                          color="secondary"
                          variant="outlined"
                          sx={{ mb: 1 }}
                        />
                      </Box>

                      <Typography variant="h5" component="h2" fontWeight={600} gutterBottom>
                        {skill.name}
                      </Typography>

                      <Typography variant="body2" color="text.secondary" paragraph sx={{ mb: 2 }}>
                        {skill.description && skill.description.length > 100
                          ? `${skill.description.substring(0, 100)}...`
                          : skill.description}
                      </Typography>

                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <Avatar sx={{ width: 32, height: 32, mr: 1 }}>
                          {skill.user?.username?.charAt(0).toUpperCase() || <PersonIcon fontSize="small" />}
                        </Avatar>
                        <Typography variant="body2" color="text.secondary">
                          {skill.user?.username || 'Anonymous'}
                        </Typography>
                      </Box>
                    </CardContent>
                    <CardActions sx={{ p: 2, pt: 0 }}>
                      <Button
                        component={RouterLink}
                        to={isAuthenticated ? `/skills/${skill.id}` : '/login'}
                        size="small"
                        color="primary"
                        endIcon={<ArrowForwardIcon />}
                      >
                        Learn More
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </Container>
      </Box>
    </>
  );
};

export default Home; 