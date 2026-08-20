export type UserRole = "user" | "owner";

export type AuthUser = {
  id?: string;
  _id?: string;
  name: string;
  email: string;
  role: UserRole;
  profilePicture?: string;
};

type AuthResponse = {
  success: boolean;
  message: string;
  user?: AuthUser;
};

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

export async function loginUser(email: string, password: string) {
  return authRequest("/api/auth/login", { email, password });
}

export async function registerUser(input: {
  name: string;
  email: string;
  password: string;
  role: UserRole;
}) {
  return authRequest("/api/auth/register", input);
}

export async function logoutUser() {
  const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
    method: "POST",
    credentials: "include",
  });

  return response.json() as Promise<AuthResponse>;
}

export function saveAuthUser(user: AuthUser) {
  localStorage.setItem("user", JSON.stringify(user));
  window.dispatchEvent(new CustomEvent("auth:user-changed", { detail: user }));
}

export function clearAuthUser() {
  localStorage.removeItem("user");
  localStorage.removeItem("userToken");
  window.dispatchEvent(new CustomEvent("auth:user-changed", { detail: null }));
}

export function getStoredUser(): AuthUser | null {
  const userData = localStorage.getItem("user");
  if (!userData) return null;

  try {
    return JSON.parse(userData) as AuthUser;
  } catch {
    localStorage.removeItem("user");
    return null;
  }
}

async function authRequest(path: string, body: unknown) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(body),
  });

  const data = (await response.json()) as AuthResponse;

  if (!response.ok || !data.success || !data.user) {
    throw new Error(data.message || "Authentication failed");
  }

  saveAuthUser(data.user);
  return data;
}
