import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  Tooltip,
  MenuItem,
  Divider,
  useScrollTrigger,
  Badge,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import PersonIcon from '@mui/icons-material/Person';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { logout } from '../store/authSlice';

const Navigation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
  const handleCloseNavMenu = () => setAnchorElNav(null);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
    handleCloseUserMenu();
  };

  const pages = isAuthenticated
    ? [
        { name: 'Skills', path: '/skills' },
        { name: 'Browse Skills', path: '/browse' },
        { name: 'Requests', path: '/requests' },
      ]
    : [];

  const settings = isAuthenticated
    ? [
        { name: 'Profile', action: () => navigate('/profile') },
        { name: 'My Skills', action: () => navigate('/skills') },
        { name: 'Account Settings', action: () => navigate('/settings') },
        { name: 'Logout', action: handleLogout },
      ]
    : [];

  // Change app bar to solid when scrolled
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 60,
  });

  return (
    <AppBar 
      position="sticky" 
      elevation={trigger ? 3 : 0}
      sx={{
        background: trigger 
          ? (theme) => theme.palette.background.paper
          : 'transparent',
        boxShadow: trigger 
          ? (theme) => theme.shadows[3]
          : 'none',
        borderBottom: !trigger ? '1px solid rgba(0, 0, 0, 0.05)' : 'none',
        transition: 'all 0.3s ease',
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ py: { xs: 1, md: 1.5 } }}>
          {/* Logo - Desktop */}
          <Typography
            variant="h5"
            noWrap
            component={RouterLink}
            to="/"
            sx={{
              mr: 3,
              display: { xs: 'none', md: 'flex' },
              fontWeight: 800,
              background: (theme) => theme.palette.background.gradient,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textDecoration: 'none',
            }}
          >
            SkillSwap
          </Typography>

          {/* Mobile Menu */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
              sx={{ color: 'text.primary' }}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
                '& .MuiPaper-root': {
                  borderRadius: 2,
                  boxShadow: (theme) => theme.shadows[3],
                },
              }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page.name}
                  onClick={handleCloseNavMenu}
                  component={RouterLink}
                  to={page.path}
                >
                  <Typography textAlign="center">{page.name}</Typography>
                </MenuItem>
              ))}
              {!isAuthenticated && (
                <>
                  <MenuItem component={RouterLink} to="/login" onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">Login</Typography>
                  </MenuItem>
                  <MenuItem component={RouterLink} to="/register" onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">Sign Up</Typography>
                  </MenuItem>
                </>
              )}
            </Menu>
          </Box>

          {/* Logo - Mobile */}
          <Typography
            variant="h5"
            noWrap
            component={RouterLink}
            to="/"
            sx={{
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontWeight: 800,
              background: (theme) => theme.palette.background.gradient,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textDecoration: 'none',
            }}
          >
            SkillSwap
          </Typography>

          {/* Desktop Menu */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page.name}
                component={RouterLink}
                to={page.path}
                onClick={handleCloseNavMenu}
                sx={{ 
                  mx: 1, 
                  my: 2, 
                  px: 2,
                  color: 'text.primary', 
                  display: 'block',
                  fontWeight: 600,
                  position: 'relative',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    width: '0%',
                    height: '2px',
                    bottom: 0,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: (theme) => theme.palette.background.gradient,
                    transition: 'width 0.3s ease',
                  },
                  '&:hover': {
                    backgroundColor: 'transparent',
                    '&::after': {
                      width: '80%',
                    },
                  },
                }}
              >
                {page.name}
              </Button>
            ))}
          </Box>

          {/* Auth Buttons / User Menu */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {isAuthenticated ? (
              <>
                <IconButton 
                  color="primary" 
                  sx={{ 
                    display: { xs: 'none', md: 'flex' },
                    mx: 1,
                  }}
                >
                  <Badge badgeContent={3} color="error">
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
                <Tooltip title="Open settings">
                  <IconButton 
                    onClick={handleOpenUserMenu} 
                    sx={{ 
                      p: 0.5,
                      ml: { xs: 0, md: 2 },
                      border: '2px solid transparent',
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        borderColor: (theme) => theme.palette.primary.main,
                      },
                    }}
                  >
                    <Avatar 
                      alt={user?.username || 'User'}
                      sx={{ 
                        width: 40, 
                        height: 40,
                        background: (theme) => theme.palette.background.gradient,
                        color: '#fff',
                        fontWeight: 600,
                      }}
                    >
                      {user?.username?.charAt(0).toUpperCase() || <PersonIcon />}
                    </Avatar>
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ 
                    mt: '45px',
                    '& .MuiPaper-root': {
                      borderRadius: 2,
                      minWidth: 180,
                      boxShadow: (theme) => theme.shadows[3],
                      mt: 1.5,
                    },
                  }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <Box sx={{ px: 2, py: 1 }}>
                    <Typography variant="subtitle2" fontWeight={600}>
                      {user?.username || 'User'}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {user?.email || 'user@example.com'}
                    </Typography>
                  </Box>
                  <Divider />
                  {settings.map((setting) => (
                    <MenuItem 
                      key={setting.name} 
                      onClick={setting.action}
                      sx={{
                        borderRadius: 1,
                        mx: 1,
                        my: 0.5,
                        px: 1.5,
                        '&:hover': {
                          backgroundColor: (theme) => theme.palette.primary.main + '10',
                        },
                      }}
                    >
                      <Typography textAlign="center">{setting.name}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </>
            ) : (
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button
                  component={RouterLink}
                  to="/login"
                  variant="outlined"
                  sx={{ 
                    display: { xs: 'none', md: 'flex' },
                    color: 'text.primary', 
                    borderColor: 'divider',
                    borderWidth: 2,
                    '&:hover': {
                      borderWidth: 2,
                      borderColor: (theme) => theme.palette.primary.main,
                    },
                  }}
                >
                  Login
                </Button>
                <Button
                  component={RouterLink}
                  to="/register"
                  variant="contained"
                  sx={{
                    display: { xs: 'none', md: 'flex' },
                    background: (theme) => theme.palette.background.gradient,
                    boxShadow: (theme) => theme.shadows[2],
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
  );
};

export default Navigation; 