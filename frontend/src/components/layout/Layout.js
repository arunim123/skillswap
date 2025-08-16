import React from 'react';
import { Box, AppBar, Toolbar, Typography, Button, Container, IconButton, Avatar, Menu, MenuItem, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/authSlice';
import MenuIcon from '@mui/icons-material/Menu';
import PersonIcon from '@mui/icons-material/Person';
import Footer from './Footer';

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMenuAnchor, setMobileMenuAnchor] = React.useState(null);

  const handleMenu = (event) => setAnchorEl(event.currentTarget);
  const handleMobileMenu = (event) => setMobileMenuAnchor(event.currentTarget);
  const handleClose = () => {
    setAnchorEl(null);
    setMobileMenuAnchor(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    handleClose();
    navigate('/');
  };

  const menuItems = [
    { label: 'Home', path: '/' },
    { label: 'Browse Skills', path: '/skills' },
    { label: 'Find Mentors', path: '/mentors' },
    { label: 'Community', path: '/community' },
    { label: 'About', path: '/about' },
  ];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="fixed" elevation={1} sx={{ backgroundColor: 'white' }}>
        <Container maxWidth="lg">
          <Toolbar disableGutters>
            {/* Logo */}
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ 
                mr: 2, 
                display: { xs: 'none', md: 'flex' },
                color: 'primary.main',
                fontWeight: 700,
                fontSize: '1.5rem',
                cursor: 'pointer',
                background: (theme) => theme.palette.background.gradient,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
              onClick={() => navigate('/')}
            >
              SkillBridge
            </Typography>

            {/* Add Tagline */}
            <Typography
              variant="subtitle2"
              noWrap
              sx={{
                display: { xs: 'none', md: 'block' },
                color: 'text.secondary',
                ml: 2,
                borderLeft: '2px solid',
                borderColor: 'divider',
                paddingLeft: 2,
              }}
            >
              Connect. Learn. Grow Together.
            </Typography>

            {/* Mobile Menu */}
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                onClick={handleMobileMenu}
                color="primary"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                anchorEl={mobileMenuAnchor}
                open={Boolean(mobileMenuAnchor)}
                onClose={handleClose}
                sx={{ mt: '45px' }}
              >
                {menuItems.map((item) => (
                  <MenuItem 
                    key={item.path}
                    onClick={() => {
                      navigate(item.path);
                      handleClose();
                    }}
                  >
                    <Typography textAlign="center">{item.label}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            {/* Mobile Logo */}
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{
                flexGrow: 1,
                display: { xs: 'flex', md: 'none' },
                color: 'primary.main',
                fontWeight: 700,
                fontSize: '1.5rem',
                background: (theme) => theme.palette.background.gradient,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
              onClick={() => navigate('/')}
            >
              SkillBridge
            </Typography>

            {/* Desktop Menu */}
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, gap: 2, ml: 4 }}>
              {menuItems.map((item) => (
                <Button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  sx={{ 
                    color: 'text.primary',
                    '&:hover': {
                      color: 'primary.main',
                      backgroundColor: 'transparent'
                    }
                  }}
                >
                  {item.label}
                </Button>
              ))}
            </Box>

            {/* Auth Buttons */}
            <Box sx={{ flexGrow: 0 }}>
              {isAuthenticated ? (
                <>
                  <IconButton onClick={handleMenu} sx={{ p: 0 }}>
                    <Avatar sx={{ 
                      bgcolor: 'primary.main',
                      background: (theme) => theme.palette.background.gradient,
                    }}>
                      {user?.firstName?.[0] || <PersonIcon />}
                    </Avatar>
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                  >
                    <MenuItem onClick={() => {
                      navigate('/profile');
                      handleClose();
                    }}>
                      Profile
                    </MenuItem>
                    <MenuItem onClick={() => {
                      navigate('/dashboard');
                      handleClose();
                    }}>
                      Dashboard
                    </MenuItem>
                    <MenuItem onClick={() => {
                      navigate('/settings');
                      handleClose();
                    }}>
                      Settings
                    </MenuItem>
                    <Divider />
                    <MenuItem onClick={handleLogout}>
                      Logout
                    </MenuItem>
                  </Menu>
                </>
              ) : (
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Button
                    variant="outlined"
                    onClick={() => navigate('/login')}
                    sx={{ borderRadius: 2 }}
                  >
                    Login
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() => navigate('/register')}
                    sx={{ 
                      borderRadius: 2,
                      background: (theme) => theme.palette.background.accentGradient,
                      '&:hover': {
                        background: (theme) => `linear-gradient(135deg, ${theme.palette.accent.dark} 0%, ${theme.palette.accent.main} 100%)`,
                      }
                    }}
                  >
                    Sign Up
                  </Button>
                </Box>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Box component="main" sx={{ flexGrow: 1, pt: 10, pb: 4 }}>
        <Container maxWidth="lg">
          {children}
        </Container>
      </Box>
      <Footer />
    </Box>
  );
};

export default Layout; 