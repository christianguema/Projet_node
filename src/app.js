import http from "node:http";
import studentController from "./controllers/studentsController.js";
import { strict } from "node:assert";
import dotenv from "dotenv";
import Database from "./config/datatbase.js";
dotenv.config();
// import HTTP_STATUS_CODE from "";

/**
 * Exo:
 *      Faire les uri pour afficher les messages.
 * GET /students -> Students list
 * GET /student/:id -> Student details
 * POST /students -> Students create
 * PUT | PATCH /students:id -> Students updated
 * DELETE /students:id -> Students deleted
 */
const studentControllers = new studentController();
//const db_path = "/home/christian/Documents/Cours_L3/Semestre5/Cours_NodeJS/gestion-note/db.sqlite"
const db = await Database.getDataBaseInstance();
console.log(db);

//const db.openDb(db_path);

const server = http.createServer((req, res) => {
  const methode = req.method;
  const url = new URL(req.url, `http://${req.headers.host}`);
  const endpoint = methode + ":" + url.pathname;

  //console.log(req.headers);

  console.log(`${methode} --> ${endpoint}`);
  res.setHeader("content-Type", "application/json");

  switch (endpoint) {
    case "GET:/students":
      studentControllers.read(req, res);
      //console.log("Liste des eleves");
      break;

    case "GET:/student":
      studentControllers.get(req, res);
      break;

    case "POST:/students":
      studentControllers.create(req, res);
      //console.log("creation d'un eleve");
      //res.end();
      break;

    case "PUT:/student":
      studentControllers.update(req, res);
      break;

    case "DELETE:/student":
      studentControllers.delete(req, res);
      console.log("Supression d'un eleve");
      //res.end();
      break;

    default:
      //console.log('404 --page not found')
      res.writeHead(404);
      res.end(
        JSON.stringify({
          message: "Page not found!",
        })
      );
      break;
  }
});

server.listen(process.config.PORT || 3000, () => {
  console.log("Demarrage du serveur...");
});
