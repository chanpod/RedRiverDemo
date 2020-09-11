
import { useFirestore, useFirestoreDocData } from 'reactfire';
import { map } from 'lodash';
import { v4 as uuidv4 } from 'uuid';

const STUDENTS_COLLECTION = "students";

export default class StudentsService {

    constructor(firestore) {
        this.firestore = firestore;
    }

    getStudents = async () => {
        try {
            const collection = await this.firestore.collection(STUDENTS_COLLECTION);
            const students = await collection.get();

            return map(students.docs, (studentDoc) => {
                return studentDoc.data();
            });

        }
        catch (error) {
            console.error(error);
            throw error;
        }
    }

    setStudents = (students) => {
        try {

            return students;
        }
        catch (error) {
            return error;
        }
    }

    addStudent = async (student) => {
        try {

            let docId = uuidv4();
            let newStudent = {
                ...student,
                id: docId
            }

            let newStudentDoc = await this.firestore.collection(STUDENTS_COLLECTION).doc(docId).set(newStudent)

            return newStudent;
        }
        catch (error) {
            return error;
        }

    }

    deleteStudent = async (studentId) => {
        try {

            await this.firestore.collection(STUDENTS_COLLECTION).doc(studentId).delete();
            return true;
        }
        catch (error) {
            return error;
        }

    }
}



