import React from 'react';
import { Box, Container, Typography, Link, Divider, Grid, IconButton, Button, TextField } from '@mui/material';
import { Twitter as TwitterIcon, LinkedIn as LinkedInIcon, GitHub as GitHubIcon, Instagram as InstagramIcon, Email as EmailIcon } from '@mui/icons-material';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Box 
      component="footer" 
      sx={{ 
        py: 8, 
        mt: 'auto',
        background: (theme) => `linear-gradient(135deg, ${theme.palette.primary.dark}15, ${theme.palette.secondary.dark}15)`,
        borderTop: '1px solid rgba(0, 0, 0, 0.06)',
        position: 'relative',
        overflow: 'hidden',
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
        <Grid container spacing={6}>
          <Grid item xs={12} md={4}>
            <Typography 
              variant="h5" 
              sx={{
                fontWeight: 800,
                background: (theme) => theme.palette.background.gradient,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 2,
                display: 'inline-block'
              }}
            >
              SkillSwap
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3, lineHeight: 1.8 }}>
              A vibrant platform where users can exchange skills, knowledge, and expertise in a collaborative community designed for growth and learning.
            </Typography>
            <Box sx={{ display: 'flex', gap: 1.5 }}>
              <IconButton 
                size="small" 
                sx={{ 
                  color: 'white', 
                  background: (theme) => theme.palette.background.gradient,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-3px)',
                    boxShadow: '0 6px 20px rgba(99, 102, 241, 0.25)',
                  }
                }}
                aria-label="twitter"
              >
                <TwitterIcon fontSize="small" />
              </IconButton>
              <IconButton 
                size="small" 
                sx={{ 
                  color: 'white', 
                  background: (theme) => theme.palette.background.gradient,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-3px)',
                    boxShadow: '0 6px 20px rgba(99, 102, 241, 0.25)',
                  }
                }}
                aria-label="linkedin"
              >
                <LinkedInIcon fontSize="small" />
              </IconButton>
              <IconButton 
                size="small" 
                sx={{ 
                  color: 'white', 
                  background: (theme) => theme.palette.background.gradient,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-3px)',
                    boxShadow: '0 6px 20px rgba(99, 102, 241, 0.25)',
                  }
                }}
                aria-label="github"
              >
                <GitHubIcon fontSize="small" />
              </IconButton>
              <IconButton 
                size="small" 
                sx={{ 
                  color: 'white', 
                  background: (theme) => theme.palette.background.gradient,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-3px)',
                    boxShadow: '0 6px 20px rgba(99, 102, 241, 0.25)',
                  }
                }}
                aria-label="instagram"
              >
                <InstagramIcon fontSize="small" />
              </IconButton>
            </Box>
          </Grid>
          <Grid item xs={6} md={2}>
            <Typography variant="subtitle1" fontWeight={700} gutterBottom>
              Platform
            </Typography>
            <Link href="#" color="text.secondary" display="block" sx={{ mb: 1.5, transition: 'color 0.2s ease', '&:hover': { color: 'primary.main' } }}>
              How it works
            </Link>
            <Link href="#" color="text.secondary" display="block" sx={{ mb: 1.5, transition: 'color 0.2s ease', '&:hover': { color: 'primary.main' } }}>
              Testimonials
            </Link>
            <Link href="#" color="text.secondary" display="block" sx={{ mb: 1.5, transition: 'color 0.2s ease', '&:hover': { color: 'primary.main' } }}>
              Pricing
            </Link>
            <Link href="#" color="text.secondary" display="block" sx={{ mb: 1.5, transition: 'color 0.2s ease', '&:hover': { color: 'primary.main' } }}>
              FAQ
            </Link>
          </Grid>
          <Grid item xs={6} md={2}>
            <Typography variant="subtitle1" fontWeight={700} gutterBottom>
              Company
            </Typography>
            <Link href="#" color="text.secondary" display="block" sx={{ mb: 1.5, transition: 'color 0.2s ease', '&:hover': { color: 'primary.main' } }}>
              About
            </Link>
            <Link href="#" color="text.secondary" display="block" sx={{ mb: 1.5, transition: 'color 0.2s ease', '&:hover': { color: 'primary.main' } }}>
              Blog
            </Link>
            <Link href="#" color="text.secondary" display="block" sx={{ mb: 1.5, transition: 'color 0.2s ease', '&:hover': { color: 'primary.main' } }}>
              Careers
            </Link>
            <Link href="#" color="text.secondary" display="block" sx={{ mb: 1.5, transition: 'color 0.2s ease', '&:hover': { color: 'primary.main' } }}>
              Contact
            </Link>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="subtitle1" fontWeight={700} gutterBottom>
              Subscribe to Our Newsletter
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Get the latest updates and news delivered to your inbox.
            </Typography>
            <Box sx={{ display: 'flex' }}>
              <TextField
                size="small"
                placeholder="Your email address"
                variant="outlined"
                sx={{ 
                  flexGrow: 1,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px 0 0 12px',
                  }
                }}
              />
              <Button
                startIcon={<EmailIcon />}
                sx={{
                  borderRadius: '0 12px 12px 0',
                  background: (theme) => theme.palette.background.gradient,
                  color: 'white',
                  py: 1,
                }}
              >
                Subscribe
              </Button>
            </Box>
          </Grid>
        </Grid>
        <Divider sx={{ my: 6, opacity: 0.6 }} />
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          flexWrap: 'wrap',
          gap: 2
        }}>
          <Typography variant="body2" color="text.secondary">
            © {currentYear} SkillSwap. All rights reserved. Created by Arunim Parashar.
          </Typography>
          <Box>
            <Link href="#" color="text.secondary" sx={{ ml: 3, transition: 'color 0.2s ease', '&:hover': { color: 'primary.main' } }}>
              Privacy Policy
            </Link>
            <Link href="#" color="text.secondary" sx={{ ml: 3, transition: 'color 0.2s ease', '&:hover': { color: 'primary.main' } }}>
              Terms of Service
            </Link>
            <Link href="#" color="text.secondary" sx={{ ml: 3, transition: 'color 0.2s ease', '&:hover': { color: 'primary.main' } }}>
              Cookies
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer; 