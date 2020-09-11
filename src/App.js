import { AppBar, Button, Container, Toolbar, Typography, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import React from 'react';
import './App.css';
import Students from './components/students/Students';

import { FirebaseAppProvider, useFirestoreDocData, useFirestore, SuspenseWithPerf } from 'reactfire';


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

    return (
        <FirebaseAppProvider firebaseConfig={firebaseConfig}>
            <div className="App">
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" className={classes.title}>
                            Red River Students
                    </Typography>

                    </Toolbar>
                </AppBar>

                <Grid container style={{ margin: 10 }}  alignContent = "center" justify = "center">

                    <Students />
                </Grid>
            </div>
        </FirebaseAppProvider>
    );
}

export default App;
