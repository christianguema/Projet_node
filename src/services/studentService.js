//import Database from "../config/datatbase.js";
import uuid from "../generateur.js";
import StudentRepostory from "../repositories/studentsRepostory.js";

export default class StudentService {
  // students = [
  //   {
  //     id: 1,
  //     firstname: "JOKOI",
  //     lastname: "Tolkoi",
  //     sexe: "M",
  //     birth_day: "02/05/2005",
  //   },
  //   {
  //     id: 2,
  //     firstname: "Jokloi",
  //     lastname: "Toak",
  //     sexe: "F",
  //     birth_day: "05/05/2006",
  //   },
  // ];

  // uuidGen;

  // constructor() {
  //   this.uuidGen = uuid(1000);
  // }

  studRepos;
  constructor() {
    this.studRepos = new StudentRepostory();
  }

  async getAll() {
    return this.studRepos.findAll();
  }

  // async getAll() {
  //   const db = await Database.getDataBaseInstance();
  //   return await db.connection.all("SELECT * FROM students");
  // }

  async get(id) {
    return this.studRepos.findById(id);
  }

  //   create(student) {
  //     const newStudent = {
  //       id: this.uuidGen.next().value,
  //       firstname: student.firstname !== undefined ? student.firstname : "",
  //       lastname: student.lastname !== undefined ? student.lastname : "",
  //       sexe: student.sexe !== undefined ? student.sexe : "",
  //       birth_day: student.birth_day !== undefined ? student.birth_day : "",
  //     };
  //     this.students.push(newStudent);
  //     return newStudent;
  //   }

  // async create(student_data) {
  //   // student_data.id = this.uuidGen.next().value;
  //   // this.students.push(student_data);
  //   // return student_data;
  //   const { firstname, lastname, sexe, birth_day } = student_data;
  //   const db = await Database.getDataBaseInstance();
  //   const req = `INSERT INTO students (firstname, lastname, sexe, birth_day)
  //               VALUES (':firstname',':lastname',':sexe',':birth_day');
  //   `;

  //   const { last_id } = await db.connection.run(req, {
  //     ":firstname": firstname,
  //     ":lastname": lastname,
  //     ":sexe": sexe,
  //     ":birth_day": birth_day,
  //   });

  //   return this.get(last_id);
  // }

  //   update(id, student) {
  //     let updatedStudent;
  //     this.students.forEach((e, index) => {
  //       if (e.id == id) {
  //         updatedStudent = {
  //           id: id,
  //           firstname:
  //             student.firstname !== undefined ? student.firstname : e.firstname,
  //           lastname:
  //             student.lastname !== undefined ? student.lastname : e.lastname,
  //           sexe: student.sexe !== undefined ? student.sexe : e.sexe,
  //           birth_day:
  //             student.birth_day !== undefined ? student.birth_day : e.birth_day,
  //         };
  //         this.students[index] = updatedStudent;
  //       }
  //     });
  //     return updatedStudent;
  //   }

  async create(student){
    return this.studRepos.save(student);
  }

  async update(id, student_data) {
    return this.studRepos.update(id, student_data);
  }

  //   delete(id) {
  //     let student;
  //     this.students.forEach((e) => {
  //       if (e.id == id) {
  //         student = e;
  //       }
  //     });

  //     if (student != undefined) {
  //       this.students = this.students.filter((e) => e.id != id);
  //       return true;
  //     }
  //     return false;
  //   }

  async delete(id) {
    return this.studRepos.delete(id);
  }
}
