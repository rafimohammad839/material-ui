import { AddCircleOutline, SubjectOutlined } from '@mui/icons-material';
import { Drawer, Typography } from '@mui/material';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { makeStyles } from '@mui/styles'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Avatar from '@mui/material/Avatar';
import { format } from 'date-fns';


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  page: {
    backgroundColor: "#f9f9f9 !important",
    width: "100% !important",
    padding: theme.spacing(3)
  },
  drawer: {
    width: drawerWidth
  },
  drawerPaper: {
    width: drawerWidth
  },
  root: {
    display: "flex"
  },
  active: {
    backgroundColor: '#f4f4f4 !important'
  },
  title: {
    padding: theme.spacing(2)
  },
  appbar: {
    width: `calc(100% - ${drawerWidth}px) !important`
  },
  toolbar: theme.mixins.toolbar,
  date: {
    flexGrow: '1 !important'
  },
  avatar: {
    marginLeft: theme.spacing(2)
  }
}))

const Layout = ({ children }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      text: "My Notes",
      icon: <SubjectOutlined color='secondary' />,
      path: '/'
    },
    {
      text: "Create Notes",
      icon: <AddCircleOutline color='secondary' />,
      path: '/create'
    },
  ]

  return (
    <div className={classes.root}>
      {/* app bar */}
      <AppBar
        className={classes.appbar}
        elevation={0}
      >
        <Toolbar>
          <Typography color="text.primary" className={classes.date}>
            Today is {format(new Date(), 'EEEE, do MMMM Y')}
          </Typography>
          <Typography>
            Mario
          </Typography>
          <Avatar src='/mario-av.png' className={classes.avatar} />
        </Toolbar>
      </AppBar>
      {/* side drawer */}

      <Drawer
        color='secondary'
        className={classes.drawer}
        variant='permanent'
        anchor='left'
        classes={{ paper: classes.drawerPaper }}
      >
        <div>
          <Typography variant='h5' className={classes.title}>
            Ninja Notes
          </Typography>
        </div>

        <List>
          
          {/* List Links */}
          {menuItems.map((menuItem) => (
            <ListItem
              className={location.pathname === menuItem.path ? classes.active : ''}
              button
              key={menuItem.text}
              onClick={() => navigate(menuItem.path)}
            >
              <ListItemIcon>{menuItem.icon}</ListItemIcon>
              <ListItemText primary={menuItem.text} />
            </ListItem>
          ))}

          
        </List>
      </Drawer>

      <div className={classes.page}>
        <div className={classes.toolbar}></div>
        {children}
      </div>
    </div>
  )
}

export default Layout