import pool from './index';

//Seeding database

(async () => {
  let result;
  const params = ['Hayomide', 'Babson', 'Hayobabs', 'hayobabson@epicmail.com', 'hayobabson', true];
  try {
    result = await pool.query(`INSERT INTO users (firstname, lastname, username, email, password, isadmin)
      VALUES ($1, $2, $3, $4, $5, $6)`, params);
    return result;
  } catch (error) {
    return error;
  }
})();

(async () => {
  let result;
  const params = ['Micheal', 'Robinson', 'Miller', 'johnmiller@epicmail.com', 'meyers', false];
  try {
    result = await pool.query(`INSERT INTO users (firstname, lastname, username, email, password, isadmin)
      VALUES ($1, $2, $3, $4, $5, $6)`, params);
    return result;
  } catch (error) {
    return error;
  }
})();