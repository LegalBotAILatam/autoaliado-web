"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, FileText, LockKeyhole, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

type Step = 1 | 2 | 3 | 4;
type FileProcessingStatus = "pending" | "uploading" | "extracting" | "needs_review" | "extracted" | "failed";
type MockFile = { id: number; name: string; size: string; type: string; captureSource: "upload" | "camera"; status: FileProcessingStatus; statusMessage?: string; documentId?: string; file?: File };
const steps = [
  { id: 1 as Step, title: "Datos personales", copy: "Necesitamos algunos datos básicos." },
  { id: 2 as Step, title: "Dirección", copy: "Tu domicilio de contacto." },
  { id: 3 as Step, title: "WhatsApp", copy: "Para asistencias y notificaciones." },
  { id: 4 as Step, title: "Documentos", copy: "Carga tu póliza y documentos." },
];

export function SignupFlow({ embedded = false, sandboxUserId }: { embedded?: boolean; sandboxUserId?: string }) {
  const [activeStep, setActiveStep] = useState<Step>(1);
  const [createdUserId, setCreatedUserId] = useState<string | null>(null);
  const [fullName, setFullName] = useState("");
  const [phoneE164, setPhoneE164] = useState("");
  const [saveState, setSaveState] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [saveMessage, setSaveMessage] = useState<string>("");
  const [files, setFiles] = useState<MockFile[]>([]);
  function addFiles(event: React.ChangeEvent<HTMLInputElement>, captureSource: "upload" | "camera" = "upload") {
    const selected = Array.from(event.target.files ?? []).map((file, index) => ({ id: Date.now() + index, name: file.name, size: `${(file.size / 1024 / 1024).toFixed(1)} MB`, type: file.type.split("/").pop()?.toUpperCase() ?? "FILE", captureSource, status: "pending" as const, file }));
    setFiles((current) => [...current, ...selected]);
    event.target.value = "";
  }
  function updateFile(id: number, patch: Partial<MockFile>) {
    setFiles((current) => current.map((file) => file.id === id ? { ...file, ...patch } : file));
  }
  async function uploadDocuments() {
    setSaveState("saving");
    setSaveMessage("");
    try {
      let userId = sandboxUserId ?? createdUserId;
      if (!userId) {
        if (!fullName.trim()) throw new Error("Escribe el nombre del usuario antes de guardar.");
        const userResponse = await fetch("/api/sandbox/users", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ user: { name: fullName.trim(), ...(phoneE164.trim() ? { phoneE164: phoneE164.trim() } : {}) }, externalUserId: phoneE164.trim() || undefined, channelConnectionId: "kapso-whatsapp-sandbox" }) });
        if (!userResponse.ok) throw new Error("No se pudo crear el usuario sandbox.");
        const created = await userResponse.json() as { userId?: string };
        if (!created.userId) throw new Error("La respuesta no incluyó el identificador sandbox.");
        userId = created.userId;
        setCreatedUserId(userId);
      }
      let uploaded = 0;
      let extractionFailures = 0;
      for (const item of files) {
        if (!item.file) continue;
        updateFile(item.id, { status: "uploading", statusMessage: "Cargando documento…" });
        const form = new FormData();
        form.append("file", item.file, item.file.name);
        form.append("captureSource", item.captureSource);
        const response = await fetch(`/api/sandbox/users/${encodeURIComponent(userId)}/documents`, { method: "POST", body: form });
        if (!response.ok) {
          updateFile(item.id, { status: "failed", statusMessage: "No se pudo cargar" });
          extractionFailures += 1;
          continue;
        }
        const uploadedDocument = await response.json() as { documentId?: string };
        if (!uploadedDocument.documentId) {
          updateFile(item.id, { status: "failed", statusMessage: "No se recibió el documento" });
          extractionFailures += 1;
          continue;
        }
        uploaded += 1;
        updateFile(item.id, { documentId: uploadedDocument.documentId, status: "extracting", statusMessage: "Extrayendo datos…" });
        try {
          const extractionResponse = await fetch(`/api/sandbox/documents/${encodeURIComponent(uploadedDocument.documentId)}/extract`, { method: "POST" });
          const extractionBody = await extractionResponse.json().catch(() => ({})) as { extraction?: { status?: string; issues?: Array<{ message?: string }> }; status?: string };
          if (!extractionResponse.ok) throw new Error(extractionBody.status ?? "No se pudo extraer la póliza");
          const extraction = extractionBody.extraction;
          const extractionStatus = extraction?.status;
          if (extractionStatus === "extraction_failed") throw new Error(extraction?.issues?.[0]?.message ?? "La extracción falló");
          const needsReview = extractionStatus === "needs_review";
          updateFile(item.id, { status: needsReview ? "needs_review" : "extracted", statusMessage: needsReview ? "Requiere revisión en Consola" : "Extraído; pendiente de confirmación" });
        } catch (error) {
          extractionFailures += 1;
          updateFile(item.id, { status: "failed", statusMessage: error instanceof Error ? error.message : "Extracción fallida" });
        }
      }
      if (!uploaded) throw new Error("Agrega al menos un archivo real antes de guardar.");
      setSaveState("saved");
      setSaveMessage(extractionFailures ? "El usuario se creó, pero algunos documentos requieren reintento. Revisa el detalle en Consola." : "Usuario sandbox listo. La extracción terminó; revisa y confirma los campos en Consola.");
    } catch (error) {
      setSaveState("error");
      setSaveMessage(error instanceof Error ? error.message : "No se pudo guardar el alta.");
      window.alert(error instanceof Error ? error.message : "No se pudo guardar el alta.");
    }
  }
  return <section id="alta" className={embedded ? "border-t border-aa-border bg-aa-page py-16 sm:py-20" : "min-h-screen bg-aa-page py-8 sm:py-12"}><Container><div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-12"><div className="w-full shrink-0 lg:w-[28%] lg:pt-8"><p className="text-xs font-bold uppercase tracking-[0.25em] text-aa-blue-600">Un solo lugar, todo más simple</p><h2 className="mt-4 max-w-sm font-display text-4xl font-extrabold leading-[0.98] tracking-[-0.05em] text-aa-navy-950 sm:text-5xl">Alta de <span className="text-aa-coral-500">usuario</span></h2><p className="mt-5 max-w-sm text-lg leading-7 text-aa-gray-600">Registra tus datos y sube tu póliza para tener todo a la mano en Autoaliado.</p><div className="mt-8 space-y-5 text-sm"><p className="flex items-center gap-3 font-semibold text-aa-navy-900"><span className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-50 text-aa-blue-600">↯</span> Rápido y seguro</p><p className="flex items-center gap-3 font-semibold text-aa-navy-900"><span className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-50 text-aa-blue-600">▣</span> Todo en digital</p><p className="flex items-center gap-3 font-semibold text-aa-navy-900"><span className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-50 text-aa-blue-600">♢</span> Tu información protegida</p></div></div><div className="w-full rounded-[30px] border border-aa-border bg-white p-5 shadow-[var(--aa-shadow-md)] sm:p-8 lg:w-[72%] lg:p-9"><div className="mb-8 hidden items-center justify-between lg:flex"><div><p className="font-display text-2xl font-bold text-aa-navy-950">Tus datos personales</p><p className="mt-1 text-sm text-aa-text-muted">Completa la información para crear tu cuenta en Autoaliado.</p></div><span className="text-sm font-semibold text-aa-blue-600">Paso 1 de 2</span></div><div className="space-y-3 lg:hidden">{steps.map((step) => { const open = activeStep === step.id; return <div key={step.id} className={`overflow-hidden rounded-3xl border transition ${open ? "border-aa-blue-500/35 bg-white shadow-[var(--aa-shadow-sm)]" : "border-aa-border bg-aa-surface-soft"}`}><button type="button" onClick={() => setActiveStep(step.id)} className="flex min-h-[76px] w-full items-center gap-4 px-5 text-left"><span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full font-display text-lg font-bold ${open ? "bg-blue-100 text-aa-blue-600" : "bg-white text-aa-navy-900"}`}>{step.id}</span><span className="flex-1"><strong className="block font-display text-lg">{step.title}</strong><span className="block text-sm text-aa-text-muted">{step.copy}</span></span>{open ? <ChevronUp size={22} /> : <ChevronDown size={22} />}</button>{open && <div className="space-y-4 px-5 pb-6"><StepFields step={step.id} onNameChange={setFullName} onPhoneChange={setPhoneE164} />{step.id === 4 && <Documents files={files} onAdd={addFiles} onCamera={(event) => addFiles(event, "camera")} onRemove={(id) => setFiles(files.filter((file) => file.id !== id))} />}<Button type="button" withArrow className="mt-2 w-full" onClick={() => step.id === 4 ? void uploadDocuments() : setActiveStep(Math.min(4, step.id + 1) as Step)}>{step.id === 4 ? "Guardar cambios" : "Siguiente"}</Button></div>}</div>; })}<p className="flex items-center justify-center gap-2 pt-4 text-sm text-aa-text-muted"><LockKeyhole size={16} /> Tu información está protegida y es confidencial.</p>{saveState !== "idle" && <p role="status" aria-live="polite" className={`rounded-xl px-4 py-3 text-sm font-semibold ${saveState === "error" ? "bg-red-50 text-aa-coral-500" : "bg-blue-50 text-aa-blue-700"}`}>{saveState === "saving" ? "Guardando y extrayendo documentos…" : saveMessage}</p>}</div><div className="hidden lg:block"><div className="flex flex-wrap gap-4"><StepFields step={1} onNameChange={setFullName} onPhoneChange={setPhoneE164} /><StepFields step={2} onNameChange={setFullName} onPhoneChange={setPhoneE164} /><StepFields step={3} onNameChange={setFullName} onPhoneChange={setPhoneE164} /></div><div className="my-8 border-t border-aa-border" /><Documents files={files} onAdd={addFiles} onCamera={(event) => addFiles(event, "camera")} onRemove={(id) => setFiles(files.filter((file) => file.id !== id))} /><div className="mt-8 flex items-center justify-between gap-4"><button type="button" className="min-h-12 rounded-full border-[1.5px] border-aa-navy-900 px-8 text-sm font-semibold text-aa-navy-900">Cancelar</button><Button type="button" withArrow className="min-w-[240px]" onClick={() => void uploadDocuments()} disabled={saveState === "saving"}>{saveState === "saving" ? "Guardando…" : "Guardar cambios"}</Button></div>{saveState !== "idle" && <p role="status" aria-live="polite" className={`mt-4 rounded-xl px-4 py-3 text-sm font-semibold ${saveState === "error" ? "bg-red-50 text-aa-coral-500" : "bg-blue-50 text-aa-blue-700"}`}>{saveState === "saving" ? "Guardando y extrayendo documentos…" : saveMessage}{createdUserId && saveState === "saved" ? ` · Usuario ${createdUserId}` : ""}</p>}</div></div></div></Container></section>;
}

function StepFields({ step, onNameChange, onPhoneChange }: { step: Step; onNameChange?: (value: string) => void; onPhoneChange?: (value: string) => void }) { if (step === 1) return <><Field label="Nombre completo" placeholder="Ej. Juan Pérez García" required onChange={onNameChange} /><Field label="Segundo nombre" placeholder="Opcional" /><Field label="Primer apellido" placeholder="Ej. Pérez" required /><Field label="Segundo apellido" placeholder="Ej. García" /></>; if (step === 2) return <><Field label="Calle" placeholder="Av. Insurgentes Sur" required /><Field label="Número exterior" placeholder="1234" required /><Field label="Número interior" placeholder="Opcional" /><Field label="Colonia" placeholder="Del Valle" required /><Field label="Ciudad / municipio" placeholder="Ciudad de México" required /><Field label="Estado" placeholder="Selecciona un estado" required /><Field label="Código postal" placeholder="03100" required /><Field label="País" placeholder="México" required /></>; return <><Field label="WhatsApp" placeholder="+52 55 1234 5678" required onChange={onPhoneChange} /><Field label="Código de país" placeholder="🇲🇽  +52" required /></>; }
function Field({ label, placeholder, required = false, onChange }: { label: string; placeholder: string; required?: boolean; onChange?: (value: string) => void }) { return <label className="w-full space-y-2 text-sm font-semibold text-aa-navy-900 sm:basis-[calc(50%-8px)]">{label}{required && <span className="text-aa-coral-500"> *</span>}<input required={required} placeholder={placeholder} onChange={(event) => onChange?.(event.target.value)} className="h-13 w-full rounded-xl border border-aa-border bg-white px-4 font-normal outline-none transition placeholder:text-aa-gray-400 focus:border-aa-blue-500 focus:ring-4 focus:ring-aa-blue-500/10" /></label>; }
function Documents({ files, onAdd, onCamera, onRemove }: { files: MockFile[]; onAdd: (event: React.ChangeEvent<HTMLInputElement>) => void; onCamera: (event: React.ChangeEvent<HTMLInputElement>) => void; onRemove: (id: number) => void }) { const statusLabel: Record<FileProcessingStatus, string> = { pending: "Listo para guardar", uploading: "Cargando…", extracting: "Extrayendo datos…", needs_review: "Requiere revisión en Consola", extracted: "Extraído; pendiente de confirmación", failed: "Error; reintenta" }; const statusClass: Record<FileProcessingStatus, string> = { pending: "text-aa-text-muted", uploading: "text-aa-blue-600", extracting: "text-aa-blue-600", needs_review: "text-aa-coral-500", extracted: "text-aa-success-500", failed: "text-aa-coral-500" }; return <div><div className="mb-5 flex items-center gap-3"><span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-aa-blue-600"><FileText size={24} /></span><div><h3 className="font-display text-xl font-bold">Documentos</h3><p className="text-sm text-aa-text-muted">PDF, JPG o PNG · máximo 10 MB por archivo. Al guardar, iniciaremos la extracción automáticamente.</p></div></div><div className="flex flex-col gap-5 md:flex-row"><div className="grid flex-1 gap-3 sm:grid-cols-2"><label className="flex min-h-[150px] cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-aa-blue-500/30 bg-aa-surface-soft px-5 text-center transition hover:border-aa-blue-500 hover:bg-blue-50"><Upload size={28} className="text-aa-blue-600" /><span className="mt-3 text-sm font-bold text-aa-navy-900">Subir archivo</span><span className="mt-1 text-xs text-aa-text-muted">PDF, JPG o PNG</span><input type="file" multiple accept=".pdf,.png,.jpg,.jpeg" onChange={onAdd} className="sr-only" /></label><label className="flex min-h-[150px] cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-aa-coral-500/30 bg-aa-surface-soft px-5 text-center transition hover:border-aa-coral-500 hover:bg-red-50"><span className="text-3xl" aria-hidden="true">📷</span><span className="mt-3 text-sm font-bold text-aa-navy-900">Tomar foto</span><span className="mt-1 text-xs text-aa-text-muted">Usar cámara del dispositivo</span><input type="file" accept="image/jpeg,image/png" capture="environment" onChange={onCamera} className="sr-only" /></label></div><div className="flex flex-1 flex-col gap-2">{files.map((file) => <div key={file.id} className="flex items-center gap-3 rounded-xl bg-aa-surface-soft px-3 py-3"><span className="flex h-9 w-9 items-center justify-center rounded-lg bg-aa-blue-500 text-xs font-bold text-white">{file.type === "PDF" ? "PDF" : "IMG"}</span><span className="min-w-0 flex-1"><strong className="block truncate text-sm">{file.name}</strong><small className="text-xs text-aa-text-muted">{file.type} · {file.size} · <span className={statusClass[file.status]}>{statusLabel[file.status]}</span></small></span><button type="button" aria-label={`Eliminar ${file.name}`} onClick={() => onRemove(file.id)} className="flex h-8 w-8 items-center justify-center rounded-full text-aa-text-muted hover:bg-white hover:text-aa-coral-500"><X size={16} /></button></div>)}</div></div></div>; }
