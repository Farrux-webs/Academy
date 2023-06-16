const config = require("../config/config");

const { Pool } = require("pg");

const pool = new Pool({ connectionString: config.POSTGRES_CONNECTION_STRING });

const fetchOne = async (SQL, ...params) => {
  const client = await pool.connect();

  try {
    const {
      rows: [row],
    } = await client.query(SQL, params.length ? params : null);

    return row;
  } catch (error) {
    console.log(error.message);
  } finally {
    client.release();
  }
};

const fetch = async (SQL, ...params) => {
  const client = await pool.connect();

  try {
    const { rows } = await client.query(SQL, params.length ? params : null);

    return rows;
  } catch (error) {
    console.log(error.message);
  } finally {
    client.release();
  }
};

module.exports = {
  fetchOne,
  fetch,
};
