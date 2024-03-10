
import { styled } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import { 
    Toolbar,
    IconButton,
    Typography,
    Badge
} from '@mui/material';
import { Notifications, Menu } from '@mui/icons-material';
import { DASHBOARD } from '../../../constants/constants';

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
  })(({ theme, open }) => ({
    backgroundColor: "#816F7D",
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      marginLeft: DASHBOARD?.DRAWER_WIDTH,
      width: `calc(100% - ${DASHBOARD?.DRAWER_WIDTH}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));

const AdminAppBar = ({ open, toggleDrawer }) => {
    return ( 
        <AppBar position="absolute" open={open}>
          <Toolbar sx={{ pr: '24px' }} >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <Menu />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Admin
            </Typography>
            <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <Notifications />
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBar>
     );
}

export default AdminAppBar;