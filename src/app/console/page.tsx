import Image from "next/image";
import Link from "next/link";
import {
  Bell,
  CarFront,
  ChevronRight,
  CircleHelp,
  FileText,
  LayoutDashboard,
  LifeBuoy,
  LogOut,
  Menu,
  MessageCircle,
  MoreHorizontal,
  Plus,
  ShieldCheck,
  Sparkles,
  Wrench,
} from "lucide-react";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { Container } from "@/components/ui/Container";
import { SurfaceCard } from "@/components/ui/SurfaceCard";

const navItems = [
  { label: "Resumen", icon: LayoutDashboard, active: true },
  { label: "Mi vehículo", icon: CarFront },
  { label: "Documentos", icon: FileText },
  { label: "Asistencia", icon: LifeBuoy },
];

const reminders = [
  { title: "Verificación vehicular", date: "18 oct 2026", color: "bg-aa-coral-500" },
  { title: "Renovación de póliza", date: "04 nov 2026", color: "bg-aa-blue-500" },
];

export default function ConsolePage() {
  return (
    <main className="min-h-screen bg-aa-page text-aa-navy-950">
      <div className="flex min-h-screen">
        <aside className="hidden w-[258px] shrink-0 flex-col border-r border-aa-border bg-white px-5 py-7 lg:flex">
          <BrandLogo width={164} priority className="px-2" />
          <div className="mt-12 flex items-center gap-3 rounded-2xl bg-aa-surface-soft p-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-aa-blue-600 text-sm font-bold text-white">MG</div>
            <div className="min-w-0"><p className="truncate text-sm font-bold">María González</p><p className="text-xs text-aa-text-muted">Plan esencial</p></div>
          </div>
          <nav aria-label="Navegación de consola" className="mt-10 space-y-1">
            {navItems.map(({ label, icon: Icon, active }) => (
              <a key={label} href={`#${label.toLowerCase().replace(" ", "-")}`} className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold transition ${active ? "bg-aa-navy-950 text-white shadow-[var(--aa-shadow-sm)]" : "text-aa-text-muted hover:bg-aa-surface-soft hover:text-aa-navy-950"}`}>
                <Icon size={18} aria-hidden="true" /> {label}
              </a>
            ))}
          </nav>
          <div className="mt-auto space-y-1 border-t border-aa-border pt-5">
            <a href="#ayuda" className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-aa-text-muted hover:bg-aa-surface-soft"><CircleHelp size={18} /> Centro de ayuda</a>
            <Link href="/" className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-aa-text-muted hover:bg-aa-surface-soft"><LogOut size={18} /> Salir</Link>
          </div>
        </aside>

        <section className="min-w-0 flex-1">
          <header className="border-b border-aa-border bg-white/90 backdrop-blur">
            <Container className="flex h-[76px] items-center justify-between gap-4">
              <div className="flex items-center gap-3 lg:hidden"><Menu size={22} /><BrandLogo width={138} /></div>
              <div className="hidden lg:block"><p className="text-sm font-semibold text-aa-text-muted">Lunes, 14 de septiembre de 2026</p><h1 className="mt-1 font-display text-xl font-bold tracking-[-0.03em]">Hola, María <span aria-hidden="true">👋</span></h1></div>
              <div className="flex items-center gap-3"><button type="button" aria-label="Notificaciones" className="relative flex h-10 w-10 items-center justify-center rounded-full text-aa-text-muted hover:bg-aa-surface-soft"><Bell size={19} /><span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-aa-coral-500" /></button><div className="flex h-10 w-10 items-center justify-center rounded-full bg-aa-blue-600 text-xs font-bold text-white lg:hidden">MG</div></div>
            </Container>
          </header>

          <Container className="py-8 sm:py-10 lg:py-12">
            <div className="mb-8 lg:hidden"><p className="text-sm font-semibold text-aa-text-muted">Lunes, 14 de septiembre de 2026</p><h1 className="mt-1 font-display text-2xl font-bold">Hola, María <span aria-hidden="true">👋</span></h1></div>
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="text-sm font-semibold uppercase tracking-[0.16em] text-aa-blue-600">Tu resumen</p><h2 className="mt-2 font-display text-3xl font-bold tracking-[-0.04em] sm:text-4xl">Todo en orden</h2><p className="mt-2 text-base text-aa-text-muted">Esto es lo más importante de tu auto hoy.</p></div><button type="button" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-aa-border bg-white px-5 text-sm font-semibold text-aa-navy-900 shadow-[var(--aa-shadow-sm)] hover:bg-aa-surface-soft"><Plus size={17} /> Agregar vehículo</button></div>

            <div className="mt-8 grid gap-5 xl:grid-cols-[1.45fr_1fr]">
              <SurfaceCard className="overflow-hidden bg-aa-navy-950 p-6 text-white sm:p-8"><div className="flex items-start justify-between"><div><span className="inline-flex items-center gap-2 rounded-full bg-aa-blue-500/20 px-3 py-1 text-xs font-semibold text-aa-cyan-400"><CarFront size={14} /> Vehículo principal</span><h3 className="mt-5 font-display text-2xl font-bold">Mazda CX-5 2022</h3><p className="mt-1 text-sm text-white/60">Placas: ABC-123-D · CDMX</p></div><button type="button" aria-label="Más opciones" className="text-white/60 hover:text-white"><MoreHorizontal size={22} /></button></div><div className="relative mx-auto mt-3 h-44 max-w-[400px] sm:h-52"><Image src="/assets/hero/car-sedan.png" alt="Mazda CX-5" fill priority sizes="(max-width: 640px) 100vw, 400px" className="object-contain drop-shadow-[0_20px_24px_rgba(0,0,0,0.35)]" /></div><div className="mt-2 grid grid-cols-3 gap-3 border-t border-white/10 pt-5"><div><p className="text-xs text-white/50">Kilometraje</p><p className="mt-1 text-sm font-bold">32,480 km</p></div><div><p className="text-xs text-white/50">Próximo servicio</p><p className="mt-1 text-sm font-bold">2,520 km</p></div><div><p className="text-xs text-white/50">Estado</p><p className="mt-1 inline-flex items-center gap-1.5 text-sm font-bold text-aa-success-500"><span className="h-2 w-2 rounded-full bg-aa-success-500" /> Al día</p></div></div></SurfaceCard>

              <SurfaceCard className="p-6 sm:p-8"><div className="flex items-start justify-between"><div><p className="text-sm font-semibold text-aa-text-muted">Tu póliza</p><h3 className="mt-2 font-display text-xl font-bold">Protección amplia</h3></div><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-aa-success-500/12 text-aa-success-500"><ShieldCheck size={21} /></div></div><div className="mt-7 rounded-2xl bg-aa-surface-soft p-4"><div className="flex items-center justify-between text-sm"><span className="text-aa-text-muted">Vigencia</span><span className="font-bold">Hasta 04 nov 2026</span></div><div className="mt-3 h-2 overflow-hidden rounded-full bg-aa-border"><div className="h-full w-[74%] rounded-full bg-aa-success-500" /></div><p className="mt-2 text-xs text-aa-text-muted">Te avisaremos con anticipación</p></div><a href="#poliza" className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-aa-blue-600 hover:underline">Ver detalle de póliza <ChevronRight size={16} /></a></SurfaceCard>
            </div>

            <div className="mt-5 grid gap-5 lg:grid-cols-[1fr_1fr_1.1fr]">
              <SurfaceCard className="p-6"><div className="flex items-center gap-3"><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-aa-coral-500/10 text-aa-coral-500"><Bell size={20} /></div><div><p className="text-sm text-aa-text-muted">Recordatorios</p><p className="font-display text-xl font-bold">2 pendientes</p></div></div><div className="mt-6 space-y-4">{reminders.map((item) => <div key={item.title} className="flex items-center gap-3"><span className={`h-2.5 w-2.5 rounded-full ${item.color}`} /><div className="min-w-0"><p className="truncate text-sm font-semibold">{item.title}</p><p className="text-xs text-aa-text-muted">{item.date}</p></div></div>)}</div><a href="#recordatorios" className="mt-6 inline-flex items-center gap-1 text-sm font-bold text-aa-blue-600 hover:underline">Ver todos <ChevronRight size={15} /></a></SurfaceCard>
              <SurfaceCard className="p-6"><div className="flex items-center gap-3"><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-aa-blue-500/10 text-aa-blue-600"><Wrench size={20} /></div><div><p className="text-sm text-aa-text-muted">Mantenimiento</p><p className="font-display text-xl font-bold">Buen momento</p></div></div><p className="mt-6 text-sm leading-6 text-aa-text-muted">Tu próximo servicio se acerca. Mantén tu auto listo para el siguiente recorrido.</p><button type="button" className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-aa-blue-600 hover:underline">Ver recomendaciones <ChevronRight size={15} /></button></SurfaceCard>
              <SurfaceCard className="relative overflow-hidden bg-aa-coral-500 p-6 text-white"><Sparkles className="absolute -right-3 -top-3 h-24 w-24 text-white/15" /><p className="relative text-sm font-semibold text-white/75">¿Necesitas ayuda?</p><h3 className="relative mt-2 max-w-[220px] font-display text-xl font-bold leading-tight">Estamos contigo cuando lo necesites.</h3><button type="button" className="relative mt-6 inline-flex min-h-10 items-center gap-2 rounded-full bg-white px-4 text-sm font-bold text-aa-coral-600 hover:bg-white/90"><MessageCircle size={16} /> Solicitar asistencia</button></SurfaceCard>
            </div>
          </Container>
        </section>
      </div>
    </main>
  );
}
