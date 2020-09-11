import React, { useState } from 'react';
import { Button, ListItemAvatar, CardContent, Paper, Card, Avatar, Grid, List, ListItem, IconButton, ListItemIcon, ListItemText, ListItemSecondaryAction, Typography } from '@material-ui/core';
import StudentsService from '../../../services/StudentsService';
import { map } from 'lodash';
import { CheckCircle, Add, Delete, ThreeDRotation, } from '@material-ui/icons';
import { useFirestore, useFirestoreDocData } from 'reactfire';
import Snackbar from '@material-ui/core/Snackbar';
import { makeStyles } from '@material-ui/core/styles';

import StudentDialog from '../studentDialog/StudentDialog';

const useStyles = makeStyles(theme => ({
    card: {
        backgroundColor: theme.palette.success.main,
        color: theme.color,
        padding: 20
    },
}));

export default (props) => {

    const studentsService = new StudentsService(useFirestore());
    const [open, setOpen] = useState(false);
    const [studentDialogProps, setStudentDialogConfig] = useState({ open: false, student: {} });
    const [notifyMessage, setNotifyMessage] = useState("Success!");
    const classes = useStyles();

    const notifySuccess = (message) => {
        setOpen(false);
        setNotifyMessage(message);
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };


    const deleteStudent = async (studentId) => {
        await studentsService.deleteStudent(studentId);

        notifySuccess("Successfully deleted");

        props.reloadStudents();
    }

    const showStudentDetails = (student) => {
        console.log(student);
        setStudentDialogConfig({
            open: true,
            student: student
        });
    }

    const hideStudentDetails = (reason) => {
        setStudentDialogConfig({
            open: false,
            student: null
        });

        if (reason) {
            notifySuccess("Success!");

            props.reloadStudents();
        }
    }

    const getList = () => {

        if (props.students.length > 0) {

            return (
                <List style={{ width: "100%" }}>
                    {map(props.students, ((student, index) => {
                        const labelId = `checkbox-list-label-${student.id}`;

                        return (
                            <ListItem onClick={() => showStudentDetails(student)} key={student.id} role={undefined} dense button>
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
            )
        }
        else {
            return (
                <Typography>No Students</Typography>
            )
        }

    }

    return (

        <div >
            <Grid>
                <Grid container direction="row"
                    alignContent="flex-start" justify="flex-start">

                    <Button onClick={() => showStudentDetails(null)} color="primary" variant="outlined">
                        <Add /> Student
                    </Button>
                </Grid>

                <Card>

                    <CardContent>
                        {getList()}
                    </CardContent>

                </Card>

            </Grid>

            <StudentDialog student={studentDialogProps.student} open={studentDialogProps.open} onClose={hideStudentDetails} />

            <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
                <Paper className={classes.card} color="success">
                    <Grid container justify="center" alignContent="center" direction="row">


                        <CheckCircle style={{ marginRight: 8 }} /> {notifyMessage}

                    </Grid>
                </Paper >
            </Snackbar>
        </div >
    )
}