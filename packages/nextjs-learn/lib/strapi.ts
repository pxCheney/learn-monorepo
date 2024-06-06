import { API_URL, API_TOKEN } from "@/config/index";

export interface IData {
  title: string;
  content: string;
  updateTime: string;
}

async function getAllNotes() {
  const response = await fetch(`${API_URL}/api/notes`);
  const data = await response.json();

  const res = {};

  data.data.forEach(
    ({ id, attributes: { title, content, slug, updatedAt } }) => {
      res[slug] = JSON.stringify({
        title,
        content,
        updateTime: updatedAt,
      });
    },
  );

  return res;
}

async function addNote(data) {
  const response = await fetch(`${API_URL}/api/notes`, {
    method: "POST",
    headers: {
      Authorization: API_TOKEN,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      data: JSON.parse(data),
    }),
  });
  const res = await response.json();
  return res.data.attributes.slug;
}

async function updateNote(uuid: string, data) {
  const { id } = await getNote(uuid);
  const response = await fetch(`${API_URL}/api/notes/${id}`, {
    method: "PUT",
    headers: {
      Authorization: API_TOKEN,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      data: JSON.parse(data),
    }),
  });
  const res = await response.json();
}

async function getNote(uuid: string) {
  const response = await fetch(
    `${API_URL}/api/notes?filters[slug][$eq]=${uuid}`,
  );
  const data = await response.json();
  return {
    title: data.data[0].attributes.title,
    content: data.data[0].attributes.content,
    updateTime: data.data[0].attributes.updatedAt,
    id: data.data[0].id,
  };
}

async function delNote(uuid: string) {
  const { id } = await getNote(uuid);
  const response = await fetch(`${API_URL}/api/notes/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: API_TOKEN,
      "Content-Type": "application/json",
    },
  });
  const res = await response.json();
}

export { getAllNotes, addNote, updateNote, getNote, delNote };
