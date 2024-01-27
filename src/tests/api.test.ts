import { describe, it, expect, beforeEach, afterEach } from "vitest";
import request from "supertest";
import { app } from "../app";
import { truncateTable } from "../db/utils";

describe("User Router", () => {
  beforeEach(async () => {
    await truncateTable("users");
    await truncateTable("notes");
  });

  afterEach(async () => {
    await truncateTable("users");
    await truncateTable("notes");
  });

  it("should sign up a new user", async () => {
    const username = "manuel";
    const response = await request(app).get(`/${username}/notes`);

    expect(response.statusCode).toBe(201);
    expect(response.body.ok).toBeTruthy();
    expect(response.body.data).toHaveProperty("notes");
  });
});

describe("Note Router", () => {
  beforeEach(async () => {
    await truncateTable("users");
    await truncateTable("notes");
  });

  afterEach(async () => {
    await truncateTable("users");
    await truncateTable("notes");
  });

  it("should create a new note", async () => {
    const username = "manuel";
    const response = await request(app)
      .post(`/notes/${username}`)
      .send({ title: "Test Note", body: "This is a test note." });

    expect(response.statusCode).toBe(201);
    expect(response.body.ok).toBeTruthy();
    expect(response.body.data).toHaveProperty("notes");
  });

  it("should update an existing note", async () => {
    const username = "manuel";
    const newNote = await request(app)
      .post(`/notes/${username}`)
      .send({ title: "Test Note", body: "This is a test note." });
    const noteId = newNote.body.data.id;
    const response = await request(app)
      .patch(`/notes/${username}/${noteId}`)
      .send({ title: "Updated Title" });

    expect(response.statusCode).toBe(200);
    expect(response.body.ok).toBeTruthy();
    expect(response.body.data).toHaveProperty("note");
    expect(response.body.data.note.title).toBe("Updated Title");
  });

  it("should delete an existing note", async () => {
    const username = "manuel";
    const newNote = await request(app)
      .post(`/notes/${username}`)
      .send({ title: "Test Note", body: "This is a test note." });
    const noteId = newNote.body.data.id;
    const response = await request(app).delete(`/notes/${username}/${noteId}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.ok).toBeTruthy();
    expect(response.body.data).toHaveProperty(
      "message",
      "Note deleted successfully"
    );
  });

  it("should get all notes for a user", async () => {
    const username = "manuel";
    const response = await request(app).get(`/notes/${username}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.ok).toBeTruthy();
    expect(response.body.data).toHaveProperty("notes");
  });
});
