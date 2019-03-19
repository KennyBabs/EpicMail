import pool from './index';

//=================Create Tables==================
console.log('Creating tables...');

(async () => {
  try {
    await pool.query(`CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY,
        firstname VARCHAR(50) NOT NULL,
        lastname VARCHAR(50) NOT NULL,
        username VARCHAR(50) UNIQUE NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(100) NOT NULL,
        isadmin BOOLEAN DEFAULT FALSE,
        createdon TIMESTAMPTZ DEFAULT NOW())`);

    await pool.query(`CREATE TABLE IF NOT EXITS messages(
        id SERIAL PRIMARY KEY,
        createdon TIMESTAMPTZ DEFAULT NOW(),
        email VARCHAR(128) NOT NULL,
        subject VARCHAR(128) NOT NULL,
        message VARCHAR(250) NOT NULL,
        status VARCHAR(10) NOT NULL,
        sender INTEGER REFERENCES users(id) NOT NULL,
        reciever INTEGER REFERENCES users(id) NOT NULL,
        is_deleted VARCHAR(10) NOT NULL,
        group_status VARCHAR(10) NOT NULL
    )`);

    await pool.query(`CREATE TABLE IF NOT EXITS groups(
        id SERIAL PRIMARY KEY,
        group_name VARCHAR(128) NOT NULL,
        group_email VARCHAR(128) NOT NULL,
        createdby INTEGER NOT NULL REFERENCES users(id) NOT NULL
    )`);

    await pool.query(`CREATE TABLE IF NOT EXITS user_groupings(
        group_id INTEGER REFERENCES groups(id) NOT NULL,
        user_ids INTEGER NOT NULL REFERENCES users(id)
    )`);

  } catch (error) {
    console.log(error);
  }
})();