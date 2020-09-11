import React, { useState } from 'react';
import { Button, ListItemAvatar, Paper, Card, Avatar, Grid, List, ListItem, IconButton, ListItemIcon, ListItemText, ListItemSecondaryAction } from '@material-ui/core';
import StudentsService from '../../../services/StudentsService';
import { map } from 'lodash';
import { CheckCircle, Add, Delete, ThreeDRotation, } from '@material-ui/icons';
import { useFirestore, useFirestoreDocData } from 'reactfire';
import Snackbar from '@material-ui/core/Snackbar';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    card: {
        backgroundColor: theme.palette.success.main,
        color: theme.color,
        padding: 20
    },
}));

export default (props) => {

    const studentsService = new StudentsService(useFirestore());
    const [open, setOpen] = React.useState(false);
    const [notifyMessage, setNotifyMessage] = useState("Success!");
    const classes = useStyles();

    const notifySuccess = (message) => {
        setNotifyMessage(message);
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const addStudent = async (student = null) => {

        try {


            await studentsService.addStudent({
                firstName: "Chauncey",
                lastName: "Philpot"
            });

            notifySuccess("Successfully Added Student");
            props.reloadStudents();
        }
        catch (error) {
            alert("Failed");
            console.error(error);
        }
    }

    const deleteStudent = async (studentId) => {
        await studentsService.deleteStudent(studentId);

        notifySuccess("Successfully deleted");

        props.reloadStudents();
    }

    return (

        <div >
            <Grid>
                <Grid container direction="row"
                    alignContent="flex-start" justify="flex-start">

                    <Button onClick={addStudent} color="primary" variant="outlined">
                        <Add /> Student
                    </Button>
                </Grid>

                <Card>


                    <List style={{ width: "100%" }}>
                        {map(props.students, ((student, index) => {
                            const labelId = `checkbox-list-label-${student.id}`;

                            return (
                                <ListItem key={student.id} role={undefined} dense button>
                                    <ListItemAvatar>
                                        <Avatar
                                        />
                                    </ListItemAvatar>
                                    <ListItemText id={labelId} primary={`${student?.firstName} ${student?.lastName}`} />
                                    <ListItemSecondaryAction>
                                        <IconButton onClick={() => deleteStudent(student.id)}>
                                            <Delete color="error" />
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            );
                        }))}

                    </List>

                </Card>

            </Grid>

            <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
                <Paper className={classes.card} color="success">
                    <Grid container justify="center" alignContent="center" direction="row">


                        <CheckCircle /> {notifyMessage}

                    </Grid>
                </Paper >
            </Snackbar>
        </div>
    )
}