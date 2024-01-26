import { Client, Pool } from "pg";
import { configDotenv } from "dotenv";

if (process.env["NODE_ENV"] === "test") {
  configDotenv({ path: ".env.test" });
} else {
  configDotenv();
}

export const pool = new Pool({
  host: process.env["PGHOST"],
  port: Number(process.env["PGPORT"]),
  database: process.env["PGDATABASE"],
  user: process.env["PGUSER"],
  password: process.env["PGPASSWORD"],
});

export const query = async (
  text: string,
  params?: (string | number | boolean)[]
) => {
  const results = await pool.query(text, params);
  return results;
};

export const dbShutdown = () => {
  pool.end(() => {
    console.log(
      "\nAplicación y conexiones cerradas.\
    "
    );
    process.exit(0);
  });
};

export const adminClient = new Client({
  host: process.env["PGHOST"],
  port: Number(process.env["PGPORT"]),
  database: process.env["PGADMINDATABASE"],
  user: process.env["PGUSER"],
  password: process.env["PGPASSWORD"],
});
