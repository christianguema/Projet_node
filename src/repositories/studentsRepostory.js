import Database from "../config/datatbase.js";
import Repostory from "./repostory.js";
export default class StudentRepostory extends Repostory{

    constructor(){
        super();
    }
    
    async save(student) {
        if (student.id) {
            const db = await Database.getDataBaseInstance();
            return await db.connection.run(
            "UPDATE students SET firstname = :firstname, lastname = :lastname, sexe = :sexe, birth_day = :birth_day WHERE id = :id",
            {
                ':id': student.id,
                ':firstname': student.firstname,
                ':lastname': student.lastname,
                ':sexe': student.sexe,
                ':birth_day': student.birth_day,
            }
            );
        }else {
            const db = await Database.getDataBaseInstance();
            return await db.connection.run(
            "INSERT INTO students (firstname, lastname, sexe, birth_day) VALUES (:firstname, :lastname, :sexe, :birth_day)",
            {
                ':firstname': student.firstname,
                ':lastname': student.lastname,
                ':sexe': student.sexe,
                ':birth_day': student.birth_day,
            }
            );
        }
    }

    async findById(id) {
        const db = await Database.getDataBaseInstance();
        const student = await db.connection.get(
            "SELECT * FROM students WHERE id = :id",
            { ':id': id }
        );
        if (!student) {
            throw new Error(`Étudiant avec l'ID ${id} non trouvé.`);
        }
        return student;
    }

    async findAll() {
        const db = await Database.getDataBaseInstance();
        const students = await db.connection.all("SELECT * FROM students");
        return students;
    }

    async delete(id) {
        const db = await Database.getDataBaseInstance();
        const result = await db.connection.run(
            "DELETE FROM students WHERE id = :id",
            { ':id': id }
        );
        if (result.changes === 0) {
            throw new Error(`Étudiant avec l'ID ${id} non trouvé.`);
        }
        return result;
    }
}