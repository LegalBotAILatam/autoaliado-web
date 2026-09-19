import { proxySandbox } from "@/lib/sandbox-api";

export async function PATCH(request: Request, { params }: { params: Promise<{ userId: string }> }) {
  const { userId } = await params;
  return proxySandbox(`/v1/sandbox/users/${encodeURIComponent(userId)}/phone`, { method: "PATCH", headers: { "content-type": "application/json" }, body: await request.text() });
}
