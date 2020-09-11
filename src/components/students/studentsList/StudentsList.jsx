import { Avatar, Button, Card, CardContent, Grid, IconButton, InputAdornment, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, Paper, TextField, Typography } from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';
import { makeStyles } from '@material-ui/core/styles';
import { Add, CheckCircle, Clear, Delete, Search } from '@material-ui/icons';
import { filter, map } from 'lodash';
import React, { useState } from 'react';
import { useFirestore } from 'reactfire';
import StudentsService from '../../../services/StudentsService';
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
    const [searchValue, setFilterValue] = useState("");
    const [studentDialogProps, setStudentDialogConfig] = useState({ open: false, student: {} });
    const [notifyMessage, setNotifyMessage] = useState("Success!");
    const classes = useStyles();

    let { vertical, horizontal } = {
        vertical: "top",
        horizontal: "center"
    }

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

    const filteredStudents = (students) => {

        let filteredStudents = [];

        if (searchValue && searchValue.length > 0) {

            filteredStudents = filter(students, (student) => {
                let firstNameMatches = student.firstName.toLowerCase().match(searchValue.toLowerCase());
                let lastNameMatches = student.lastName.toLowerCase().match(searchValue.toLowerCase());
                return firstNameMatches?.length > 0 || lastNameMatches?.length > 0;
            })
        }
        else {
            filteredStudents = students;
        }

        return filteredStudents ?? [];
    }

    const getList = () => {

        if (filteredStudents(props.students).length > 0) {

            return (
                <List style={{ width: "100%" }}>
                    {map(filteredStudents(props.students), ((student, index) => {
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
                <Typography>{props.students.length === 0 ? "No Students. Please Create One" : "No Students Found"}</Typography>
            )
        }

    }

    return (

        <div >
            <Grid>
                <Grid container direction="row"
                    alignContent="flex-start" justify="flex-start">

                    <Grid container>

                        <Grid xs={6} item>
                            <Grid container justify="flex-start" alignContent="flex-end">
                                <div>
                                    <Button onClick={() => showStudentDetails(null)} color="primary" variant="outlined">
                                        <Add /> Student
                                </Button>
                                </div>
                            </Grid>
                        </Grid>

                        <Grid xs={6} item >
                            <Grid container justify="flex-end" alignContent="flex-end">
                                <TextField InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Search />
                                        </InputAdornment>
                                    ),
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={() => setFilterValue("")}>
                                                <Clear />
                                            </IconButton>
                                        </InputAdornment>
                                    )

                                }}
                                    id="search-input"
                                    label="Search"
                                    placeholder="search"
                                    value={searchValue}
                                    onChange={(event) => setFilterValue(event.target.value)}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>

                <Card>

                    <CardContent>
                        {getList()}
                    </CardContent>

                </Card>

            </Grid>

            <StudentDialog student={studentDialogProps.student} open={studentDialogProps.open} onClose={hideStudentDetails} />

            <Snackbar anchorOrigin={{ vertical, horizontal }} open={open} autoHideDuration={4000} onClose={handleClose}>
                <Paper className={classes.card} color="success">
                    <Grid container justify="center" alignContent="center" direction="row">


                        <CheckCircle style={{ marginRight: 8 }} /> {notifyMessage}

                    </Grid>
                </Paper >
            </Snackbar>
        </div >
    )
}