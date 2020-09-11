import { AppBar, Button, Divider, Drawer, Grid, IconButton, List, ListItem, ListItemIcon, ListItemText, Toolbar, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@material-ui/icons';
import MenuIcon from '@material-ui/icons/Menu';
import React, { Suspense, useState } from 'react';
import { FirebaseAppProvider } from 'reactfire';
import './App.css';
import Students from './components/students/Students';



const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

const firebaseConfig = {
    apiKey: "AIzaSyAHaAtLLIU3pdUK8_3FuXuJ_C4BibJTa94",
    authDomain: "redriverdemo.firebaseapp.com",
    databaseURL: "https://redriverdemo.firebaseio.com",
    projectId: "redriverdemo",
    storageBucket: "redriverdemo.appspot.com",
    messagingSenderId: "212163606309",
    appId: "1:212163606309:web:21ba21ea05df973930cccc",
    measurementId: "G-G5QC085CBB"
};



function App() {

    const classes = useStyles();
    const [drawerOpen, setDrawerOpen] = useState(false);

    return (
        <FirebaseAppProvider firebaseConfig={firebaseConfig}>
            <div className="App">
                <AppBar position="static">
                    <Toolbar>

                        <div>
                            <IconButton onClick={() => setDrawerOpen(true)} >
                                <MenuIcon />
                            </IconButton>
                        </div>

                        <Typography variant="h6" className={classes.title}>
                            Red River Students
                        </Typography>
                        <div>

                        </div>

                    </Toolbar>
                </AppBar>

                <Drawer anchor="left"
                    open={drawerOpen}>

                    <Grid container direction="column" style={{ minWidth: 200 }}>
                        <Button onClick={() => setDrawerOpen(false)}>
                            <KeyboardArrowLeft />
                        </Button>

                        <Divider />

                        <List>
                            <ListItem button>
                              
                                <ListItemText>
                                    Home
                                </ListItemText>

                                <ListItemIcon>
                                    <KeyboardArrowRight />
                                </ListItemIcon>

                            </ListItem>
                        </List>
                    </Grid>
                </Drawer>

                <Grid container style={{ margin: 10 }} alignContent="center" justify="center">
                    <Suspense fallback={'loading...'}>
                        <Students />
                    </Suspense>
                </Grid>
            </div>
        </FirebaseAppProvider>
    );
}

export default App;
