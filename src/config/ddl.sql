CREATE TABLE IF NOT EXISTS students (
        id INTEGER PRIMARY KEY autoincrement, 
        firstname TEXT, 
        lastname TEXT, 
        sexe TEXT, 
        birth_day DATE, 
        check(sexe in('M','F'))
);