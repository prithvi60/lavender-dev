
import { styled } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import { 
    Toolbar,
    IconButton,
    Divider,
    List
} from '@mui/material';
import { ChevronLeft } from '@mui/icons-material';
import AdminDrawerItem from '../AdminDrawerItem';
import { DASHBOARD } from '../../../constants/constants';

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
      '& .MuiDrawer-paper': {
        position: 'relative',
        whiteSpace: 'nowrap',
        backgroundColor: "#5F4F65",
        color: "#FAF4FC",
        width: DASHBOARD?.DRAWER_WIDTH,
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
        boxSizing: 'border-box',
        ...(!open && {
          overflowX: 'hidden',
          transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          width: theme.spacing(7),
          [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
          },
        }),
      },
    }),
);

export const AdminDrawer = ({ open, toggleDrawer }) => {
    return ( 
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeft />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            <AdminDrawerItem />
          </List>
        </Drawer>
     );
}

export default AdminDrawer;