import { BASE_URL } from "./constants";

/**
 * POST /signin
 * Returns { token, data }
 */
export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  }).then(processAuthResponse);
};

/**
 * POST /signin/demo
 * Returns { token, data } for the seeded demo account.
 */
export const authorizeDemo = ({ signal } = {}) => {
  return fetch(`${BASE_URL}/signin/demo`, {
    method: "POST",
    signal,
  }).then(processAuthResponse);
};

/**
 * POST /signup
 * The form field is "username"; the backend expects "name".
 * Returns { data: { _id, name, email } }
 */
export const register = (email, password, username) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, name: username }),
  }).then(processAuthResponse);
};

/**
 * GET /users/me
 * Returns { data: { _id, name, email } }
 */
export const checkToken = (token, { signal } = {}) => {
  return fetch(`${BASE_URL}/users/me`, {
    headers: { Authorization: `Bearer ${token}` },
    signal,
  }).then(processAuthResponse);
};

// ── helpers ────────────────────────────────────────────────────────────────

async function processAuthResponse(res) {
  const body = await parseResponseBody(res);

  if (res.ok) {
    return body;
  }

  throw new Error(body.message || `Error ${res.status}`);
}

async function parseResponseBody(res) {
  const text = await res.text();

  if (!text) {
    return {};
  }

  try {
    return JSON.parse(text);
  } catch {
    return { message: `Error ${res.status}` };
  }
}
