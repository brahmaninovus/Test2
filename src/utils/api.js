const BASE_URL = 'https://notes-api.dicoding.dev/v1';

export async function register({ name, email, password }) {
  const res = await fetch(`${BASE_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password }),
  });
  return res.json();
}

export async function login({ email, password }) {
  const res = await fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  return res.json();
}

export async function getNote(token, id) {
  const res = await fetch(`${BASE_URL}/notes/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return res.json();
}

export async function getNotes(token) {
  const res = await fetch(`${BASE_URL}/notes`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
}

export async function addNote(token, note) {
  const res = await fetch(`${BASE_URL}/notes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(note),
  });
  return res.json();
}

export async function deleteNote(token, id) {
  const res = await fetch(`${BASE_URL}/notes/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });

  return res.json(); // ⬅️ penting
}

export async function archiveNote(token, id) {
  const res = await fetch(`${BASE_URL}/notes/${id}/archive`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
  });

  return res.json();
}

export async function unarchiveNote(token, id) {
  const res = await fetch(`${BASE_URL}/notes/${id}/unarchive`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
  });

  return res.json();
}

export async function getArchivedNotes(token) {
  const res = await fetch(`${BASE_URL}/notes/archived`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return res.json();
}