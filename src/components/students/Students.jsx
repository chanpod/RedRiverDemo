import React, { useEffect, useState, Suspense } from 'react';
import { useFirestore, useFirestoreDocData } from 'reactfire';
import StudentsList from './studentsList/StudentsList';
import StudentsService from '../../services/StudentsService';
import { LinearProgress, Button, Grid } from '@material-ui/core';


export default (props) => {

    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(false);
    const studentsService = new StudentsService(useFirestore());

    useEffect(() => {
        loadStudents();
    }, [])

    const loadStudents = async () => {

        setLoading(true);

        setStudents(await studentsService.getStudents());

        setLoading(false);
    }

    return (



        <div style={{ maxWidth: 900, width: "100%" }}>
            {loading ? <LinearProgress /> : null}
            <Grid container justify="flex-start">

                <div style={{ marginTop: 30, width: "100%" }}>

                    <StudentsList loading={loading} setLoading={setLoading} reloadStudents={loadStudents} students={students} />
                </div>

            </Grid>
        </div>


    )
}