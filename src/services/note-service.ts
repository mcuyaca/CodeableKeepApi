import * as userDB from "../data/user-data";
import { ApiError } from "../middlewares/errorHandler";
import { DraftNote, Note, newNoteSchema } from "../models/note";
import { getOrCreateUserId } from "./user-service";
import { uuid } from "uuidv4";

export async function getNotes(username: string) {
  return await userDB.getNotes(username);
}

export async function postNote(username: string, body: DraftNote) {
  const userId = await getOrCreateUserId(username);
  const newNote = { ...body, id: uuid(), user_id: Number(userId) };
  console.log({ newNote });
  const nextNote = newNoteSchema.parse(newNote);
  return await userDB.postNote(nextNote);
}

export async function patchNote(username: string, body: Note, noteId: string) {
  const userId = await getOrCreateUserId(username);
  if (!userId) {
    throw new ApiError(
      "No se puede modificar notas de un usuario que no existe.",
      400
    );
  }

  const dataNote = await userDB.getNoteById(noteId, userId);

  if (dataNote.rowCount === 0) {
    throw new ApiError("No se puede modificar una nota que no existe.", 400);
  }

  const [noteToEdit] = dataNote.rows;
  const nextNote = {
    title: body.title ?? noteToEdit.title,
    body: body.body ?? noteToEdit.body,
    color: body.color ?? noteToEdit.color,
    pinned: body.pinned ?? noteToEdit.pinned,
    deleted: body.deleted ?? noteToEdit.deleted,
    user_id: userId,
  };
  return await userDB.patchNote(username, nextNote, noteId);
}

export async function deleteNote(username: string, noteId: string) {
  const userId = await getOrCreateUserId(username);
  if (!userId) {
    throw new ApiError(
      "No se puede eliminar la nota de un usuario que no existe",
      400
    );
  }
  return await userDB.deleteNote(userId, noteId);
}
