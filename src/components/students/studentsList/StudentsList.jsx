import React, { useState } from 'react';
import { Button, ListItemAvatar, Card, Avatar, Grid, List, ListItem, IconButton, ListItemIcon, ListItemText, ListItemSecondaryAction } from '@material-ui/core';
import StudentsService from '../../../services/StudentsService';
import { map } from 'lodash';
import { Add, Delete, ThreeDRotation } from '@material-ui/icons';

export default (props) => {

    const addStudent = (student = null) => {
        StudentsService.addStudent(student);
    }

    const deleteStudent = (studentId) => {
        console.log(studentId);
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
                                        <IconButton onClick = {() => deleteStudent(student.id)}>
                                            <Delete color="error" />
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            );
                        }))}

                    </List>

                </Card>

            </Grid>
        </div>
    )
}