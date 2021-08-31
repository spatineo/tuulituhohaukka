import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadInitialSetup, setStateFromUrl } from '../../Store/Actions/data'
import { AppBar, Button, Divider, Drawer, IconButton, Toolbar, List, ListItem } from '@material-ui/core'
import clsx from 'clsx';
import MenuIcon from '@material-ui/icons/Menu'
import { makeStyles, createStyles, useTheme } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import MapView from './MapView'
import { RootState } from '../../App';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import GraphIcon from '@material-ui/icons/Assessment';
import CalendarIcon from '@material-ui/icons/Today';
import LinkIcon from '@material-ui/icons/Link'

import SelectDay from '../SidePanel/SelectDay';
import SelectMonth from '../SidePanel/SelectMonth';

const drawerWidth = 450

const MainView: React.FC = (props: any) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const globalState = useSelector((state: RootState) => state.dataReducer.data.global)
  const mapArray = useSelector((state: RootState) => state.dataReducer.data.maps)

  const theme = useTheme()
  const [open, setOpen] = React.useState(false)

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const createUrl = () => {
    const filteredMaps = mapArray.map((mapObject, index) => {
      return {
        id: index,
        selectedDataset: mapObject.selectedDataset,
        channelSettings: mapObject.channelSettings,
        displayWindDamagedVector: mapObject.displayWindDamageVector,
        displaySpyGlass: mapObject.displaySpyGlass,
        panelBarSettings: mapObject.panelBarSettings,
        derivedData: {
          bands: [],
          timeValues: {
            inspection: '',
            comparison: '',
          },
          mapLayers: [[]]
        }
      }
    })

    const newStateObject = {
      data: {
        global: globalState,
        maps: filteredMaps
      }
    }
    const objectAsString = JSON.stringify(newStateObject)
    const URL = encodeURI(`http://localhost:3000/stateData/${objectAsString}`)
    console.log('URL with state: ', URL)
    return URL
  }

  React.useEffect(() => {
    const currentUrl = props.location.pathname
    if (currentUrl === '/') {
      dispatch(loadInitialSetup())
    }
    else if (currentUrl.includes('/stateData')) {
      const stateData = currentUrl.slice(11)
      const stateDataObject = JSON.parse(decodeURI(stateData))
      dispatch(setStateFromUrl(stateDataObject))
    }
  }, [])

  React.useEffect(() => {
    window.history.replaceState(null, "New Page Title", "/")
  }, [globalState])

  return (
    <div className="App">
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Tuulituhohaukka 🌪 💥 🦅
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <List >

          <ListItem disableGutters>
            <Button onClick={open ? handleDrawerClose : handleDrawerOpen}>
              <ListItemIcon>
                <GraphIcon />
              </ListItemIcon>
            </Button>
            <div className={clsx(classes.graphContent, {
              [classes.graphContentShift]: open
            })}>
              <SelectMonth />
            </div>
          </ListItem>

          <Divider />

          <ListItem disableGutters>
            <Button onClick={open ? handleDrawerClose : handleDrawerOpen}>
              <ListItemIcon>
                <CalendarIcon />
              </ListItemIcon>
            </Button>
            <div className={clsx(classes.graphContent, {
              [classes.graphContentShift]: open
            })}>
              <SelectDay />
            </div>
          </ListItem>

          <Divider />

          <ListItem disableGutters>
            <Button onClick={open ? handleDrawerClose : handleDrawerOpen}>
              <ListItemIcon>
                <LinkIcon />
              </ListItemIcon>
            </Button>
            <div className={clsx(classes.graphContent, {
              [classes.linkShift]: open
            })}>
              <Button
                variant='contained'
                onClick={() => {
                  window.prompt('Copy the link from here ⬇️', createUrl())
                }}>
                Copy URL to clipboard
              </Button>
            </div>
          </ListItem>

        </List>
      </Drawer>
      <div className={clsx(classes.content, {
        [classes.contentShift]: open,
      })}>
        <div className={classes.toolbar} />
        <MapView />
      </div>
    </div>
  )
}

const useStyles = makeStyles((theme) =>
  createStyles({
    container: {
      height: '100%'
    },
    root: {
      display: 'flex',
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: 36,
    },
    hide: {
      display: 'none',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap',
    },
    drawerOpen: {
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerClose: {
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: 'hidden',
      width: theme.spacing(7) + 1,
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9) + 1,
      },
    },
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
    },
    content: {
      flexGrow: 1,
      margin: theme.spacing(5),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: 0,
    },
    contentShift: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: drawerWidth,
    },


    graphContent: {
      margin: theme.spacing(4),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    graphContentShift: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    },
    linkShift: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      display: 'flex',
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: 0,
    },
  }),
)

export default MainView;