import { proxySandbox } from "@/lib/sandbox-api";

export async function GET(_request: Request, context: { params: Promise<{ documentId: string }> }) {
  const { documentId } = await context.params;
  return proxySandbox(`/v1/sandbox/documents/${encodeURIComponent(documentId)}`);
}
