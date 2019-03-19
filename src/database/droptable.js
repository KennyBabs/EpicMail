import pool from './index';

//===============Drop Tables===================
console.log('Dropping tables...');

(async () => {
  try {
    await pool.query('DROP TABLE IF EXISTS users CASCADE');
    await pool.query('DROP TABLE IF EXISTS messages');
    await pool.query('DROP TABLE IF EXISTS  groups CASCADE');
    await pool.query('DROP TABLE IF EXISTS user_groupings');
  } catch (error) {
    console.log(error);
  }
})();
