const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

//======connect to DB============

const pool = new Pool({
  connectionString: process.env.NODE_ENV == 'test' ? process.env.DATABASE_URL_TEST: process.env.DATABASE_URL
});
pool.on('connect', () => {
  console.log('connected to epic db');
});

//========Create tables==============

const createTables = () => {
  const queryText = `
    DROP TABLE IF EXISTS user_groupings;
    DROP TABLE IF EXISTS  groups CASCADE;
    DROP TABLE IF EXISTS messages;
    DROP TABLE IF EXISTS users CASCADE;
    CREATE TABLE users(
        id SERIAL PRIMARY KEY,
        email varchar(128) NOT NULL,
        first_name varchar(128) NOT NULL,
        last_name varchar(128) NOT NULL,
        user_name varchar(128) NOT NULL,
        password varchar(250) NOT NULL,
        createdon TIMESTAMPTZ DEFAULT NOW() 
    );
    CREATE TABLE groups(
        id SERIAL PRIMARY KEY,
        group_name VARCHAR(128) NOT NULL,
        group_email VARCHAR(128) NOT NULL,
        created_by INTEGER NOT NULL REFERENCES users(id) NOT NULL
    );
    CREATE TABLE messages(
        id SERIAL PRIMARY KEY,
        createdon TIMESTAMPTZ DEFAULT NOW(),
        email VARCHAR(128) NOT NULL,
        subject VARCHAR(128) NOT NULL,
        message VARCHAR(250) NOT NULL,
        status VARCHAR(10) NOT NULL,
        senderId INTEGER REFERENCES users(id) NOT NULL,
        recieverId INTEGER REFERENCES users(id) NULL,
        parentMessageId INTEGER REFERENCES messages(id) NULL,
        group_reciever INTEGER REFERENCES groups(id),
        is_deleted VARCHAR(10) NOT NULL,
        group_status VARCHAR(10) NOT NULL
    );
    CREATE TABLE user_group(
        group_id INTEGER REFERENCES groups(id) NOT NULL,
        user_ids INTEGER NOT NULL REFERENCES users(id)
    );
    `;
  pool.query(queryText)
    .then(() => {
      console.log('table created');
      pool.end();
    })
    .catch((err) => {
      console.log('table not created', err);
      pool.end();
    });
};

return createTables();

//require ('make-runnable');