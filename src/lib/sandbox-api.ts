const backendUrl = () => (process.env.SANDBOX_API_BASE_URL ?? process.env.BACKEND_API_URL ?? "").replace(/\/$/, "");

export async function proxySandbox(path: string, init?: RequestInit) {
  const base = backendUrl();
  if (!base) return Response.json({ error: "sandbox_backend_not_configured" }, { status: 503 });
  const headers = new Headers(init?.headers);
  if (process.env.SANDBOX_API_TOKEN) headers.set("authorization", `Bearer ${process.env.SANDBOX_API_TOKEN}`);
  const response = await fetch(`${base}${path}`, { ...init, headers, cache: "no-store" });
  return new Response(response.body, { status: response.status, headers: { "content-type": response.headers.get("content-type") ?? "application/json" } });
}
