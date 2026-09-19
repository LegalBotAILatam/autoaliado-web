import { proxySandbox } from "@/lib/sandbox-api";

export async function GET(request: Request) {
  const url = new URL(request.url);
  return proxySandbox(`/v1/sandbox/users${url.search}`);
}

export async function POST(request: Request) {
  return proxySandbox("/v1/sandbox/users", { method: "POST", headers: { "content-type": "application/json" }, body: await request.text() });
}
