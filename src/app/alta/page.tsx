import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Check, LockKeyhole, ShieldCheck } from "lucide-react";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

const benefits = [
  "Tu póliza y documentos siempre a la mano",
  "Recordatorios para cuidar tu auto",
  "Asistencia cuando realmente la necesitas",
];

export default function AltaPage() {
  return (
    <main className="min-h-screen bg-aa-page">
      <div className="grid min-h-screen lg:grid-cols-[minmax(320px,0.82fr)_minmax(520px,1.18fr)]">
        <aside className="relative hidden overflow-hidden bg-aa-navy-950 px-8 py-10 text-white lg:flex lg:flex-col lg:justify-between xl:px-14">
          <div className="absolute -right-36 top-20 h-80 w-80 rounded-full border border-white/10" />
          <div className="absolute -bottom-44 -left-32 h-96 w-96 rounded-full border border-aa-blue-500/25" />

          <div className="relative z-10">
            <Link href="/" className="inline-flex items-center gap-2 text-sm text-white/70 transition hover:text-white">
              <ArrowLeft size={16} aria-hidden="true" /> Volver al inicio
            </Link>
            <div className="mt-16 max-w-sm">
              <div className="mb-7 flex h-14 w-14 items-center justify-center rounded-2xl bg-aa-cyan-400/15 ring-1 ring-aa-cyan-400/25">
                <Image src="/assets/brand/icon-color.png" alt="" width={1254} height={1254} className="h-9 w-9" />
              </div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-aa-cyan-400">Tu auto, siempre acompañado</p>
              <h1 className="mt-4 font-display text-4xl font-bold leading-[1.08] tracking-[-0.04em] xl:text-5xl">
                Empieza a manejar con más calma.
              </h1>
              <p className="mt-5 text-base leading-7 text-white/65">
                Crea tu espacio Autoaliado y reúne lo importante de tu auto en un solo lugar.
              </p>
              <ul className="mt-10 space-y-5">
                {benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-3 text-sm text-white/80">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-aa-cyan-400 text-aa-navy-950">
                      <Check size={13} strokeWidth={3} aria-hidden="true" />
                    </span>
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <p className="relative z-10 text-xs text-white/40">Autoaliado · Fase de prueba</p>
        </aside>

        <section className="flex flex-col px-5 py-7 sm:px-10 lg:px-14 lg:py-10 xl:px-24">
          <div className="flex items-center justify-between lg:justify-end">
            <BrandLogo width={150} priority className="lg:hidden" />
            <p className="text-sm text-aa-text-muted">
              ¿Ya tienes cuenta? <Link href="#iniciar-sesion" className="font-semibold text-aa-blue-600 hover:underline">Inicia sesión</Link>
            </p>
          </div>

          <Container className="flex flex-1 items-center py-12 lg:max-w-xl lg:py-16">
            <div className="w-full">
              <div className="mb-8 lg:hidden">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-aa-blue-600">Crea tu espacio</p>
                <h1 className="mt-3 font-display text-3xl font-bold tracking-[-0.04em] text-aa-navy-950 sm:text-4xl">Empieza a manejar con más calma.</h1>
              </div>
              <div className="mb-9">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-aa-blue-600">Primer paso</p>
                <h2 className="mt-3 font-display text-3xl font-bold tracking-[-0.04em] text-aa-navy-950 sm:text-4xl">Crea tu cuenta</h2>
                <p className="mt-3 max-w-md text-base leading-7 text-aa-text-muted">Solo necesitamos unos datos para preparar tu espacio personal.</p>
              </div>

              <form className="space-y-5" action="#alta-completada">
                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="space-y-2 text-sm font-semibold text-aa-navy-900">
                    Nombre
                    <input required name="name" type="text" placeholder="Tu nombre" className="h-13 w-full rounded-xl border border-aa-border bg-white px-4 text-base font-normal text-aa-navy-950 shadow-[var(--aa-shadow-sm)] outline-none transition placeholder:text-aa-gray-400 focus:border-aa-blue-500 focus:ring-4 focus:ring-aa-blue-500/10" />
                  </label>
                  <label className="space-y-2 text-sm font-semibold text-aa-navy-900">
                    Apellido
                    <input required name="lastName" type="text" placeholder="Tu apellido" className="h-13 w-full rounded-xl border border-aa-border bg-white px-4 text-base font-normal text-aa-navy-950 shadow-[var(--aa-shadow-sm)] outline-none transition placeholder:text-aa-gray-400 focus:border-aa-blue-500 focus:ring-4 focus:ring-aa-blue-500/10" />
                  </label>
                </div>
                <label className="block space-y-2 text-sm font-semibold text-aa-navy-900">
                  Correo electrónico
                  <input required name="email" type="email" placeholder="tu@correo.com" className="h-13 w-full rounded-xl border border-aa-border bg-white px-4 text-base font-normal text-aa-navy-950 shadow-[var(--aa-shadow-sm)] outline-none transition placeholder:text-aa-gray-400 focus:border-aa-blue-500 focus:ring-4 focus:ring-aa-blue-500/10" />
                </label>
                <label className="block space-y-2 text-sm font-semibold text-aa-navy-900">
                  Contraseña
                  <input required name="password" type="password" placeholder="Mínimo 8 caracteres" className="h-13 w-full rounded-xl border border-aa-border bg-white px-4 text-base font-normal text-aa-navy-950 shadow-[var(--aa-shadow-sm)] outline-none transition placeholder:text-aa-gray-400 focus:border-aa-blue-500 focus:ring-4 focus:ring-aa-blue-500/10" />
                </label>
                <label className="flex items-start gap-3 pt-1 text-sm leading-6 text-aa-text-muted">
                  <input required type="checkbox" className="mt-1 h-4 w-4 rounded border-aa-border accent-aa-blue-600" />
                  <span>Acepto los términos de uso y el aviso de privacidad de Autoaliado.</span>
                </label>
                <Button type="submit" withArrow className="w-full">Continuar</Button>
              </form>

              <div className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs text-aa-text-muted">
                <span className="inline-flex items-center gap-1.5"><LockKeyhole size={14} aria-hidden="true" /> Datos protegidos</span>
                <span className="inline-flex items-center gap-1.5"><ShieldCheck size={14} aria-hidden="true" /> Sin compromiso</span>
              </div>
            </div>
          </Container>
        </section>
      </div>
    </main>
  );
}
