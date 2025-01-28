export const HTTP = process.env.NEXT_PUBLIC_HTTP_URL || "http://localhost:1000/v1/auth/";

export async function fetchQuote(token: string) {
  const res = await fetch(`${HTTP}quote`, {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  });
  return res.json();
}

export async function updateQuote(token: string, quote: string) {
  const res = await fetch(`${HTTP}quote`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify({ quote }),
  });
  return res.json();
}

export async function registerUser(name: string, email: string, password: string) {
  const res = await fetch(`${HTTP}register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });
  return res.json();
}

export async function loginUser(email: string, password: string) {
  const res = await fetch(`${HTTP}login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return res.json();
}