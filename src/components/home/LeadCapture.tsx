import { CheckCircle2 } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export function LeadCapture() {
  return (
    <section id="contacto" className="border-y border-aa-border bg-aa-navy-950 py-16 text-white sm:py-20">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-20">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-aa-cyan-400">Da el primer paso</p>
            <h2 className="mt-4 max-w-md font-display text-3xl font-bold leading-tight tracking-[-0.04em] sm:text-4xl">Cuéntanos de tu auto y te ayudamos a estar preparado.</h2>
            <p className="mt-5 max-w-md text-base leading-7 text-white/65">Déjanos tus datos para conocer Autoaliado y recibir una orientación inicial.</p>
            <div className="mt-7 space-y-3 text-sm text-white/80"><p className="flex items-center gap-2"><CheckCircle2 size={17} className="text-aa-cyan-400" /> Sin compromiso</p><p className="flex items-center gap-2"><CheckCircle2 size={17} className="text-aa-cyan-400" /> Atención personalizada</p></div>
          </div>
          <form action="#contacto-enviado" className="rounded-3xl bg-white p-6 text-aa-navy-950 shadow-[var(--aa-shadow-md)] sm:p-8">
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="space-y-2 text-sm font-semibold">Nombre<input required name="name" type="text" placeholder="Tu nombre" className="h-12 w-full rounded-xl border border-aa-border px-4 font-normal outline-none transition placeholder:text-aa-gray-400 focus:border-aa-blue-500 focus:ring-4 focus:ring-aa-blue-500/10" /></label>
              <label className="space-y-2 text-sm font-semibold">WhatsApp<input required name="phone" type="tel" placeholder="55 1234 5678" className="h-12 w-full rounded-xl border border-aa-border px-4 font-normal outline-none transition placeholder:text-aa-gray-400 focus:border-aa-blue-500 focus:ring-4 focus:ring-aa-blue-500/10" /></label>
              <label className="space-y-2 text-sm font-semibold sm:col-span-2">Correo electrónico<input required name="email" type="email" placeholder="tu@correo.com" className="h-12 w-full rounded-xl border border-aa-border px-4 font-normal outline-none transition placeholder:text-aa-gray-400 focus:border-aa-blue-500 focus:ring-4 focus:ring-aa-blue-500/10" /></label>
              <label className="space-y-2 text-sm font-semibold sm:col-span-2">¿Qué auto tienes?<input name="vehicle" type="text" placeholder="Ej. Mazda CX-5 2022" className="h-12 w-full rounded-xl border border-aa-border px-4 font-normal outline-none transition placeholder:text-aa-gray-400 focus:border-aa-blue-500 focus:ring-4 focus:ring-aa-blue-500/10" /></label>
            </div>
            <Button type="submit" withArrow className="mt-6 w-full">Quiero conocer Autoaliado</Button>
            <p className="mt-4 text-center text-xs leading-5 text-aa-text-muted">Al enviar aceptas nuestro aviso de privacidad.</p>
          </form>
        </div>
      </Container>
    </section>
  );
}
