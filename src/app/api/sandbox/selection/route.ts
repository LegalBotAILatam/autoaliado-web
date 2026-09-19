import { proxySandbox } from "@/lib/sandbox-api";

export async function GET(request: Request) {
  const url = new URL(request.url);
  return proxySandbox(`/v1/sandbox/selection${url.search}`);
}
export async function PUT(request: Request) {
  return proxySandbox("/v1/sandbox/selection", { method: "PUT", headers: { "content-type": "application/json" }, body: await request.text() });
}
export async function DELETE(request: Request) {
  return proxySandbox("/v1/sandbox/selection", { method: "DELETE", headers: { "content-type": "application/json" }, body: await request.text() });
}
