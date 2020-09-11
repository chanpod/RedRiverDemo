
import { useFirestore } from 'reactfire';

const getStudents = async () => {
    try {

        // return await useFirestore.collection("students");
        return [{
            firstName: "Chauncey",
            lastName: "Philpot",
            id: "123"
        }];
    }
    catch (error) {
        throw error;
    }
}

const setStudents = (students) => {
    try {

        return students;
    }
    catch (error) {
        return error;
    }
}

const addStudent = (student) => {
    try {
        console.log("we added a student");
        return student;
    }
    catch (error) {
        return error;
    }

}

const deleteStudent = (studentId) => {
    try {

        return true;
    }
    catch (error) {
        return error;
    }

}

const StudentsService = Object.freeze({
    getStudents,
    setStudents,
    addStudent,
    deleteStudent
})

export default StudentsService;