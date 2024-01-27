import z from "zod";

export interface DraftNote {
  title: string;
  body?: string;
  color?: string;
  pinned?: boolean;
  deleted?: boolean;
}

export const noteSchema = z.object({
  title: z
    .string({
      invalid_type_error: "Se asigno un tipo invalido.",
    })
    .min(3, "El título debe tener al menos 3 caracteres")
    .default(""),
  body: z
    .string({
      invalid_type_error: "Se asigno un tipo invalido.",
    })
    .default(""),
  color: z
    .string({ invalid_type_error: "Se asigno un tipo invalido." })
    .refine(
      (value) => /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(value),
      "Debe ser un color hexadecimal válido en el formato #RRGGBB o #RGB"
    )
    .default("#FFFFFF"),
  pinned: z
    .boolean({ invalid_type_error: "Se asigno un tipo invalido." })
    .default(false),
  deleted: z
    .boolean({ invalid_type_error: "Se asigno un tipo invalido." })
    .default(false),
});

export type NoteParams = z.infer<typeof noteSchema>;
export type Note = NoteParams & { id: string; user_id: number };
export const newNoteSchema = noteSchema.merge(
  z.object({
    id: z.string({
      invalid_type_error: "Se asigno un tipo invalido.",
    }),
    user_id: z.number({
      invalid_type_error: "Se asigno un tipo invalido.",
    }),
  })
);

export const editNoteSchema = noteSchema.merge(
  z.object({
    user_id: z.number({
      invalid_type_error: "Se asigno un tipo invalido.",
    }),
  })
);

export type editNoteParams = z.infer<typeof editNoteSchema>;
