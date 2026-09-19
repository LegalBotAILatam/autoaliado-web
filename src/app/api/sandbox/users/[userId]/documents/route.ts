import { proxySandbox } from "@/lib/sandbox-api";

export async function POST(request: Request, context: { params: Promise<{ userId: string }> }) {
  const { userId } = await context.params;
  return proxySandbox(`/v1/sandbox/users/${encodeURIComponent(userId)}/documents`, { method: "POST", headers: { "content-type": request.headers.get("content-type") ?? "" }, body: await request.arrayBuffer() });
}
