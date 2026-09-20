import { proxySandbox } from "@/lib/sandbox-api";

export async function DELETE(_request: Request, { params }: { params: Promise<{ userId: string }> }) {
  const { userId } = await params;
  return proxySandbox(`/v1/sandbox/users/${encodeURIComponent(userId)}/documents`, { method: "DELETE" });
}
