import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

let connectionString;

if (process.env.NODE_ENV === 'test') {
  connectionString = process.env.DATABASE_URL_TEST;
} else {
  connectionString = process.env.DATABASE_URL;
}

const pool = new Pool({
   connectionString
});

const dbmodel = {
  /**
   * DB Query
   * @param {object} req
   * @param {object} res
   * @returns {object} object 
   */
  query(text, params){
    return new Promise((resolve, reject) => {
      pool.query(text, params)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      })
    })
  }
}

export default dbmodel;