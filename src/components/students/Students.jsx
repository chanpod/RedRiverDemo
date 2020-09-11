import { Grid, LinearProgress } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useFirestore } from 'reactfire';
import StudentsService from '../../services/StudentsService';
import StudentsList from './studentsList/StudentsList';



export default (props) => {

    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [count, setCount] = useState(0);
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