import express from "express";
import {
  getNotes,
  postNote,
  deleteNote,
  patchNote,
} from "../services/note-service";
import { validationHandler } from "../middlewares/validation";
import { noteSchema } from "../models/note";

const noteRouter = express.Router();

noteRouter.get("/:username/notes", async (req, res) => {
  try {
    const username = req.params.username;
    const notes = await getNotes(username);
    res.status(200).json({ ok: true, notes: notes });
  } catch (error) {
    res.status(500).send("Error al obtener los usuarios");
  }
});

noteRouter.post(
  "/:username/notes",
  validationHandler(noteSchema),
  async (req, res, next) => {
    try {
      const username = req.params["username"];
      const body = req.body;
      const newNote = await postNote(username, body);
      res.status(200).json({ ok: true, note: newNote });
    } catch (error) {
      next(error);
    }
  }
);

noteRouter.patch("/:username/notes/:id", async (req, res, next) => {
  try {
    const username = req.params.username;
    const body = req.body;
    const noteId = req.params.id;
    const editNote = await patchNote(username, body, noteId);
    res.status(200).json({ ok: true, note: editNote });
  } catch (error) {
    next(error);
  }
});

noteRouter.delete("/:username/notes/:id", async (req, res, next) => {
  try {
    const username = req.params.username;
    const noteId = req.params.id;
    await deleteNote(username, noteId);
    res
      .status(200)
      .json({ ok: true, data: ["Se eliminó la nota del usuario"] });
  } catch (error) {
    next(error);
  }
});
export default noteRouter;
