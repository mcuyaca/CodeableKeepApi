import { configDotenv } from "dotenv";
import { adminClient } from "..";

if (process.env["NODE_ENV"] === "test") {
  configDotenv({ path: ".env.test" });
} else {
  configDotenv();
}

const dbName = process.env["PGDATABASE"];

adminClient.connect();

adminClient.query(`CREATE DATABASE "${dbName}"`, (err) => {
  if (err) {
    console.error("Error al crear la base de datos", err.stack);
  } else {
    console.log(`Base de datos "${dbName}" creada exitosamente`);
  }
  adminClient.end();
});
