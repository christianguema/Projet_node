import sqlite3 from 'sqlite3'
import { open } from 'sqlite'
import { dirname, join } from 'node:path';

// you would have to import / invoke this in another file

//calcul du chemin
const url = new URL(import.meta.url);
const url_path = url.pathname;
const parent_dir = dirname(url_path);

const base_dir = join(parent_dir,'..')

const db_path = join(base_dir,'db.sqlite'); 

export async function openDb () {
  return open({
    filename: db_path,
    driver: sqlite3.Database
  })
}

const db = await openDb();

const req_create = `
    CREATE TABLE IF NOT EXISTS students (
        id INTEGER PRIMARY KEY autoincrement, 
        firstname TEXT, 
        lastname TEXT, 
        sexe TEXT, 
        birth_day DATE, 
        check(sexe in('M','F'))
    );`

await db.exec(req_create);


const req_insert = `
    INSERT INTO students(firstname, lastname, sexe, birth_day)
    VALUES ('Abdoul','Jean','M','2005/05/14'),
           ('Guema','chistian','M','2008/06/18'),
           ('Koilo','Ablok','F','2005/04/12');
`

await db.exec(req_insert);

