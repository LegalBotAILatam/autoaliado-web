"use client";

import { useCallback, useEffect, useState } from "react";
import { Check, FileSearch, LoaderCircle, RefreshCw, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/Button";

type Extraction = { status: string; provider: string; payload: Record<string, unknown> | null; issues: Array<{ code?: string; message?: string }> | null; version: number } | null;
type DocumentRecord = { document: { id: string; documentType: string; mediaType: string; status: string; captureSource: string | null; pageCount: number | null; updatedAt: string | null }; extraction: Extraction };

const fields: Array<[string, string, string]> = [["policy.insurer", "Aseguradora", "insurer"], ["policy.policyNumber", "Número de póliza", "policyNumber"], ["policy.validFrom", "Vigencia desde", "validUntil"], ["policy.validUntil", "Vigencia hasta", "validUntil"], ["user.name", "Asegurado", "overall"], ["vehicle.make", "Marca", "vehicle"], ["vehicle.model", "Modelo", "vehicle"], ["vehicle.year", "Año", "vehicle"], ["vehicle.plate", "Placas", "vehicle"], ["policy.assistancePhone", "Asistencia", "overall"], ["policy.claimsPhone", "Siniestros", "overall"]];

function valueAt(payload: Record<string, unknown>, path: string) {
  return path.split(".").reduce<unknown>((current, key) => current && typeof current === "object" ? (current as Record<string, unknown>)[key] : null, payload);
}

function statusLabel(status: string) {
  return { received: "Recibido", extracting: "Extrayendo…", extracted: "Extraído", needs_review: "Revisión requerida", extraction_failed: "Falló la extracción", confirmed: "Confirmado" }[status] ?? status;
}

export function OcrReviewPanel({ userId }: { userId: string }) {
  const [documents, setDocuments] = useState<DocumentRecord[]>([]);
  const [drafts, setDrafts] = useState<Record<string, Record<string, string>>>({});
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true); setMessage(null);
    try {
      const response = await fetch(`/api/sandbox/users/${encodeURIComponent(userId)}/documents`, { cache: "no-store" });
      if (!response.ok) throw new Error("No se pudieron consultar los documentos.");
      const payload = await response.json() as { documents?: DocumentRecord[] };
      const nextDocuments = payload.documents ?? [];
      setDocuments(nextDocuments);
      setDrafts((current) => Object.fromEntries(nextDocuments.map((item) => [item.document.id, current[item.document.id] ?? Object.fromEntries(fields.map(([path]) => [path, String(valueAt(item.extraction?.payload ?? {}, path) ?? "")]))])));
    } catch (error) { setMessage(error instanceof Error ? error.message : "No se pudieron consultar los documentos."); }
    finally { setLoading(false); }
  }, [userId]);

  useEffect(() => { const timer = window.setTimeout(() => { void load(); }, 0); return () => window.clearTimeout(timer); }, [load]);

  function draftPayload(documentId: string, payload: Record<string, unknown>) {
    const draft = drafts[documentId];
    if (!draft) return payload;
    const next = structuredClone(payload) as Record<string, unknown>;
    for (const [path, value] of Object.entries(draft)) {
      const [section, key] = path.split(".");
      if (!section || !key) continue;
      const target = next[section] && typeof next[section] === "object" ? next[section] as Record<string, unknown> : {};
      target[key] = value || null;
      next[section] = target;
    }
    return next;
  }

  async function action(documentId: string, endpoint: "extract" | "confirm", body?: Record<string, unknown>) {
    setBusyId(documentId); setMessage(null);
    try {
      const response = await fetch(`/api/sandbox/documents/${encodeURIComponent(documentId)}/${endpoint}`, { method: "POST", headers: { "content-type": "application/json" }, body: body ? JSON.stringify(body) : undefined });
      if (!response.ok) { const error = await response.json().catch(() => ({})) as { error?: string }; throw new Error(error.error ?? "La operación no pudo completarse."); }
      await load();
    } catch (error) { setMessage(error instanceof Error ? error.message : "La operación no pudo completarse."); }
    finally { setBusyId(null); }
  }

  return <section className="mt-8 rounded-3xl border border-aa-border bg-white p-5 shadow-[var(--aa-shadow-sm)] sm:p-7" aria-labelledby="ocr-review-title">
    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between"><div><p className="text-xs font-bold uppercase tracking-[0.12em] text-aa-blue-600">Documentos / OCR</p><h2 id="ocr-review-title" className="mt-2 font-display text-2xl font-bold tracking-[-0.03em]">Revisión de póliza</h2><p className="mt-1 max-w-2xl text-sm text-aa-text-muted">Inicia la extracción, revisa la confianza de los campos y confirma los datos antes de usarlos en el sandbox.</p></div><button type="button" onClick={() => void load()} className="inline-flex h-10 items-center justify-center gap-2 rounded-full border border-aa-border px-4 text-sm font-semibold hover:bg-aa-surface-soft" disabled={loading}><RefreshCw size={15} className={loading ? "animate-spin" : ""} />Actualizar</button></div>
    {message && <p role="alert" className="mt-5 rounded-2xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">{message}</p>}
    {loading ? <div className="mt-8 flex items-center gap-2 text-sm text-aa-text-muted" role="status"><LoaderCircle size={18} className="animate-spin" />Consultando documentos privados…</div> : documents.length === 0 ? <div className="mt-7 rounded-2xl border border-dashed border-aa-border bg-aa-surface-soft px-5 py-8 text-center"><FileSearch className="mx-auto text-aa-text-muted" size={28} /><p className="mt-3 font-semibold">Aún no hay documentos para este usuario</p><p className="mt-1 text-sm text-aa-text-muted">Carga una póliza desde Alta de usuario para iniciar OCR.</p></div> : <div className="mt-7 space-y-4">{documents.map(({ document, extraction }) => { const payload = extraction?.payload ?? {}; const confidence = payload.confidence && typeof payload.confidence === "object" ? payload.confidence as Record<string, unknown> : {}; const canExtract = document.status === "received" || document.status === "extraction_failed"; const canConfirm = Boolean(extraction && (extraction.status === "extracted" || extraction.status === "needs_review")); return <article key={document.id} className="rounded-2xl border border-aa-border p-4 sm:p-5"><div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"><div><p className="font-semibold">{document.documentType === "insurance-policy" ? "Póliza de seguro" : document.documentType}</p><p className="mt-1 text-xs text-aa-text-muted">{document.mediaType} · {document.captureSource === "camera" ? "Cámara" : "Carga"}{document.pageCount ? ` · ${document.pageCount} páginas` : ""}</p></div><span className={`inline-flex w-fit items-center gap-2 rounded-full px-3 py-1.5 text-xs font-bold ${document.status === "needs_review" ? "bg-orange-50 text-orange-700" : document.status === "confirmed" ? "bg-emerald-50 text-emerald-700" : "bg-blue-50 text-aa-blue-700"}`}>{document.status === "needs_review" && <ShieldAlert size={14} />}{statusLabel(document.status)}</span></div>{extraction?.issues?.length ? <p className="mt-4 rounded-xl bg-orange-50 px-3 py-2 text-sm text-orange-800">{extraction.issues.map((issue) => issue.message).filter(Boolean).join(" ")}</p> : null}{canConfirm && <div className="mt-5 grid gap-3 sm:grid-cols-2">{fields.map(([path, label, confidenceKey]) => { const value = drafts[document.id]?.[path] ?? String(valueAt(payload, path) ?? ""); const score = confidence[confidenceKey]; return <label key={path} className="rounded-xl bg-aa-surface-soft px-3 py-2"><span className="flex items-center justify-between gap-2 text-xs font-semibold text-aa-text-muted"><span>{label}</span><span className="font-bold text-aa-navy-900">{typeof score === "number" ? `${Math.round(score * 100)}% confianza` : "Confianza no disponible"}</span></span><input value={value} onChange={(event) => setDrafts((current) => ({ ...current, [document.id]: { ...current[document.id], [path]: event.target.value } }))} className="mt-1 w-full truncate bg-transparent text-sm font-semibold outline-none focus:ring-2 focus:ring-aa-blue-500/30" aria-label={`${label} extraído`} /></label>; })}</div>}{(canExtract || canConfirm) && <div className="mt-5 flex flex-wrap items-center gap-3">{canExtract && <Button type="button" onClick={() => void action(document.id, "extract")} disabled={busyId === document.id} className="gap-2">{busyId === document.id ? <LoaderCircle size={16} className="animate-spin" /> : <FileSearch size={16} />}Iniciar extracción</Button>}{canConfirm && <Button type="button" onClick={() => void action(document.id, "confirm", { expectedVersion: extraction?.version, ...draftPayload(document.id, extraction?.payload ?? {}) })} disabled={busyId === document.id} className="gap-2 bg-aa-success-500 hover:bg-aa-success-600"><Check size={16} />Confirmar datos revisados</Button>}</div>}</article>; })}</div>}
  </section>;
}
