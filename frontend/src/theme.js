import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#7C3AED', // More vibrant purple
      light: '#A78BFA',
      dark: '#5B21B6',
      contrastText: '#fff',
    },
    secondary: {
      main: '#06B6D4', // Brighter cyan
      light: '#67E8F9',
      dark: '#0E7490',
      contrastText: '#fff',
    },
    accent: {
      main: '#F43F5E', // Rose
      light: '#FB7185',
      dark: '#BE123C',
      contrastText: '#fff',
    },
    success: {
      main: '#22C55E', // Vibrant green
      light: '#4ADE80',
      dark: '#15803D',
      contrastText: '#fff',
    },
    warning: {
      main: '#F59E42', // More orange
      light: '#FBBF24',
      dark: '#B45309',
      contrastText: '#fff',
    },
    error: {
      main: '#EF4444',
      light: '#F87171',
      dark: '#B91C1C',
      contrastText: '#fff',
    },
    text: {
      primary: '#0F172A', // Deeper gray
      secondary: '#64748B',
    },
    background: {
      default: '#F1F5F9', // Lighter background
      paper: '#FFFFFF',
      gradient: 'linear-gradient(135deg, #7C3AED 0%, #06B6D4 100%)',
      accentGradient: 'linear-gradient(135deg, #F43F5E 0%, #FB7185 100%)',
      secondaryGradient: 'linear-gradient(135deg, #22C55E 0%, #4ADE80 100%)',
      vibrantGradient: 'linear-gradient(135deg, #F59E42 0%, #F43F5E 100%)',
    },
    divider: 'rgba(0, 0, 0, 0.08)',
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '3.5rem',
      fontWeight: 800,
      color: '#111827',
      letterSpacing: '-0.025em',
      lineHeight: 1.2,
    },
    h2: {
      fontSize: '2.5rem',
      fontWeight: 700,
      color: '#111827',
      letterSpacing: '-0.02em',
      lineHeight: 1.3,
    },
    h3: {
      fontSize: '2rem',
      fontWeight: 700,
      color: '#111827',
      letterSpacing: '-0.015em',
      lineHeight: 1.4,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
      color: '#111827',
      letterSpacing: '-0.01em',
      lineHeight: 1.4,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 600,
      color: '#111827',
      letterSpacing: '-0.005em',
      lineHeight: 1.5,
    },
    h6: {
      fontSize: '1.125rem',
      fontWeight: 600,
      color: '#111827',
      letterSpacing: 0,
      lineHeight: 1.5,
    },
    subtitle1: {
      fontSize: '1rem',
      fontWeight: 500,
      letterSpacing: '0.01em',
    },
    body1: {
      fontSize: '1rem',
      letterSpacing: '0.005em',
      lineHeight: 1.7,
    },
    body2: {
      fontSize: '0.875rem',
      letterSpacing: '0.005em',
      lineHeight: 1.7,
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
      letterSpacing: '0.01em',
    },
  },
  shape: {
    borderRadius: 12,
  },
  shadows: [
    'none',
    '0px 2px 8px rgba(124, 58, 237, 0.10), 0px 4px 12px rgba(6, 182, 212, 0.10)',
    '0px 4px 16px rgba(244, 63, 94, 0.10), 0px 8px 24px rgba(34, 197, 94, 0.10)',
    '0px 8px 32px rgba(245, 158, 66, 0.10), 0px 16px 40px rgba(124, 58, 237, 0.10)',
    ...Array(20).fill('none'),
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          padding: '12px 28px',
          fontSize: '1rem',
          fontWeight: 700,
          boxShadow: '0 2px 8px rgba(124, 58, 237, 0.15)',
          transition: 'all 0.25s cubic-bezier(.4,2,.6,1)',
          background: 'linear-gradient(135deg, #7C3AED 0%, #06B6D4 100%)',
          color: '#fff',
          '&:hover': {
            transform: 'scale(1.04) translateY(-2px)',
            boxShadow: '0 6px 24px rgba(244, 63, 94, 0.20)',
            background: 'linear-gradient(135deg, #5B21B6 0%, #0E7490 100%)',
          },
        },
        containedPrimary: {
          background: 'linear-gradient(135deg, #7C3AED 0%, #06B6D4 100%)',
          '&:hover': {
            background: 'linear-gradient(135deg, #5B21B6 0%, #0E7490 100%)',
          },
        },
        outlined: {
          borderWidth: '2px',
          '&:hover': {
            borderWidth: '2px',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          boxShadow: '0 8px 32px rgba(124, 58, 237, 0.10)',
          border: '1.5px solid',
          borderColor: 'rgba(124, 58, 237, 0.10)',
          transition: 'all 0.3s cubic-bezier(.4,2,.6,1)',
          '&:hover': {
            transform: 'scale(1.02) translateY(-6px)',
            boxShadow: '0 16px 48px rgba(244, 63, 94, 0.15)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 14,
            transition: 'all 0.2s cubic-bezier(.4,2,.6,1)',
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#7C3AED',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              boxShadow: '0 0 0 6px rgba(124, 58, 237, 0.10)',
            },
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          fontWeight: 700,
          fontSize: '1rem',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: '0 2px 16px rgba(0, 0, 0, 0.04)',
          backdropFilter: 'blur(12px)',
          backgroundColor: 'rgba(255, 255, 255, 0.98)',
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: 'rgba(0, 0, 0, 0.06)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
        },
        elevation1: {
          boxShadow: '0 2px 12px rgba(0, 0, 0, 0.06)',
        },
        elevation2: {
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          backgroundColor: '#6366F1',
          color: '#fff',
          fontWeight: 600,
          boxShadow: '0 2px 8px rgba(99, 102, 241, 0.3)',
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          paddingLeft: 24,
          paddingRight: 24,
          '@media (min-width: 600px)': {
            paddingLeft: 32,
            paddingRight: 32,
          },
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        indicator: {
          height: 3,
          borderRadius: 1.5,
          background: 'linear-gradient(135deg, #6366F1 0%, #0EA5E9 100%)',
        }
      }
    },
    MuiTab: {
      styleOverrides: {
        root: {
          transition: 'all 0.2s ease',
          '&:hover': {
            color: '#6366F1',
          },
          '&.Mui-selected': {
            color: '#6366F1',
            fontWeight: 600,
          },
        }
      }
    }
  },
});

export default theme; 