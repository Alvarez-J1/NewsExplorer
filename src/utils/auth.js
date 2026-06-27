import { BASE_URL } from "./constants";

/**
 * POST /signin
 * Returns { token }
 */
export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
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
export const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    headers: { Authorization: `Bearer ${token}` },
  }).then(processAuthResponse);
};

// ── helpers ────────────────────────────────────────────────────────────────

function processAuthResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return res.json().then((body) => {
    return Promise.reject(new Error(body.message || `Error ${res.status}`));
  });
}
