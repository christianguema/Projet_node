import { text, json } from "node:stream/consumers";
import uuid from "../generateur.js";
import StudentService from "../services/studentService.js";
import { unsubscribe } from "node:diagnostics_channel";
// import HTTP_STATUS_CODE from "./constant/httpStatus.js";

export default class studentController {
  // students = [
  //     {
  //         "id":1,
  //         "firstname":"JOKOI",
  //         "lastname":"Tolkoi",
  //         "sexe":"M",
  //         "birth_day":"02/05/2005"
  //     },
  //     {
  //         "id":2,
  //         "firstname":"Jokloi",
  //         "lastname":"Toak",
  //         "sexe":"F",
  //         "birth_day":"05/05/2006"
  //     },
  // ];

  // uuidGen;

  studentService;

  constructor() {
    this.studentService = new StudentService();
  }

  async read(req, res) {
    res.writeHead(200);
    res.end(JSON.stringify(await this.studentService.getAll()));
  }

  async get(req, res) {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const id = url.searchParams.get("id");

    const student = await this.studentService.get(id);
    if (student == undefined) {
      res.writeHead(404);
      res.end(
        JSON.stringify({
          message: "Page not found!",
        })
      );
    } else {
      res.writeHead(200);
      res.end(JSON.stringify(student));
    }
  }

  async create(req, res) {
    res.writeHead(200);
    const { firstname, lastname, sexe, birth_day } = await json(req);
    const student = {
      id: null,
      firstname: firstname !== undefined ? firstname : "",
      lastname: lastname !== undefined ? lastname : "",
      sexe: sexe !== undefined ? sexe : "",
      birth_day: birth_day !== undefined ? birth_day : "",
    };

    if (student.lastname < 3) {
      return;
    }

    const new_student = this.studentService.create(student);
    res.end(JSON.stringify(new_student));
  }

  async update(req, res) {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const id = Number.parseInt(url.searchParams.get("id"));
    const { firstname, lastname, sexe, birth_day } = await json(req);
    const student = {
      firstname: firstname !== undefined ? firstname : "",
      lastname: lastname !== undefined ? lastname : "",
      sexe: sexe !== undefined ? sexe : "",
      birth_day: birth_day !== undefined ? birth_day : "",
    };
    const studtend_up = this.studentService.update(id, student);

    if (studtend_up === undefined) {
      res.writeHead(404);
      res.end(
        JSON.stringify({
          message: "Page not found!",
        })
      );
    } else {
      res.writeHead(200);
      res.end(JSON.stringify(studtend_up));
      return;
    }
  }

  delete(req, res) {
    res.writeHead(200);
    const url = new URL(req.url, `http://${req.headers.host}`);
    const id = url.searchParams.get("id");
    const student_del = this.studentService.delete(id);
    res.writeHead(200);
    res.end("Student successfuly deleted...!");
  }

  // get(req, res){
  //     const url = new URL(req.url, `http://${req.headers.host}`);
  //     const id = url.searchParams.get("id");

  //     //rechercher l'etudiant
  //     let student;
  //     this.students.forEach((e)=>{
  //         if(e.id == id){
  //             student = e;
  //         }
  //     });

  //     if (student==undefined){
  //         res.writeHead(404);
  //         res.end(JSON.stringify({
  //             "message":"Page not found!"
  //         }));
  //     }else{
  //         res.writeHead(200);
  //         res.end(JSON.stringify(student));
  //     }
  //     res.end("");
  // }

  // async create(req, res){
  //     // let body = "";
  //     // req.on("data", (chunk) => {
  //     //     body += chunk.toString();
  //     //     //console.log(chunk.toString());
  //     // });
  //     // req.on('close', ()=>{
  //     //     console.log(body);
  //     //     console.log(JSON.parse(body));
  //     // });
  //     const {firstname, lastname, sexe, birth_day} = await json(req);

  //     const student = {
  //         "id":this.uuidGen.next().value,
  //         "firstname":firstname !== undefined ? firstname : "",
  //         "lastname":lastname !== undefined ? lastname : "",
  //         "sexe":sexe !== undefined ? sexe : "",
  //         "birth_day":birth_day !== undefined ? birth_day : "",
  //     }

  //     this.students.push(student);
  //     //console.log(body);
  //     res.end(JSON.stringify(student));
  // }

  //Mise a jour d'un etudiant
  // async update(req, res){
  //     const url = new URL(req.url, `http://${req.headers.host}`);
  //     const id = url.searchParams.get("id");

  //     //rechercher l'etudiant
  //     let student;
  //     this.students.forEach((e)=>{
  //         if(e.id == id){
  //             student = e;
  //         }
  //     });

  //     if (student==undefined){
  //         res.writeHead(404);
  //         res.end(JSON.stringify({
  //             "message":"Page not found!"
  //         }));
  //     }else{
  //         //mettre a jour l'etudiant
  //         const {firstname, lastname, sexe, birth_day} = await json(req);
  //         student.firstname = firstname !== undefined ? firstname : '';
  //         student.lastname = lastname !== undefined ? lastname : '';
  //         student.sexe = sexe !== undefined ? sexe : '';
  //         student.birth_day = birth_day !== undefined ? birth_day : '';
  //         this.students.push(student);
  //         // console.log(body);
  //         // req.searchParams.
  //         res.end("");
  //     }

  // }

  //supprimer un etudiant

  // update(req, res){
  //     const student = this.get(req, res)
  //     console.log(student);

  // }

  // delete(req, res){
  //     const url = new URL(req.url, `http://${req.headers.host}`);
  //     const id = url.searchParams.get("id");

  //     //rechercher l'etudiant
  //     let student;
  //     this.students.forEach((e)=>{
  //         if(e.id == id){
  //             student = e;
  //         }
  //     });

  //     if (student == undefined){
  //         res.writeHead(404);
  //         res.end(JSON.stringify({
  //             "message":"Page not found!"
  //         }));
  //     }else{
  //         //supprimer l'etudiant
  //         this.students = this.students.filter((e)=> e.id != id);
  //         res.writeHead(200);
  //         res.end(JSON.stringify({
  //             "message":"Student deleted!"
  //         }));
  //     }
  // }
}
// curl -s -X POST http://127.0.0.1:3000/students -H 'content-Type:application/json' -d '{"id":"1","firstname":"JOKOI","lastname":"Tolkoi","sexe":"M","birth_day":"02/05/2005"}'
