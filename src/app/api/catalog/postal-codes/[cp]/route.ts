import { proxySandbox } from "@/lib/sandbox-api";

export async function GET(_request: Request, context: { params: Promise<{ cp: string }> }) {
  const { cp } = await context.params;
  return proxySandbox(`/v1/catalog/postal-codes/${encodeURIComponent(cp)}`);
}
