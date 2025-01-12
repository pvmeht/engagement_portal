import React from 'react';
import { extendTheme, styled } from '@mui/material/styles';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import PostAddIcon from '@mui/icons-material/PostAdd';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';
import Grid from '@mui/material/Grid2';
import CreatePost from '../components/CreatePost'; // Ensure this file exists and is implemented

const NAVIGATION = [
  {
    segment: 'create-post',
    title: 'Create Post',
    icon: <PostAddIcon />,
  },
  {
    segment: 'logout',
    title: 'Logout',
    icon: <ExitToAppIcon />,
  },
];

const demoTheme = extendTheme({
  colorSchemes: { light: true, dark: true },
  colorSchemeSelector: 'class',
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

function useDemoRouter(initialPath) {
  const [pathname, setPathname] = React.useState(initialPath);

  const router = React.useMemo(() => ({
    pathname,
    searchParams: new URLSearchParams(),
    navigate: (path) => {
      if (path === '/logout') {
        handleLogout();
      } else {
        setPathname(String(path));
      }
    },
  }), []);

  return router;
}

const Skeleton = styled('div')(({ theme, height }) => ({
  backgroundColor: theme.palette.action.hover,
  borderRadius: theme.shape.borderRadius,
  height,
  content: '" "',
}));

const handleLogout = () => {
  localStorage.removeItem('token'); // Clear authentication token
  window.location.href = '/login'; // Redirect to login page
};

export default function UserDashboard(props) {
  const { window } = props;
  const router = useDemoRouter('/create-post'); // Default to Create Post
  const demoWindow = window ? window() : undefined;

  // Render the appropriate component based on the current path
  const renderContent = () => {
    if (router.pathname === '/create-post') {
      return <CreatePost />;
    }
    return (
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <h1>Welcome to the User Dashboard</h1>
        </Grid>
        <Grid item xs={12}>
          <Skeleton height={100} />
        </Grid>
        <Grid item xs={12}>
          <Skeleton height={200} />
        </Grid>
      </Grid>
    );
  };

  return (
    <AppProvider
      navigation={NAVIGATION}
      router={router}
      theme={demoTheme}
      window={demoWindow}
      branding={null} // Attempt to remove branding if this prop exists
    >
      <DashboardLayout  title="" hideBranding>
        <PageContainer>
          {renderContent()}
        </PageContainer>
      </DashboardLayout>
    </AppProvider>
  );
}
