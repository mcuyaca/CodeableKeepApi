export type User = {
  id: number;
  name: string;
};

export type UserData = Omit<User, "id">;
