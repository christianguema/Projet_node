import sqlite3 from 'sqlite3'
import { open } from 'sqlite'
import { dirname, join } from 'node:path';
import path from 'node:path';
import fs from "node:fs/promises"



const url = new URL(import.meta.url);
const url_path = url.pathname;
const parent_dir = dirname(url_path);

const base_dir = join(parent_dir,'..')
const db_path_file = join(base_dir,'db.sqlite'); 

export default class Database{
    static connection;

    
    static instance;
    static db_path = db_path_file;
    constructor(){}

    static async getDataBaseInstance(){
        if(Database.instance === undefined){
            Database.instance = new Database();
            await Database.instance.openDb(Database.db_path);
        } 
        return Database.instance;
    }
    
    /**
     * creer une methode qui s'appelle 
     * initDB() ==> créer les table, 
     *              Inserer des n-uplet dml.
     * sachant que nous inserons les donnée depuis les fichiers dml.sql et dll.sql
     * @param {*} db_path 
     */

    async initDB(){
        const BASEDIR = path.dirname(new URL(import.meta.url).pathname);
        //console.log("creation de la table");
        const ddl_sql = await fs.readFile(path.join(BASEDIR,'ddl.sql'), 'utf-8');
        //console.log(ddl_sql);
        await this.connection.exec(ddl_sql);
        

        console.log('insertion des donne')
        //const dml_sql = await fs.readFile(path.join(BASEDIR,'dml.sql'), 'utf-8');
        //console.log(dml_sql);
        //await this.connection.exec(dml_sql);
    }

    async openDb (db_path) {
        this.connection = await open({
            filename: db_path,
            driver: sqlite3.Database
        })
        this.initDB();
    }
}