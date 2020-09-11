import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Paper, Snackbar, TextField } from '@material-ui/core';
import { CheckCircle, Save, Error } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useFirestore } from 'reactfire';
import StudentsService from '../../../services/StudentsService';

const useStyles = makeStyles(theme => ({
    card: {
        backgroundColor: theme.palette.error.main,
        color: "white",
        padding: 20
    },
}));


export default ({ onClose, open, student }) => {

    const studentsService = new StudentsService(useFirestore());
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [loading, setLoading] = useState(false);
    const [errorSnackOpen, setErrorSnackOpen] = useState(false);

    const classes = useStyles();

    let { vertical, horizontal } = {
        vertical: "top",
        horizontal: "center"
    }

    useEffect(() => {
        setFirstName(student?.firstName ?? "");
        setLastName(student?.lastName ?? "");
    }, [student])

    const handleClose = (reason = false) => {
        setFirstName("");
        setLastName("");
        onClose(reason);
    }

    const updateStudent = async () => {
        setLoading(true)
        await studentsService.updateStudent({
            ...student,
            ...getStudentObject()
        });

        setLoading(false)
        handleClose(true);
    }

    const getStudentObject = () => {
        return {
            firstName: firstName,
            lastName: lastName
        }
    }

    const addStudent = async () => {

        try {
            setLoading(true)

            await studentsService.addStudent(getStudentObject());

            setLoading(false)
            handleClose(true);
        }
        catch (error) {
            alert("Failed");
            console.error(error);
        }
    }

    const save = () => {
        if (isFormValid()) {

            if (student?.id) {
                updateStudent();
            }
            else {
                addStudent();
            }
        }
        else {
            setErrorSnackOpen(true)
        }
    }

    const isFormValid = () => {
        if (firstName.length > 0 && lastName.length > 0) {
            return true;
        }
        else {
            return false;
        }
    }

    return (
        <div>
            <Dialog onClose={() => handleClose(false)} aria-labelledby="simple-dialog-title" open={open}>
                <DialogTitle id="simple-dialog-title">
                    {student?.id ? "Update Student" : "Create Student"}
                </DialogTitle>

                <DialogContent>
                    <form>
                        <Grid container spacing={2}>

                            <Grid item>
                                <TextField helperText="Required" error={firstName.length == 0} id="standard-basic" label="First Name" value={firstName} onChange={(event) => setFirstName(event.target.value)} />
                            </Grid>

                            <Grid item>
                                <TextField helperText="Required" id="standard-basic" error={lastName.length == 0} label="Last Name" value={lastName} onChange={(event) => setLastName(event.target.value)} />
                            </Grid>
                        </Grid>
                    </form>
                </DialogContent>

                <DialogActions>

                    {/* <Button onClick = {() => setLoading(!loading)}> Toggle Loading </Button> */}

                    <Button disabled={loading} onClick={() => save()} variant="contained" color="primary" style={{ minWidth: 100 }}>
                        {loading ? <CircularProgress size={24} color="accent" /> : <Save />} {loading ? null : "Save"}
                    </Button>

                </DialogActions>
            </Dialog>

            <Snackbar anchorOrigin={{ vertical, horizontal }}
                open={errorSnackOpen} autoHideDuration={4000} onClose={() => setErrorSnackOpen(false)}>
                <Paper className={classes.card} color="success">
                    <Grid container justify="center" alignContent="center" direction="row">


                        <Error style={{ marginRight: 8 }} /> Please fill out all required fields

                    </Grid>
                </Paper >
            </Snackbar>
        </div>
    )
}