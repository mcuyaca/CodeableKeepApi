import { Migration } from "../scripts/dbMigrate";

export const up: Migration = async (params) => {
  params.context.query(
    `CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50));
    `
  );
};
export const down: Migration = async (params) => {
  params.context.query(`DROP TABLE users;`);
};
