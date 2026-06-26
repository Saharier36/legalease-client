import { getUserToken } from "./session";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000";

const handleError = async (res, defaultPrefix) => {
  try {
    const errorData = await res.json().catch(() => ({}));
    return {
      error: true,
      status: res.status,
      message:
        errorData?.message ||
        `${defaultPrefix}: ${res.status} ${res.statusText}`,
    };
  } catch (e) {
    return {
      error: true,
      status: res.status,
      message: `${defaultPrefix}: ${res.status} ${res.statusText}`,
    };
  }
};

export const authHeader = async () => {
  const token = await getUserToken();
  const header = token
    ? {
        authorization: `Bearer ${token}`,
      }
    : {};
  return header;
};

// GET (Read)
export const serverFetch = async (path) => {
  try {
    const res = await fetch(`${baseUrl}${path}`);
    if (!res.ok) return await handleError(res, "Fetch error");
    return res.json();
  } catch (error) {
    return { error: true, message: error.message };
  }
};

export const protectedFetch = async (path) => {
  const res = await fetch(`${baseUrl}${path}`, {
    headers: await authHeader(),
  });
  return res.json();
};

// POST (Create)
export const serverMutation = async (path, data) => {
  try {
    const res = await fetch(`${baseUrl}${path}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(await authHeader()),
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) return await handleError(res, "Mutation error");
    return res.json();
  } catch (error) {
    return { error: true, message: error.message };
  }
};

// PUT/PATCH (Update)
export const serverUpdate = async (path, data, method = "PATCH") => {
  try {
    const res = await fetch(`${baseUrl}${path}`, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        ...(await authHeader()),
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) return await handleError(res, "Update error");
    return res.json();
  } catch (error) {
    return { error: true, message: error.message };
  }
};

// DELETE
export const serverDelete = async (path) => {
  try {
    const res = await fetch(`${baseUrl}${path}`, {
      method: "DELETE",
      headers: {
        ...(await authHeader()),
      },
    });
    if (!res.ok) return await handleError(res, "Delete error");
    return res.json();
  } catch (error) {
    return { error: true, message: error.message };
  }
};