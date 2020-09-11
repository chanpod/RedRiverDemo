import React, { useEffect, useState } from 'react';
import { Dialog, Grid, CircularProgress , DialogTitle, Button, TextField, DialogContent, DialogActions } from '@material-ui/core';
import { Save } from '@material-ui/icons';
import { useFirestore, useFirestoreDocData } from 'reactfire';
import StudentsService from '../../../services/StudentsService';

const SaveText = ({ loading }) => {

    return (
        <Grid container>

        </Grid>
    )
}

export default ({ onClose, open, student }) => {

    const studentsService = new StudentsService(useFirestore());
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setFirstName(student?.firstName ?? "");
        setLastName(student?.lastName ?? "");
    }, [student])

    const handleClose = (reason = false) => {
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
        if (student?.id) {
            updateStudent();
        }
        else {
            addStudent();
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
                        <TextField id="standard-basic" label="First Name" value={firstName} onChange={(event) => setFirstName(event.target.value)} />
                        <TextField id="standard-basic" label="Last Name" value={lastName} onChange={(event) => setLastName(event.target.value)} />
                    </form>
                </DialogContent>

                <DialogActions>

                    {/* <Button onClick = {() => setLoading(!loading)}> Toggle Loading </Button> */}

                    <Button disabled = {loading} onClick={() => save()} variant="contained" color="primary" style = {{minWidth:100}}>
                        {loading ? <CircularProgress size = {24} color = "accent"  /> : <Save />} {loading ? null : "Save" } 
                    </Button>

                </DialogActions>
            </Dialog>
        </div>
    )
}