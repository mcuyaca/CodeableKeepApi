import { query } from "../db";
import { Note, editNoteParams } from "../models/note";

export async function getUsers() {
  const result = await query("SELECT * FROM users;");
  return result.rows;
}

export async function getUserByUsername(username: string) {
  const result = await query("SELECT * FROM users WHERE username = $1", [
    username,
  ]);
  return result;
}

export async function getNoteById(noteId: string, userId: string) {
  const result = await query(
    `SELECT * FROM notes WHERE id = $1 and user_id = $2  ;`,
    [noteId, userId]
  );

  return result;
}

export async function newUser(username: string) {
  const result = await query("INSERT INTO users(username) VALUES ( $1 )", [
    username,
  ]);
  return result;
}

export async function getNotes(username: string) {
  const result = await query(
    "SELECT n.id, n.title, n.body, n.color, n.pinned,n.deleted,n.user_id FROM notes AS n JOIN users AS u ON n.user_id = u.id WHERE u.username = $1 ;",
    [username]
  );
  return result.rows;
}

export async function postNote(note: Note) {
  const { id, title, body, color, pinned, deleted, user_id } = note;
  const result = await query(
    "INSERT INTO notes (id,title,body,color,pinned,deleted,user_id) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *;",
    [id, title, body, color, pinned, deleted, user_id]
  );
  return result.rows[0];
}

export async function patchNote(
  username: string,
  note: editNoteParams,
  noteId: string
) {
  const { title, body, color, pinned, deleted, user_id } = note;
  const result = await query(
    "UPDATE notes SET title = $1, body = $2, color = $3, pinned = $4, deleted = $5, user_id = $6  WHERE id = $7 RETURNING * ;",
    [title, body, color, pinned, deleted, user_id, noteId]
  );
  return result.rows[0];
}

export async function deleteNote(userId: string, noteId: string) {
  const result = await query(
    "DELETE FROM notes WHERE user_id = $1 AND id = $2",
    [userId, noteId]
  );
  console.log(result);
  return result;
}
