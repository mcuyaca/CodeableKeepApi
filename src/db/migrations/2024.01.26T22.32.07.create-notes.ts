import { Migration } from "../scripts/dbMigrate";

export const up: Migration = async (params) => {
  params.context.query(
    `CREATE TABLE notes (
      id UUID PRIMARY KEY,
      title VARCHAR(50),
      body VARCHAR(50),
      color VARCHAR(7),
      pinned BOOLEAN,
      deleted BOOLEAN,
      user_id INTEGER,
      FOREIGN KEY (user_id) REFERENCES users(id));
  `
  );
};
export const down: Migration = async (params) => {
  params.context.query(`DROP TABLE notes;`);
};
