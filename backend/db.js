// import pkg from 'pg';
// const { Pool } = pkg;

// const pool = new Pool({
//   user: process.env.DB_USER,
//   host: process.env.DB_HOST,
//   database: process.env.DB_NAME,
//   password: process.env.DB_PASSWORD,
//   port: process.env.DB_PORT,
// });

// pool.connect()
//   .then(() => console.log("Local PostgreSQL connected"))
//   .catch((err) => console.error("PostgreSQL connection error:", err));

// export default pool;


import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DB_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

pool.connect()
  .then(() => console.log("✅ Supabase PostgreSQL connected"))
  .catch((err) => console.error("❌ PostgreSQL connection error:", err));

export default pool;

