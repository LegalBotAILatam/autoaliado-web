import { proxySandbox } from "@/lib/sandbox-api";

export async function DELETE(request: Request, { params }: { params: Promise<{ userId: string }> }) {
  const { userId } = await params;
  const query = new URL(request.url).search;
  return proxySandbox(`/v1/sandbox/users/${encodeURIComponent(userId)}/documents${query}`, { method: "DELETE" });
}
