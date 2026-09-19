import { proxySandbox } from "@/lib/sandbox-api";

export async function POST(request: Request, context: { params: Promise<{ documentId: string }> }) {
  const { documentId } = await context.params;
  return proxySandbox(`/v1/sandbox/documents/${encodeURIComponent(documentId)}/confirm`, { method: "POST", headers: { "content-type": "application/json" }, body: await request.text() });
}
