import Redis from "ioredis";

const redis = new Redis();

export interface IData {
  title: string;
  content: string;
  updateTime: string;
}

const initialData = {
  "1702459181837":
    '{"title":"sunt aut","content":"quia et suscipit suscipit recusandae","updateTime":"2023-12-13T09:19:48.837Z"}',
  "1702459182837":
    '{"title":"qui est","content":"est rerum tempore vitae sequi sint","updateTime":"2023-12-13T09:19:48.837Z"}',
  "1702459188837":
    '{"title":"ea molestias","content":"et iusto sed quo iure","updateTime":"2023-12-13T09:19:48.837Z"}',
};

export async function getAllNotes() {
  // data 返回的是可序列化的 json string。
  const data = await redis.hgetall("notes");
  if (Object.keys(data).length == 0) {
    redis.hset("notes", initialData);
  }
  return redis.hgetall("notes");
}

export async function addNote(data) {
  const uuid = Date.now().toString();
  await redis.hset("notes", [uuid], data);
  return uuid;
}

export async function updateNote(uuid, data) {
  await redis.hset("notes", [uuid], data);
}

export async function getNote(uuid) {
  return JSON.parse((await redis.hget("notes", uuid)) as string);
}

export async function delNote(uuid) {
  return redis.hdel("notes", uuid);
}

export async function addUser(username, password) {
  await redis.hset("users", [username], password);
  return {
    name: username,
    username,
  };
}

export async function getUser(username?: string, password?: string) {
  const passwordFromDB = await redis.hget("users", username!);
  if (!passwordFromDB)
    return {
      code: 0,
    };
  if (passwordFromDB !== password)
    return {
      code: 1,
    };
  return {
    name: username,
    username,
  };
}

export default redis;
