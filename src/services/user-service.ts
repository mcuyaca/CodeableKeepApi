import * as userDB from "../data/user-data";

export async function getOrCreateUserId(username: string) {
  let data = await userDB.getUserByUsername(username);
  if (data.rowCount === 0) {
    await userDB.newUser(username);
    data = await userDB.getUserByUsername(username);
  }
  const [userData] = data.rows;
  return userData?.id;
}

export async function getUsers() {
  return await userDB.getUsers();
}
